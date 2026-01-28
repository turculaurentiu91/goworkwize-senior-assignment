<?php

use App\Http\Controllers\Api\AssetController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\SyncController;
use Illuminate\Support\Facades\Route;

Route::post('/sync/{provider}', [SyncController::class, 'sync']);

Route::get('/assets', [AssetController::class, 'index']);
Route::delete('/assets/{asset}', [AssetController::class, 'destroy']);

Route::get('/employees', [EmployeeController::class, 'index']);
Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy']);
