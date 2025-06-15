<?php

namespace App\Providers;

use Illuminate\Container\Attributes\Log;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;


class AppServiceProvider extends ServiceProvider
{
public function boot(): void
{
    // Force HTTPS di production
    if ($this->app->environment('production')) {
        URL::forceScheme('https');
        $this->app['request']->server->set('HTTPS', true);
    }
    
  if (!file_exists(public_path('storage'))) {
        try {
            $this->app->make('files')->link(
                storage_path('app/public'),
                public_path('storage')
            );
        } catch (\Exception $e) {
            // Log error tapi jangan crash app
                       \Log::warning('Could not create storage link: ' . $e->getMessage());

        }
    }
}
}