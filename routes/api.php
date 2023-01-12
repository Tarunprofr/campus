<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\v1\RecordController;

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

Route::group(['prefix'=> 'v1'],function(){
    Route::post('login', [RecordController::class,'login']);
    Route::post('register', [RecordController::class,'register']);
    
    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('details', [RecordController::class,'details']);
        Route::post('show-record',[RecordController::class,'show_record']);
    });
});

