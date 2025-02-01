<?php

namespace App\Providers;

use App\Repositories\CachedProductRepository;
use App\Repositories\EloquentProductRepository;
use App\Repositories\ProductRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->singleton(EloquentProductRepository::class, function ($app) {
            return new EloquentProductRepository();
        });

        $this->app->bind(ProductRepositoryInterface::class, function ($app) {
            return new CachedProductRepository(
                $app->make(EloquentProductRepository::class),
                3600 
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
