<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MarkerController;

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
// Route::prefix('markers')->group(function() {
//   Route::get('/list', 'App\Http\Controllers\MarkerController@list')->name('markers-list');
//   Route::post('/create', 'App\Http\Controllers\MarkerController@store')->name('markers-create');
// });


// Route::prefix('avto')->group(function() {
//   Route::get('/list', 'App\Http\Controllers\MarkerController@list')->name('markers-list');
//   Route::post('/create', 'App\Http\Controllers\MarkerController@store')->name('markers-create');
// });

Route::get('/{any}', [App\Http\Controllers\HomeController::class, 'index'])
    ->where('any', '^(?!api).*$');