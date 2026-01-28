<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Sync\MdmSyncInterface;
use Illuminate\Http\JsonResponse;

class SyncController extends Controller
{
    public function __construct(
        private readonly MdmSyncInterface $syncService
    ) {}

    public function jamf(): JsonResponse
    {
        $result = $this->syncService->sync();

        return response()->json($result);
    }
}
