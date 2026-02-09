// students.js - For studentRecordsManagement.html

// Sample student data
const studentsData = [
  {
    id: "S2023001",
    name: "John Smith",
    grade: "10",
    section: "A",
    email: "john.smith@school.edu",
    phone: "(555) 123-4567",
    status: "active",
    gpa: "3.8",
    attendance: "95%",
    enrolled: "Aug 2022",
    avatar: "JS",
  },
  {
    id: "S2023002",
    name: "Emma Chen",
    grade: "10",
    section: "B",
    email: "emma.chen@school.edu",
    phone: "(555) 987-6543",
    status: "active",
    gpa: "4.0",
    attendance: "98%",
    enrolled: "Sep 2023",
    avatar: "EC",
  },
  {
    id: "S2023003",
    name: "Michael Wilson",
    grade: "12",
    section: "C",
    email: "michael.w@school.edu",
    phone: "(555) 456-7890",
    status: "inactive",
    gpa: "3.5",
    attendance: "88%",
    enrolled: "Aug 2021",
    avatar: "MW",
  },
  {
    id: "S2023004",
    name: "Sarah Johnson",
    grade: "11",
    section: "A",
    email: "sarah.j@school.edu",
    phone: "(555) 234-5678",
    status: "active",
    gpa: "3.9",
    attendance: "96%",
    enrolled: "Sep 2022",
    avatar: "SJ",
  },
  {
    id: "S2023005",
    name: "David Brown",
    grade: "9",
    section: "D",
    email: "david.b@school.edu",
    phone: "(555) 345-6789",
    status: "active",
    gpa: "3.2",
    attendance: "92%",
    enrolled: "Aug 2023",
    avatar: "DB",
  },
];

// Initialize student cards
function initializeStudentCards() {
  const studentsGrid = document.querySelector(".students-grid");
  if (!studentsGrid) return;

  studentsGrid.innerHTML = "";

  studentsData.forEach((student) => {
    const studentCard = document.createElement("div");
    studentCard.className = "student-card";
    studentCard.dataset.id = student.id;

    studentCard.innerHTML = `
            <div class="student-header">
                <div class="student-avatar-lg">${student.avatar}</div>
                <div class="student-status status-${student.status}">
                    ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </div>
            </div>
            <div class="student-info">
                <h3>${student.name}</h3>
                <p><i class="fas fa-id-card"></i> ${student.id}</p>
                <p><i class="fas fa-envelope"></i> ${student.email}</p>
                <p><i class="fas fa-phone"></i> ${student.phone}</p>
            </div>
            <div class="student-details">
                <div class="detail-item">
                    <div class="detail-label">Class</div>
                    <div class="detail-value">Grade ${student.grade} - ${student.section}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">GPA</div>
                    <div class="detail-value">${student.gpa}/4.0</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Attendance</div>
                    <div class="detail-value">${student.attendance}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Enrolled</div>
                    <div class="detail-value">${student.enrolled}</div>
                </div>
            </div>
            <div class="button-group mt-2">
                <button class="action-btn view-student" data-id="${student.id}" style="padding: 8px 16px;">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn primary edit-student" data-id="${student.id}" style="padding: 8px 16px;">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
        `;

    studentsGrid.appendChild(studentCard);
  });

  // Add event listeners to buttons
  addStudentCardEventListeners();
}

// Add event listeners to student cards
function addStudentCardEventListeners() {
  // View buttons
  document.querySelectorAll(".view-student").forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentId = this.dataset.id;
      const student = studentsData.find((s) => s.id === studentId);
      if (student) {
        viewStudentDetails(student);
      }
    });
  });

  // Edit buttons
  document.querySelectorAll(".edit-student").forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentId = this.dataset.id;
      const student = studentsData.find((s) => s.id === studentId);
      if (student) {
        editStudent(student);
      }
    });
  });

  // Card click
  document.querySelectorAll(".student-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      // Don't trigger if clicking on buttons
      if (!e.target.closest("button")) {
        const studentId = this.dataset.id;
        const student = studentsData.find((s) => s.id === studentId);
        if (student) {
          viewStudentDetails(student);
        }
      }
    });
  });
}

// View student details
function viewStudentDetails(student) {
  const details = `
        Student Details:
        
        Name: ${student.name}
        ID: ${student.id}
        Email: ${student.email}
        Phone: ${student.phone}
        Grade: ${student.grade}
        Section: ${student.section}
        Status: ${student.status}
        GPA: ${student.gpa}/4.0
        Attendance: ${student.attendance}
        Enrolled: ${student.enrolled}
    `;

  alert(details);
}

// Edit student
function editStudent(student) {
  const newName = prompt(`Edit student name:`, student.name);
  if (newName && newName !== student.name) {
    student.name = newName;
    initializeStudentCards();
    showNotification(`Updated ${student.id}'s name to ${newName}`, "success");
  }
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById("studentSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const studentCards = document.querySelectorAll(".student-card");

    studentCards.forEach((card) => {
      const studentId = card.dataset.id;
      const student = studentsData.find((s) => s.id === studentId);

      if (student) {
        const matches =
          student.name.toLowerCase().includes(searchTerm) ||
          student.id.toLowerCase().includes(searchTerm) ||
          student.email.toLowerCase().includes(searchTerm);

        card.style.display = matches ? "block" : "none";
      }
    });
  });
}

