<?php

namespace App\Providers;

use App\Services\Sync\JamfSyncService;
use App\Services\Sync\MdmSyncInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(MdmSyncInterface::class, function ($app) {
            return new JamfSyncService(
                base_path('files/api-mock-response.json')
            );
        });
    }

    public function boot(): void
    {
        //
    }
}
