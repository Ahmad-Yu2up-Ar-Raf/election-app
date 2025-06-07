<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;

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
        if (app()->environment(['production', 'staging'])) {
            URL::forceScheme('https');
            
            // Set semua trusted proxies untuk Railway
            Request::setTrustedProxies(['*'], Request::HEADER_X_FORWARDED_ALL);
            
            // Pastikan semua URL dibuat dengan HTTPS
            if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
                $_SERVER['HTTPS'] = 'on';
                $_SERVER['SERVER_PORT'] = 443;
            }
            
            // Force HTTPS untuk semua asset URLs
            $this->app['url']->forceScheme('https');
            
            // Set server variables untuk Railway
            $this->app['request']->server->set('HTTPS', 'on');
            $this->app['request']->server->set('SERVER_PORT', 443);
            $this->app['request']->server->set('HTTP_X_FORWARDED_PROTO', 'https');
            $this->app['request']->server->set('HTTP_X_FORWARDED_PORT', 443);
            
            // Pastikan session cookies secure
            config([
                'session.secure' => true,
                'session.http_only' => true,
                'session.same_site' => 'lax'
            ]);
        }
        
        // Debug untuk melihat environment
        if (config('app.debug')) {
            \Log::info('App URL: ' . config('app.url'));
            \Log::info('Asset URL: ' . config('app.asset_url'));
            \Log::info('Force HTTPS: ' . config('app.force_https'));
        }
    }
}