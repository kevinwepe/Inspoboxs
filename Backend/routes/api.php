<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//controller

use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\Posts\PostsController;
use App\Http\Controllers\Profile\ProfileController;

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

Route::group(['prefix'=>'/auth']  , function($router) {
    Route::post('/login' , [AuthenticationController::class, 'login']);
    Route::post('/register' , [AuthenticationController::class,'register']);
});

//posts routes

Route::group([
    'prefix'=>'/posts'
], function($router) {
     Route::get('/all' , [PostsController::class,'getAllPosts']);
     Route::post('/create' , [PostsController::class,'createPosts']);
     Route::delete('/delete/{id}' , [PostsController::class,'deletePosts']);
     Route::post('/update/{id}' , [PostsController::class, 'updatePosts']);
});

//profile routes
Route::group([
    'prefix'=>'/profile'
],function($router) {
    Route::get('/{id}', [ProfileController::class,'userPosts']); 
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

