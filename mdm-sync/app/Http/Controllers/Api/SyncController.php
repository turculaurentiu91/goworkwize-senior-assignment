<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Sync\MdmProviderRegistry;
use App\Services\Sync\MdmSyncService;
use Illuminate\Http\JsonResponse;
use InvalidArgumentException;

class SyncController extends Controller
{
    public function __construct(
        private readonly MdmSyncService $syncService,
        private readonly MdmProviderRegistry $registry
    ) {}

    public function sync(string $provider): JsonResponse
    {
        if (!$this->registry->has($provider)) {
            return response()->json([
                'error' => sprintf('Unknown MDM provider: %s', $provider),
                'available_providers' => $this->registry->identifiers(),
            ], 404);
        }

        try {
            $result = $this->syncService->sync($provider);

            return response()->json($result->toArray());
        } catch (InvalidArgumentException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
