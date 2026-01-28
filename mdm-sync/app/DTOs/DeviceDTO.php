<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class DeviceDTO
{
    public function __construct(
        public string $serialNumber,
        public string $deviceName,
        public EmployeeDTO $employee,
        public DeviceAttributesDTO $attributes,
    ) {}
}
