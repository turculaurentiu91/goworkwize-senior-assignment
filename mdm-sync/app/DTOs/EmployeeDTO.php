<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class EmployeeDTO
{
    public function __construct(
        public string $email,
        public ?string $name = null,
        public ?string $phone = null,
    ) {}
}
