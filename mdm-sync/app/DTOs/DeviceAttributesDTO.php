<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class DeviceAttributesDTO
{
    public function __construct(
        public ?string $model = null,
        public ?string $processor = null,
        public ?int $cores = null,
        public ?float $ramGb = null,
        public ?int $battery = null,
    ) {}

    public function toArray(): array
    {
        return [
            'model' => $this->model,
            'processor' => $this->processor,
            'cores' => $this->cores,
            'ram_gb' => $this->ramGb,
            'battery' => $this->battery,
        ];
    }
}
