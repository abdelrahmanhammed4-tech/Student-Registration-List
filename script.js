// Array to store student objects
const students = [];

// DOM Elements
const studentForm = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const ageInput = document.getElementById('student-age');
const courseInput = document.getElementById('course-name');
const gradeInput = document.getElementById('student-grade');

const errorMessage = document.getElementById('error-message');
const studentsGrid = document.getElementById('students-grid');
const emptyState = document.getElementById('empty-state');
const studentCount = document.getElementById('student-count');

// Handling Form Submission
studentForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page refresh

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const course = courseInput.value.trim();
  const gradeValue = gradeInput.value.trim();
  const grade = Number(gradeValue);

  // 1. Validation Check: Ensure all fields are filled
  if (!name || !age || !course || gradeValue === '') {
    showError('Please fill in all required fields!');
    return;
  }

  // 2. Validation Check: Ensure grade is between 0 and 100
  if (isNaN(grade) || grade < 0 || grade > 100) {
    showError('Grade must be a number between 0 and 100!');
    return;
  }

  // Hide error message if validation passes
  hideError();

  // 3. Determine Pass/Fail status
  const status = grade >= 50 ? 'Passed' : 'Failed';

  // 4. Create Student Object
  const studentObj = {
    name: name,
    age: Number(age),
    course: course,
    grade: grade,
    status: status
  };

  // 5. Add object to students array
  students.push(studentObj);

  // 6. Render student cards on the page
  renderStudents();

  // 7. Clear input fields after adding
  studentForm.reset();
});

// Show error message
function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove('hidden');
}

// Hide error message
function hideError() {
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
}

// Render student cards dynamically
function renderStudents() {
  // Clear container
  studentsGrid.innerHTML = '';

  if (students.length === 0) {
    studentsGrid.appendChild(emptyState);
    studentCount.textContent = '0 Students';
    return;
  }

  // Create student cards
  students.forEach((student) => {
    const card = document.createElement('div');
    card.className = 'student-card';

    const isPassed = student.status === 'Passed';

    card.innerHTML = `
      <div class="info-row">
        <span class="info-label">Student Name:</span>
        <span class="info-value">${student.name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Age:</span>
        <span class="info-value">${student.age}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Course:</span>
        <span class="info-value">${student.course}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Grade:</span>
        <span class="info-value">${student.grade}</span>
      </div>
      <div class="status-badge ${isPassed ? 'passed' : 'failed'}">
        Status: ${student.status}
      </div>
    `;

    studentsGrid.appendChild(card);
  });

  // Update counter
  studentCount.textContent = `${students.length} ${students.length === 1 ? 'Student' : 'Students'}`;
}