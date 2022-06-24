@extends('layout.layout')

@section('title')
    Home Page
@endsection

@section('content')
    <section class="main">

        {{-- Add Student Modal --}}
        <div class="form-modal">
            <div class="form">
                <div class="form-header">
                    <h1>Insert Record</h1>
                    <button id="close-modal">X</button>
                </div>
                <form id="addStudentForm">
                    <div>
                        <input type="text" name="name" id="name" placeholder="Enter your name">
                    </div>
                    <div>
                        <input type="email" name="email" id="email" placeholder="Enter your email">
                    </div>
                    <div>
                        <input type="text" name="phone" id="phone" placeholder="Enter your phone">
                    </div>
                    <div>
                        <input type="text" name="profile" id="profile" placeholder="Enter your profile">
                    </div>
                    <div>
                        <select name="course" id="course">
                            <option value="bca">BCA</option>
                            <option value="mca">MCA</option>
                            <option value="csit">CSIT</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" name="submit" class="add_student" value="submit">
                    </div>
                </form>
            </div>
        </div>
        {{-- End add student Modal --}}

        {{-- Edit Student Modal --}}
        <div class="edit-form-modal">
            <div class="form">
                <div class="form-header">
                    <h1>Edit Record</h1>
                    <button id="close-edit-modal">X</button>
                </div>
                <form id="editStudentForm">
                    <input type="hidden" id="edit-id">
                    <div>
                        <input type="text" name="edit-name" id="edit-name" placeholder="Enter your name">
                    </div>
                    <div>
                        <input type="email" name="edit-email" id="edit-email" placeholder="Enter your email">
                    </div>
                    <div>
                        <input type="text" name="edit-phone" id="edit-phone" placeholder="Enter your phone">
                    </div>
                    <div>
                        <input type="text" name="edit-profile" id="edit-profile" placeholder="Enter your profile">
                    </div>
                    <div>
                        <select name="course" id="edit-course">
                            <option value="bca">BCA</option>
                            <option value="mca">MCA</option>
                            <option value="csit">CSIT</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" name="submit" class="edit_student" value="Update">
                    </div>
                </form>
            </div>
        </div>
        {{-- End Edit student Modal --}}

        <div class="home-section">
            <h1>Student Record System</h1>
            <div>
                <button class="create-record">Create Record</button>
            </div>
            <div class="student-record-list">
                <table border="1">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Profile</td>
                            <td>Course</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody id="fetched-result">
    
                    </tbody>
                </table>
            </div>
        </div>
    </section>
@endsection