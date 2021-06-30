<?php

use Illuminate\Http\Request;
use App\Data;
header('Access-Control-Allow-Origin: *');
//Access-Control-Allow-Origin: *
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/data', function(){
    return Data::all();
});

Route::post('/data', function(){
    // request()->validate([
    //     'firstName' => 'required',
    //     'lastName' => 'required',
    //     'email' => 'required',
    //     'mobileNumber' => 'required',
    //     'gender' => 'required',
    //     'dateOfBirth' => 'required',
    //     'comments' => 'nullable',
    //     ]);
    
    return Data::create([
        'firstName' => request('firstName'),
        'lastName' => request('lastName'),
        'email' => request('email'),
        'mobileNumber' => request('mobileNumber'),
        'gender' => request('gender'),
        'dateOfBirth' => request('dateOfBirth'),
        'comments' => request('comments'),
    ]);
});