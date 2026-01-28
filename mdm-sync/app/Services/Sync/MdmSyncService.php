<?php

declare(strict_types=1);

namespace App\Services\Sync;

use App\Contracts\MdmProviderInterface;
use App\DTOs\DeviceDTO;
use App\DTOs\SyncResultDTO;
use App\Models\Asset;
use App\Models\Employee;
use App\Services\Sync\Providers\JamfProvider;
use Illuminate\Support\Facades\DB;

final class MdmSyncService
{
    public function __construct(
        private readonly MdmProviderRegistry $registry
    ) {}

    /**
     * Sync devices from the specified MDM provider
     */
    public function sync(string $providerIdentifier): SyncResultDTO
    {
        $provider = $this->registry->get($providerIdentifier);

        $createdAssets = 0;
        $updatedAssets = 0;
        $createdEmployees = 0;
        $errors = [];

        DB::transaction(function () use ($provider, &$createdAssets, &$updatedAssets, &$createdEmployees, &$errors) {
            foreach ($provider->fetchDevices() as $device) {
                try {
                    $employeeResult = $this->syncEmployee($device);
                    if ($employeeResult['created']) {
                        $createdEmployees++;
                    }

                    $assetResult = $this->syncAsset($device, $employeeResult['employee'], $provider->getIdentifier());
                    if ($assetResult['created']) {
                        $createdAssets++;
                    } else {
                        $updatedAssets++;
                    }
                } catch (\Throwable $e) {
                    $errors[] = sprintf(
                        'Failed to sync device %s: %s',
                        $device->serialNumber,
                        $e->getMessage()
                    );
                }
            }
        });

        $skippedMissingSerial = 0;
        $skippedUnassigned = 0;

        if ($provider instanceof JamfProvider) {
            $skippedMissingSerial = $provider->getSkippedMissingSerial();
            $skippedUnassigned = $provider->getSkippedUnassigned();
        }

        return new SyncResultDTO(
            provider: $provider->getIdentifier(),
            createdAssets: $createdAssets,
            updatedAssets: $updatedAssets,
            createdEmployees: $createdEmployees,
            skippedUnassigned: $skippedUnassigned,
            skippedMissingSerial: $skippedMissingSerial,
            errors: $errors,
        );
    }

    /**
     * @return array{employee: Employee, created: bool}
     */
    private function syncEmployee(DeviceDTO $device): array
    {
        $employee = Employee::query()->firstOrNew(['email' => $device->employee->email]);
        $wasNew = !$employee->exists;

        $employee->name = $device->employee->name ?? $employee->name;
        $employee->phone = $device->employee->phone ?? $employee->phone;
        $employee->save();

        return [
            'employee' => $employee,
            'created' => $wasNew,
        ];
    }

    /**
     * @return array{asset: Asset, created: bool}
     */
    private function syncAsset(DeviceDTO $device, Employee $employee, string $providerIdentifier): array
    {
        $asset = Asset::query()->firstOrNew(['serial_code' => $device->serialNumber]);
        $wasNew = !$asset->exists;

        $asset->employee_id = $employee->id;
        $asset->device_name = $device->deviceName;
        $asset->provider = $providerIdentifier;
        $asset->attributes = $device->attributes->toArray();
        $asset->save();

        return [
            'asset' => $asset,
            'created' => $wasNew,
        ];
    }
}
