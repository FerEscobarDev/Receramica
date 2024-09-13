<?php

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return response()->json($request->user());
})->middleware('auth:sanctum');

Route::middleware([
    'auth:sanctum'
])->group(function () {
    Route::get('/creaciones', function() {
        return response()->json(Product::all()->load('images'));
    })->name('creacionesFront');
});