<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('markers')->group(function() {
    Route::get('/list', 'App\Http\Controllers\MarkerController@list')->name('markers-list');

    Route::post('/create', 'App\Http\Controllers\MarkerController@store');
    Route::delete('/delete/{id}', 'App\Http\Controllers\MarkerController@destroy');
    Route::put('/put', 'App\Http\Controllers\MarkerController@update');
  });

Route::post('/login', 'App\Http\Controllers\Auth\LoginController@login');
Route::post('registration', [\App\Http\Controllers\Auth\RegistrationController::class, 'registration']);
