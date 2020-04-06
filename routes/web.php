<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('site');
});

Route::get('/draft', function () {
    return view('draft');
});

Route::group([
  'prefix' => 'api'
], function () {
    Route::get('/players/seasons', 'PlayerSeasonController@playerSeasons');
});

