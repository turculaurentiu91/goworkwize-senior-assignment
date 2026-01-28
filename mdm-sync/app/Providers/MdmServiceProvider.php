<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Sync\MdmProviderRegistry;
use App\Services\Sync\MdmSyncService;
use App\Services\Sync\Providers\JamfProvider;
use Illuminate\Support\ServiceProvider;

class MdmServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(MdmProviderRegistry::class, function ($app) {
            $registry = new MdmProviderRegistry();

            $registry->register(new JamfProvider(
                base_path('files/api-mock-response.json')
            ));

            return $registry;
        });

        $this->app->singleton(MdmSyncService::class, function ($app) {
            return new MdmSyncService(
                $app->make(MdmProviderRegistry::class)
            );
        });
    }

    public function boot(): void
    {
        //
    }
}
