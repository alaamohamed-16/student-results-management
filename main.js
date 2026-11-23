class Student {
    #name;
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        this.name = name;

        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;

        this.attendance = attendance;
    }


    set name(value) {

        if (!value || value.trim() === "") {
            throw new Error("اسم الطالب لا يمكن أن يكون فارغًا.");
        }

        this.#name = value.trim();
    }

    
    set grade1(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("درجة المادة الأولى لا يمكن أن تكون فارغة.");
        }

        if (!Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("درجة المادة الأولى يجب أن تكون بين 0 و100.");
        }

        this.#grade1 = value;
    }

    
    set grade2(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("درجة المادة الثانية لا يمكن أن تكون فارغة.");
        }

        if (!Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("درجة المادة الثانية يجب أن تكون بين 0 و100.");
        }

        this.#grade2 = value;
    }


    set grade3(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("درجة المادة الثالثة لا يمكن أن تكون فارغة.");
        }

        if (!Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("درجة المادة الثالثة يجب أن تكون بين 0 و100.");
        }

        this.#grade3 = value;
    }

    
    set attendance(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("نسبة الحضور لا يمكن أن تكون فارغة.");
        }

        if (!Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("نسبة الحضور يجب أن تكون بين 0 و100.");
        }

        this.#attendance = value;
    }


    get name() {
        return this.#name;
    }

    get grade1() {
        return this.#grade1;
    }

    get grade2() {
        return this.#grade2;
    }

    get grade3() {
        return this.#grade3;
    }

    get attendance() {
        return this.#attendance;
    }

    
    get average() {

        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}


let studentsList = [];


const studentNameInput = document.getElementById("studentName");

const grade1Input = document.getElementById("grade1");
const grade2Input = document.getElementById("grade2");
const grade3Input = document.getElementById("grade3");

const attendanceInput = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudentBtn");
const graceBtn = document.getElementById("graceBtn");

const errorBox = document.getElementById("errorBox");

const studentsContainer = document.getElementById("studentsContainer");
const reportContainer = document.getElementById("reportContainer");


function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (character) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


addStudentBtn.onclick = function () {

    try {

        
        errorBox.classList.add("d-none");
        errorBox.textContent = "";

        
        const name = studentNameInput.value;

        const grade1 = grade1Input.value;
        const grade2 = grade2Input.value;
        const grade3 = grade3Input.value;

        const attendance = attendanceInput.value;

        
        if (
            grade1.trim() === "" ||
            grade2.trim() === "" ||
            grade3.trim() === "" ||
            attendance.trim() === ""
        ) {

            throw new Error("من فضلك أدخل جميع الدرجات ونسبة الحضور.");
        }

        
        const g1 = Number(grade1);
        const g2 = Number(grade2);
        const g3 = Number(grade3);
        const att = Number(attendance);

        
        const newStudent = new Student(name, g1, g2, g3, att);

        
        studentsList.push(newStudent);

        
        displayStudents();

        
        studentNameInput.value = "";

        grade1Input.value = "";
        grade2Input.value = "";
        grade3Input.value = "";

        attendanceInput.value = "";

    
        reportContainer.innerHTML = `
            <p class="empty-message">
                سيظهر التقرير هنا.
            </p>
        `;

    }

    catch (error) {

        
        errorBox.textContent = error.message;

        errorBox.classList.remove("d-none");
    }
};



function displayStudents() {

    if (studentsList.length === 0) {

        studentsContainer.innerHTML = `
            <p class="empty-message">
                لم يتم إضافة أي طالب حتى الآن.
            </p>
        `;

        return;
    }

    studentsContainer.innerHTML = studentsList.map(function (student, index) {

        return `
            <div class="student-item">

                <h5>
                    الطالب ${index + 1}: ${escapeHTML(student.name)}
                </h5>

                <p>
                    <strong>المادة الأولى:</strong> ${student.grade1}
                </p>

                <p>
                    <strong>المادة الثانية:</strong> ${student.grade2}
                </p>

                <p>
                    <strong>المادة الثالثة:</strong> ${student.grade3}
                </p>

                <p>
                    <strong>نسبة الحضور:</strong> ${student.attendance}%
                </p>

                <p>
                    <strong>المتوسط:</strong> ${student.average.toFixed(2)}
                </p>

            </div>
        `;

    }).join("");
}



graceBtn.onclick = function () {

    
    const strugglingStudents = studentsList.filter(function (student) {

        return student.average >= 40 && student.average <= 49;
    });


    
    const studentsAfterGrace = strugglingStudents.map(function (student) {

        return {

            name: student.name,

            oldAverage: student.average,

            newAverage: student.average + 5
        };
    });


    
    reportContainer.innerHTML = "";


    if (studentsAfterGrace.length === 0) {

        reportContainer.innerHTML = `
            <div class="alert alert-info">

                <h5>لا يوجد طلاب متعثرون.</h5>

                <p>
                    لا يوجد طلاب متوسط درجاتهم بين 40 و49.
                </p>

            </div>
        `;

        return;
    }


    const totalAverage = studentsAfterGrace.reduce(function (total, student) {

        return total + student.newAverage;

    }, 0);


    const generalAverage = totalAverage / studentsAfterGrace.length;


    reportContainer.innerHTML = `

        <div class="report-summary">

            <h4>نتائج لجنة الرأفة</h4>

            <p>
                <strong>عدد الطلاب المتعثرين:</strong>
                ${studentsAfterGrace.length}
            </p>

            <p>
                <strong>المتوسط العام بعد الرأفة:</strong>
                ${generalAverage.toFixed(2)}
            </p>

        </div>

        <h5 class="section-title mb-3">
            الطلاب المستحقون لدرجات الرأفة
        </h5>

        ${studentsAfterGrace.map(function (student, index) {

            return `

                <div class="report-item">

                    <h5>
                        الطالب ${index + 1}: ${escapeHTML(student.name)}
                    </h5>

                    <p>
                        <strong>المتوسط الأصلي:</strong>
                        ${student.oldAverage.toFixed(2)}
                    </p>

                    <p>
                        <strong>المتوسط بعد الرأفة:</strong>
                        ${student.newAverage.toFixed(2)}
                    </p>

                </div>

            `;

        }).join("")}

    `;
};