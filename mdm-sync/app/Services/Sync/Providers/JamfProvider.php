<?php

declare(strict_types=1);

namespace App\Services\Sync\Providers;

use App\DTOs\DeviceAttributesDTO;
use App\DTOs\DeviceDTO;
use App\DTOs\EmployeeDTO;
use Generator;

final class JamfProvider extends AbstractMdmProvider
{
    private int $skippedMissingSerial = 0;
    private int $skippedUnassigned = 0;

    public function __construct(
        private readonly string $filePath
    ) {}

    public function getIdentifier(): string
    {
        return 'jamf';
    }

    public function getName(): string
    {
        return 'Jamf MDM';
    }

    public function isConfigured(): bool
    {
        return file_exists($this->filePath) && is_readable($this->filePath);
    }

    /**
     * @return Generator<DeviceDTO>
     */
    public function fetchDevices(): Generator
    {
        $this->skippedMissingSerial = 0;
        $this->skippedUnassigned = 0;

        $content = file_get_contents($this->filePath);
        $data = json_decode($content, true);
        $devices = $data['results'] ?? [];

        foreach ($devices as $device) {
            $serial = $this->extractSerial($device);
            if ($serial === null) {
                $this->skippedMissingSerial++;
                continue;
            }

            $email = $this->extractEmail($device);
            if ($email === null) {
                $this->skippedUnassigned++;
                continue;
            }

            yield new DeviceDTO(
                serialNumber: $serial,
                deviceName: $this->extractDeviceName($device),
                employee: new EmployeeDTO(
                    email: $email,
                    name: $this->extractName($device),
                    phone: $this->extractPhone($device),
                ),
                attributes: new DeviceAttributesDTO(
                    model: data_get($device, 'hardware.model'),
                    processor: data_get($device, 'hardware.processorType'),
                    cores: data_get($device, 'hardware.coreCount'),
                    ramGb: $this->mbToGb(data_get($device, 'hardware.totalRamMegabytes')),
                    battery: data_get($device, 'hardware.batteryCapacityPercent'),
                ),
            );
        }
    }

    public function getSkippedMissingSerial(): int
    {
        return $this->skippedMissingSerial;
    }

    public function getSkippedUnassigned(): int
    {
        return $this->skippedUnassigned;
    }

    private function extractSerial(array $device): ?string
    {
        return $this->normalizeSerial(data_get($device, 'hardware.serialNumber'));
    }

    private function extractEmail(array $device): ?string
    {
        $email = data_get($device, 'userAndLocation.email')
            ?? data_get($device, 'userAndLocation.emailAddress')
            ?? data_get($device, 'username');

        return $this->normalizeEmail($email);
    }

    private function extractName(array $device): ?string
    {
        $name = data_get($device, 'userAndLocation.realname')
            ?? data_get($device, 'userAndLocation.realName');

        return $this->normalizeString($name);
    }

    private function extractPhone(array $device): ?string
    {
        $phone = data_get($device, 'userAndLocation.phone')
            ?? data_get($device, 'userAndLocation.phoneNumber');

        return $this->normalizeString($phone);
    }

    private function extractDeviceName(array $device): string
    {
        $name = data_get($device, 'general.name')
            ?? data_get($device, 'hardware.model')
            ?? data_get($device, 'model')
            ?? data_get($device, 'name');

        $normalized = $this->normalizeString($name);

        return $normalized ?? 'Unknown';
    }
}
