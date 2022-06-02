<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\UserController;
use App\Models\Branch;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('index');
});
Route::prefix('/form')->group(function(){
    Route::resource('user', UserController::class);
    Route::resource('bank', BankController::class);
    Route::resource('account', AccountController::class);
    Route::resource('branch', BranchController::class);
    Route::get('getbank', [BankController::class, 'getbanks'])->name('bank.getbanks');
    Route::get('getrelatedbranch/{bank_id}', [BranchController::class, 'getRelatedBranch'])->name('branch.getrelatedbranch');
    Route::get('getaccountbyemail/{email}', [UserController::class, 'searchUserByMail'])->name('user.getaccountbyemail');
});
Route::get('{any}', function () {
    return view('index');
})->where('any','.*');
