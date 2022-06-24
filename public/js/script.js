const modal = document.querySelector(".form-modal");
const editModal = document.querySelector(".edit-form-modal");
const openModal = document.querySelector(".create-record");
const closeModal = document.querySelector("#close-modal");
const addStudentForm = document.querySelector("#addStudentForm");
const editStudentForm = document.querySelector("#editStudentForm");

// Input fields
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const profileInput = document.querySelector("#profile");
const courseInput = document.querySelector("#course");

// Edit input fields
const editIdInput = document.querySelector("#edit-id");
const editNameInput = document.querySelector("#edit-name");
const editEmailInput = document.querySelector("#edit-email");
const editPhoneInput = document.querySelector("#edit-phone");
const editProfileInput = document.querySelector("#edit-profile");
const editCourseInput = document.querySelector("#edit-course");

openModal.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

fetchData();

// UPDATE CODE
editStudentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = editIdInput.value;
    let editData = {
        name: editNameInput.value,
        email: editEmailInput.value,
        phone: editPhoneInput.value,
        profile: editProfileInput.value,
        course: editCourseInput.value,
    };

    console.log(editData);

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $.ajax({
        type: "PUT",
        url: `/update_student/${id}`,
        dataType: "json",
        data: editData,
        success: function (response) {
            if (response.status == 200) {
                alert(response.message);
                editNameInput.value = "";
                editEmailInput.value = "";
                editPhoneInput.value = "";
                editProfileInput.value = "";
                editCourseInput.value = "";
                document.querySelector("#fetched-result").innerHTML = "";
                modal.style.display = "none";
                fetchData();
            }
        },
    });
});

// INSERT JQUERY CODE HERE
$(document).on("submit", addStudentForm, function (e) {
    e.preventDefault();

    let insertData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        profile: profileInput.value,
        course: courseInput.value,
    };

    // let jsonData = JSON.stringify(data);

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $.ajax({
        type: "POST",
        url: "/students",
        data: insertData,
        dataType: "json",
        success: function (response) {
            if (response.status == 200) {
                nameInput.value = "";
                emailInput.value = "";
                phoneInput.value = "";
                profileInput.value = "";
                alert(response.message);
                document.querySelector("#fetched-result").innerHTML = "";
                modal.style.display = "none";
                fetchData();
            }
        },
    });
});

// fetching data
function fetchData() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $.ajax({
        type: "GET",
        url: "/fetch_students",
        dataType: "json",
        success: function (response) {
            let studentsArr = response.students;
            studentsArr.forEach((student) => {
                let tableRow = document.createElement("tr");
                tableRow.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.profile}</td>
                    <td>${student.course}</td>
                    <td><button value="${student.id}" class="edit-record">Edit</button>
                    <button value="${student.id}" class="delete-record">Delete</button></td>
                `;

                document.querySelector("#fetched-result").appendChild(tableRow);
            });

            let editButtons = document.querySelectorAll(".edit-record");
            let closeEditModal = document.querySelector("#close-edit-modal");

            editButtons.forEach((editButton) => {
                editButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    let id = editButton.value;

                    $.ajax({
                        type: "GET",
                        url: `/edit_student/${id}`,
                        dataType: "json",
                        success: function (response) {
                            // console.log(response);
                            editModal.style.display = "block";
                            editNameInput.value = response.student.name;
                            editEmailInput.value = response.student.email;
                            editPhoneInput.value = response.student.phone;
                            editProfileInput.value = response.student.profile;
                            editCourseInput.value = response.student.course;
                            editIdInput.value = response.student.id;
                        },
                    });
                });
            });
            // console.log(editButtons);
            closeEditModal.addEventListener("click", () => {
                editModal.style.display = "none";
            });

            let deleteButtons = document.querySelectorAll(".delete-record");
            deleteButtons.forEach((deleteButton) => {
                deleteButton.addEventListener("click", () => {
                    let id = deleteButton.value;
                    $.ajax({
                        type: "GET",
                        url: `/delete_student/${id}`,
                        dataType: "json",
                        success: function (response) {
                            if (response.status == 200) {
                                alert(response.message);
                                document.querySelector(
                                    "#fetched-result"
                                ).innerHTML = "";
                                fetchData();
                            }
                        },
                    });
                });
            });
        },
    });
}
