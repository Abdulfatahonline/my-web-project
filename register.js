// register.js - For register.html

// Sample recent registrations
const recentRegistrations = [
  {
    id: "S2023120",
    name: "Alex Johnson",
    email: "alex.j@school.edu",
    grade: "11",
    section: "B",
    date: "Today, 10:30 AM",
    status: "active",
    avatar: "AJ",
  },
  {
    id: "S2023119",
    name: "Sophia Rodriguez",
    email: "sophia.r@school.edu",
    grade: "10",
    section: "A",
    date: "Yesterday, 2:15 PM",
    status: "active",
    avatar: "SR",
  },
  {
    id: "S2023118",
    name: "Thomas Kim",
    email: "thomas.k@school.edu",
    grade: "12",
    section: "C",
    date: "Nov 25, 2023",
    status: "active",
    avatar: "TK",
  },
];

// Initialize registration form
function initializeRegistrationForm() {
  const form = document.getElementById("registrationForm");
  if (!form) return;

  // Auto-generate student ID
  const studentIdInput = form.querySelector(
    'input[placeholder="Auto-generated"]',
  );
  if (studentIdInput) {
    studentIdInput.value = `S${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const studentData = {};

    for (let [key, value] of formData.entries()) {
      studentData[key] = value;
    }

    // Validate required fields
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#e74c3c";
        isValid = false;
      } else {
        field.style.borderColor = "";
      }
    });

    if (!isValid) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    // Simulate form submission
    showNotification("Registering student...", "info");

    setTimeout(() => {
      // Add to recent registrations
      const newRegistration = {
        id: studentIdInput.value,
        name: `${form.querySelector('input[placeholder="Enter first name"]').value} ${form.querySelector('input[placeholder="Enter last name"]').value}`,
        email:
          form.querySelector('input[type="email"]').value ||
          "new.student@school.edu",
        grade: form.querySelector("select").value || "10",
        section: form.querySelectorAll("select")[1].value || "A",
        date: "Just now",
        status: "active",
        avatar: studentIdInput.value.substring(0, 2).toUpperCase(),
      };

      recentRegistrations.unshift(newRegistration);
      updateRecentRegistrations();

      // Reset form
      form.reset();

      // Regenerate student ID
      studentIdInput.value = `S${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

      showNotification("Student registered successfully!", "success");
    }, 1500);
  });

  // Clear form button
  const clearBtn = form.querySelector('button[type="reset"]');
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      showNotification("Form cleared", "info");
    });
  }

  // Upload photo button
  const uploadBtn = form.querySelector('button[type="button"]');
  if (uploadBtn) {
    uploadBtn.addEventListener("click", function () {
      alert("Photo upload functionality would open here");
    });
  }
}

// Update recent registrations table
function updateRecentRegistrations() {
  const tableBody = document.querySelector(".attendance-table tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  recentRegistrations.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td><strong>${student.id}</strong></td>
            <td>
                <div class="student-info">
                    <div class="student-avatar">${student.avatar}</div>
                    <div class="student-details">
                        <h4>${student.name}</h4>
                        <p>${student.email}</p>
                    </div>
                </div>
            </td>
            <td>Grade ${student.grade} - ${student.section}</td>
            <td>${student.date}</td>
            <td>
                <span class="student-status status-${student.status}">
                    ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-icon edit-registration" data-id="${student.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-icon print-registration" data-id="${student.id}">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            </td>
        `;

    tableBody.appendChild(row);
  });

  // Add event listeners
  addRegistrationEventListeners();
}

// Add event listeners to registration table
function addRegistrationEventListeners() {
  // Edit buttons
  document.querySelectorAll(".edit-registration").forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentId = this.dataset.id;
      const student = recentRegistrations.find((s) => s.id === studentId);
      if (student) {
        editRegistration(student);
      }
    });
  });

  // Print buttons
  document.querySelectorAll(".print-registration").forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentId = this.dataset.id;
      const student = recentRegistrations.find((s) => s.id === studentId);
      if (student) {
        printRegistration(student);
      }
    });
  });
}

// Edit registration
function editRegistration(student) {
  const newName = prompt(`Edit student name:`, student.name);
  if (newName && newName !== student.name) {
    student.name = newName;
    updateRecentRegistrations();
    showNotification(`Updated ${student.id}'s information`, "success");
  }
}

// Print registration
function printRegistration(student) {
  const printContent = `
        Student Registration Form
        ========================
        
        Student ID: ${student.id}
        Name: ${student.name}
        Email: ${student.email}
        Grade: ${student.grade}
        Section: ${student.section}
        Status: ${student.status}
        Registered: ${student.date}
        
        ------------------------
        Generated: ${new Date().toLocaleString()}
    `;

  alert(
    "This would open print preview with the following content:\n\n" +
      printContent,
  );
}

// Search functionality for recent registrations
function initializeSearch() {
  const searchInput = document.querySelector(".table-search input");
  if (!searchInput) return;

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll(".attendance-table tbody tr");

    rows.forEach((row) => {
      const studentId = row.querySelector("td:nth-child(1) strong").textContent;
      const studentName = row.querySelector(".student-details h4").textContent;
      const studentEmail = row.querySelector(".student-details p").textContent;

      const matches =
        studentId.toLowerCase().includes(searchTerm) ||
        studentName.toLowerCase().includes(searchTerm) ||
        studentEmail.toLowerCase().includes(searchTerm);

      row.style.display = matches ? "" : "none";
    });
  });
}

