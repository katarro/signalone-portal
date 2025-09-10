<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Programar el monitoreo de APs cada 60 segundos
Schedule::command('ap:ping --all')
    ->everyMinute()
    ->withoutOverlapping()
    ->runInBackground();
