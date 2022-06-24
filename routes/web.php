<?php

use App\Http\Controllers\StudentController;
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

Route::get('students', [StudentController::class, 'index'])->name('student.index');
Route::post('students', [StudentController::class, 'store'])->name('student.store');
Route::put('/update_student/{id}', [StudentController::class, 'update']);
Route::get('fetch_students', [StudentController::class, 'fetchAllStudents']);
Route::get('/edit_student/{id}', [StudentController::class, 'edit']);
Route::get('/delete_student/{id}', [StudentController::class, 'destroy']);