// Header buttons
function initializeHeaderButtons() {
  const viewAllBtn = document.getElementById("viewAllStudents");
  const bulkRegisterBtn = document.getElementById("bulkRegister");

  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", function () {
      showNotification("Opening all students list...", "info");
      // In a real app, this would redirect to student records page
      setTimeout(() => {
        window.location.href = "studentRecordsManagement.html";
      }, 1000);
    });
  }

  if (bulkRegisterBtn) {
    bulkRegisterBtn.addEventListener("click", function () {
      alert("Bulk registration import would open here");
      showNotification("Opening bulk registration import...", "info");
    });
  }
}

// Quick actions
function initializeQuickActions() {
  const quickActions = document.querySelectorAll(".action-item");

  quickActions.forEach((action) => {
    action.addEventListener("click", function () {
      const label = this.querySelector(".action-label").textContent;

      // Visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);

      switch (label) {
        case "Print Forms":
          alert("Printing registration forms...");
          break;
        case "Import List":
          alert("Opening import wizard...");
          break;
        case "Generate ID":
          alert("Generating student ID cards...");
          break;
        case "Send Welcome":
          alert("Sending welcome emails...");
          break;
      }

      showNotification(`Initiating ${label}...`, "info");
    });
  });
}

// Checklist interaction
function initializeChecklist() {
  const checklistItems = document.querySelectorAll(".activity-item");

  checklistItems.forEach((item) => {
    item.addEventListener("click", function () {
      const icon = this.querySelector(".activity-icon i");
      const title = this.querySelector("h4").textContent;

      if (
        icon.classList.contains("fa-times-circle") ||
        icon.classList.contains("fa-clock")
      ) {
        icon.className = "fas fa-check-circle";
        this.querySelector(".activity-icon").className =
          "activity-icon present";
        showNotification(`${title} - Marked as complete`, "success");
      } else {
        icon.className = "fas fa-times-circle";
        this.querySelector(".activity-icon").className = "activity-icon absent";
        showNotification(`${title} - Marked as incomplete`, "info");
      }
    });
  });
}

// Initialize multimedia section
function initializeMultimediaSection() {
  const mediaItems = document.querySelectorAll(".media-item");
  const videoPlaceholder = document.querySelector(".video-placeholder");
  const guideBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(1)",
  );
  const formsBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(2)",
  );

  // Media items interaction
  mediaItems.forEach((item) => {
    item.addEventListener("click", function () {
      const title = this.querySelector(".media-title").textContent;
      showNotification(`Opening ${title} features...`, "info");
    });
  });

  // Guide button
  if (guideBtn && videoPlaceholder) {
    guideBtn.addEventListener("click", function () {
      videoPlaceholder.innerHTML = `
                <i class="fas fa-play-circle" style="font-size: 64px; margin-bottom: 15px;"></i>
                <span style="font-size: 18px; font-weight: 500;">Registration Guide Playing</span>
                <p style="font-size: 14px; margin-top: 10px;">Video: Step-by-step registration tutorial</p>
                <div style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-info-circle"></i> Learning the registration process
                </div>
            `;
      videoPlaceholder.style.background =
        "linear-gradient(135deg, #3498db, #2980b9)";

      setTimeout(() => {
        videoPlaceholder.innerHTML = `
                    <i class="fas fa-user-graduate"></i>
                    <span>Registration Process Guide</span>
                    <p style="font-size: 14px; margin-top: 10px;">Video: Step-by-step registration tutorial</p>
                `;
        videoPlaceholder.style.background =
          "linear-gradient(135deg, #2c3e50, #34495e)";
      }, 3000);
    });
  }

  // Forms button
  if (formsBtn) {
    formsBtn.addEventListener("click", function () {
      showNotification("Opening printable registration forms...", "info");
    });
  }
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
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

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  console.log("Student Registration initialized");

  // Initialize all components
  initializeRegistrationForm();
  updateRecentRegistrations();
  initializeSearch();
  initializeHeaderButtons();
  initializeQuickActions();
  initializeChecklist();
  initializeMultimediaSection();

  // Add animation to form elements
  const formInputs = document.querySelectorAll("input, select, textarea");
  formInputs.forEach((input, index) => {
    input.style.animationDelay = `${index * 0.05}s`;
    input.style.animation = "fadeIn 0.3s ease-out";
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + S to submit form
    if (e.altKey && e.key === "s") {
      e.preventDefault();
      const submitBtn = document.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.click();
    }
    // Alt + C to clear form
    if (e.altKey && e.key === "c") {
      e.preventDefault();
      const clearBtn = document.querySelector('button[type="reset"]');
      if (clearBtn) clearBtn.click();
    }
  });
});
