<?php

use Illuminate\Support\Facades\Route;

use App\Models\Player;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/draft/{type?}', function () {
    return view('draft');
});

Route::get('/', function () {
    return redirect('/draft');
});

Route::group(['prefix' => 'api'], function () {
  
    // Resource Controllers
    Route::resources([
      // Team
      'players' => 'PlayerController',
    ]);
});

