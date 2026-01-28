<?php

declare(strict_types=1);

namespace App\Contracts;

use App\DTOs\DeviceDTO;

interface MdmProviderInterface
{
    /**
     * Unique provider identifier (e.g., 'jamf', 'kandji')
     */
    public function getIdentifier(): string;

    /**
     * Human-readable provider name
     */
    public function getName(): string;

    /**
     * Fetch and normalize devices from the MDM source
     *
     * @return iterable<DeviceDTO>
     */
    public function fetchDevices(): iterable;

    /**
     * Check if provider is properly configured
     */
    public function isConfigured(): bool;
}