// Filter functionality
function initializeFilters() {
  const gradeSelect = document.getElementById("gradeSelect");
  const sectionSelect = document.getElementById("sectionSelect");
  const statusFilter = document.getElementById("statusFilter");

  function applyFilters() {
    const grade = gradeSelect ? gradeSelect.value : "all";
    const section = sectionSelect ? sectionSelect.value : "all";
    const status = statusFilter ? statusFilter.value : "all";

    const studentCards = document.querySelectorAll(".student-card");

    studentCards.forEach((card) => {
      const studentId = card.dataset.id;
      const student = studentsData.find((s) => s.id === studentId);

      if (student) {
        const gradeMatch = grade === "all" || student.grade === grade;
        const sectionMatch = section === "all" || student.section === section;
        const statusMatch = status === "all" || student.status === status;

        card.style.display =
          gradeMatch && sectionMatch && statusMatch ? "block" : "none";
      }
    });
  }

  if (gradeSelect) gradeSelect.addEventListener("change", applyFilters);
  if (sectionSelect) sectionSelect.addEventListener("change", applyFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyFilters);
}

// Add new student button
function initializeAddStudentButton() {
  const addBtn = document.querySelector(".primary-btn");
  if (!addBtn) return;

  addBtn.addEventListener("click", function () {
    alert("Add New Student form would open here");

    // In a real app, this would open a modal with a form
    // For now, we'll simulate adding a student
    const newStudent = {
      id: `S2023${String(studentsData.length + 1).padStart(3, "0")}`,
      name: "New Student",
      grade: "10",
      section: "A",
      email: "new.student@school.edu",
      phone: "(555) 000-0000",
      status: "active",
      gpa: "0.0",
      attendance: "0%",
      enrolled: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      avatar: "NS",
    };

    studentsData.unshift(newStudent);
    initializeStudentCards();
    showNotification("New student added successfully!", "success");
  });
}

// View toggle functionality
function initializeViewToggle() {
  const viewBtns = document.querySelectorAll(".view-btn");
  if (!viewBtns.length) return;

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      viewBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const viewType = this.textContent.includes("Card") ? "card" : "table";
      console.log(`Switching to ${viewType} view`);

      // In a real app, this would switch between card and table views
      // For now, we'll just show a notification
      showNotification(`Switched to ${viewType} view`, "info");
    });
  });
}

// Initialize multimedia section
function initializeMultimediaSection() {
  const mediaItems = document.querySelectorAll(".media-item");
  const videoPlaceholder = document.querySelector(".video-placeholder");
  const tutorialBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(1)",
  );
  const docsBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(2)",
  );

  // Media items interaction
  mediaItems.forEach((item) => {
    item.addEventListener("click", function () {
      const title = this.querySelector(".media-title").textContent;
      showNotification(`Opening ${title} features...`, "info");
    });
  });

  // Tutorial button
  if (tutorialBtn && videoPlaceholder) {
    tutorialBtn.addEventListener("click", function () {
      videoPlaceholder.innerHTML = `
                <i class="fas fa-play-circle" style="font-size: 64px; margin-bottom: 15px;"></i>
                <span style="font-size: 18px; font-weight: 500;">Student Management Tutorial</span>
                <p style="font-size: 14px; margin-top: 10px;">Video: Managing student information effectively</p>
                <div style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-info-circle"></i> Learning student record management
                </div>
            `;
      videoPlaceholder.style.background =
        "linear-gradient(135deg, #3498db, #2980b9)";

      setTimeout(() => {
        videoPlaceholder.innerHTML = `
                    <i class="fas fa-users"></i>
                    <span>Student Records Tutorial</span>
                    <p style="font-size: 14px; margin-top: 10px;">Video: Managing student information effectively</p>
                `;
        videoPlaceholder.style.background =
          "linear-gradient(135deg, #2c3e50, #34495e)";
      }, 3000);
    });
  }

  // Documentation button
  if (docsBtn) {
    docsBtn.addEventListener("click", function () {
      showNotification("Opening student management documentation...", "info");
    });
  }
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = "student-notification";
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#2ecc71" : type === "error" ? "#e74c3c" : "#3498db"};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(notification);

  // Add animation styles if not already present
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  console.log("Student Records Management initialized");

  // Initialize all components
  initializeStudentCards();
  initializeSearch();
  initializeFilters();
  initializeAddStudentButton();
  initializeViewToggle();
  initializeMultimediaSection();

  // Header buttons
  const headerBtns = document.querySelectorAll(".header-actions .action-btn");
  headerBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const actions = ["Import", "Export", "Print"];
      const action = actions[index];
      if (action) {
        showNotification(`${action} functionality triggered`, "info");
      }
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + A to add student
    if (e.altKey && e.key === "a") {
      e.preventDefault();
      const addBtn = document.querySelector(".primary-btn");
      if (addBtn) addBtn.click();
    }
    // Alt + F to focus search
    if (e.altKey && e.key === "f") {
      e.preventDefault();
      const searchInput = document.getElementById("studentSearch");
      if (searchInput) searchInput.focus();
    }
  });

  // Add animation to student cards
  const studentCards = document.querySelectorAll(".student-card");
  studentCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = "fadeIn 0.5s ease-out";
  });
});
