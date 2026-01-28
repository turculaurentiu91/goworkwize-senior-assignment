<?php

declare(strict_types=1);

namespace App\Services\Sync\Providers;

use App\Contracts\MdmProviderInterface;

abstract class AbstractMdmProvider implements MdmProviderInterface
{
    /**
     * Validate and normalize an email address
     */
    protected function normalizeEmail(?string $email): ?string
    {
        if (!is_string($email)) {
            return null;
        }

        $email = strtolower(trim($email));

        return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null;
    }

    /**
     * Validate and normalize a serial number
     */
    protected function normalizeSerial(?string $serial): ?string
    {
        if (!is_string($serial)) {
            return null;
        }

        $serial = trim($serial);

        return $serial !== '' ? $serial : null;
    }

    /**
     * Normalize a string value (trim and return null if empty)
     */
    protected function normalizeString(?string $value): ?string
    {
        if (!is_string($value)) {
            return null;
        }

        $value = trim($value);

        return $value !== '' ? $value : null;
    }

    /**
     * Convert megabytes to gigabytes
     */
    protected function mbToGb(mixed $megabytes): ?float
    {
        if (!is_numeric($megabytes) || (float) $megabytes <= 0) {
            return null;
        }

        return round((float) $megabytes / 1024, 2);
    }
}
