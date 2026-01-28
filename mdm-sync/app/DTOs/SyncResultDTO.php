<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class SyncResultDTO
{
    public function __construct(
        public string $provider,
        public int $createdAssets = 0,
        public int $updatedAssets = 0,
        public int $createdEmployees = 0,
        public int $skippedUnassigned = 0,
        public int $skippedMissingSerial = 0,
        public array $errors = [],
    ) {}

    public function toArray(): array
    {
        return [
            'provider' => $this->provider,
            'created_assets' => $this->createdAssets,
            'updated_assets' => $this->updatedAssets,
            'created_employees' => $this->createdEmployees,
            'skipped_unassigned' => $this->skippedUnassigned,
            'skipped_missing_serial' => $this->skippedMissingSerial,
            'errors' => $this->errors,
        ];
    }
}
