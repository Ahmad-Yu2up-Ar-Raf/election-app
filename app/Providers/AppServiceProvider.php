<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS di production
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
            
            // PERBAIKAN: Set trusted proxies
            $this->app['request']->server->set('HTTPS', 'on');
            $this->app['request']->server->set('HTTP_X_FORWARDED_PROTO', 'https');
            $this->app['request']->server->set('HTTP_X_FORWARDED_PORT', '443');
        }
    }
}