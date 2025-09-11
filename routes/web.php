<?php

use App\Http\Controllers\VlanController;
use App\Http\Controllers\ZonaController;
use App\Http\Controllers\ApController;
use App\Http\Controllers\CaptivePortalController;
use App\Http\Controllers\CaptivePortalAuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // VLAN routes
    Route::resource('vlans', VlanController::class);
    Route::get('create-vlan', [VlanController::class, 'create'])->name('create-vlan');
    Route::post('create-vlan', [VlanController::class, 'store']);
    Route::get('edit-vlan', [VlanController::class, 'edit'])->name('edit-vlan');

    // Zona routes
    Route::resource('zonas', ZonaController::class);
    Route::get('create-zona', [ZonaController::class, 'create'])->name('create-zona');
    Route::post('create-zona', [ZonaController::class, 'store']);
    Route::get('edit-zona', [ZonaController::class, 'edit'])->name('edit-zona');

    // AP routes
    Route::resource('aps', ApController::class);
    Route::get('create-ap', [ApController::class, 'create'])->name('create-ap');
    Route::post('create-ap', [ApController::class, 'store']);
    Route::post('aps/{ap}/ping', [ApController::class, 'ping'])->name('aps.ping');
    Route::patch('aps/{ap}/toggle', [ApController::class, 'toggleStatus'])->name('aps.toggle');

    // Captive Portal routes
    Route::resource('captive-portals', CaptivePortalController::class);
    Route::get('create-captive-portal', [CaptivePortalController::class, 'create'])->name('create-captive-portal');
    Route::post('create-captive-portal', [CaptivePortalController::class, 'store']);
    Route::post('captive-portals/upload-logo', [CaptivePortalController::class, 'uploadLogo'])->name('captive-portals.upload-logo');

    // Captive Portal Authentication routes (public access)
    Route::prefix('portal')->name('captive-portal.')->group(function () {
        Route::get('{portalId}/auth', [CaptivePortalAuthController::class, 'showAuth'])->name('auth');
        Route::post('{portalId}/authenticate', [CaptivePortalAuthController::class, 'authenticate'])->name('authenticate');
        Route::post('logout/{sessionId}', [CaptivePortalAuthController::class, 'logout'])->name('logout');
        Route::get('goodbye', [CaptivePortalAuthController::class, 'goodbye'])->name('goodbye');
        Route::post('heartbeat', [CaptivePortalAuthController::class, 'heartbeat'])->name('heartbeat');
    });

    // Setup Guide route
    Route::get('setup-guide', function () {
        return Inertia::render('setup-guide');
    })->name('setup-guide');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
