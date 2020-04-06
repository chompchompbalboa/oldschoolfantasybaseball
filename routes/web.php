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
    Route::get('/players/seasons/batting/all', 'PlayerSeasonController@allPlayerSeasonsBatting');
    Route::get('/players/seasons/batting/positions', 'PlayerSeasonController@playerSeasonsByPositionBatting');
    Route::get('/players/seasons/pitching/all', 'PlayerSeasonController@allPlayerSeasonsPitching');
    Route::get('/players/seasons/pitching/positions', 'PlayerSeasonController@playerSeasonsByPositionPitching');
});

