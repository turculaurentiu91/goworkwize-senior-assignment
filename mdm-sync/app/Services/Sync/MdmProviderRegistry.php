<?php

declare(strict_types=1);

namespace App\Services\Sync;

use App\Contracts\MdmProviderInterface;
use InvalidArgumentException;

final class MdmProviderRegistry
{
    /**
     * @var array<string, MdmProviderInterface>
     */
    private array $providers = [];

    /**
     * Register a provider
     */
    public function register(MdmProviderInterface $provider): void
    {
        $this->providers[$provider->getIdentifier()] = $provider;
    }

    /**
     * Get a provider by identifier
     *
     * @throws InvalidArgumentException
     */
    public function get(string $identifier): MdmProviderInterface
    {
        if (!isset($this->providers[$identifier])) {
            throw new InvalidArgumentException(
                sprintf('MDM provider "%s" is not registered.', $identifier)
            );
        }

        return $this->providers[$identifier];
    }

    /**
     * Check if a provider is registered
     */
    public function has(string $identifier): bool
    {
        return isset($this->providers[$identifier]);
    }

    /**
     * Get all registered providers
     *
     * @return array<string, MdmProviderInterface>
     */
    public function all(): array
    {
        return $this->providers;
    }

    /**
     * Get identifiers of all registered providers
     *
     * @return string[]
     */
    public function identifiers(): array
    {
        return array_keys($this->providers);
    }
}
