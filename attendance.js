// attendance.js - For attendance.html

// Sample student data for attendance
const attendanceStudents = [
  {
    id: "S2023001",
    name: "John Smith",
    grade: "10",
    section: "A",
    status: "present",
    checkIn: "8:15 AM",
    remarks: "",
    avatar: "JS",
  },
  {
    id: "S2023002",
    name: "Emily Johnson",
    grade: "10",
    section: "A",
    status: "present",
    checkIn: "8:05 AM",
    remarks: "",
    avatar: "EJ",
  },
  {
    id: "S2023003",
    name: "Michael Chen",
    grade: "10",
    section: "A",
    status: "absent",
    checkIn: "-",
    remarks: "Sick",
    avatar: "MC",
  },
  {
    id: "S2023004",
    name: "Sarah Williams",
    grade: "10",
    section: "A",
    status: "late",
    checkIn: "8:45 AM",
    remarks: "Traffic delay",
    avatar: "SW",
  },
  {
    id: "S2023005",
    name: "David Brown",
    grade: "10",
    section: "A",
    status: "present",
    checkIn: "8:10 AM",
    remarks: "",
    avatar: "DB",
  },
];

// Sample activities
const attendanceActivities = [
  {
    type: "attendance",
    title: "Attendance Marked",
    desc: "Grade 10-A morning attendance completed",
    time: "10 min ago",
  },
  {
    type: "absent",
    title: "Absence Reported",
    desc: "Michael Chen marked absent - Sick",
    time: "45 min ago",
  },
  {
    type: "late",
    title: "Late Arrival",
    desc: "Sarah Williams arrived 45 minutes late",
    time: "1 hour ago",
  },
];

// Initialize attendance table
function initializeAttendanceTable() {
  const tableBody = document.getElementById("attendanceTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  attendanceStudents.forEach((student) => {
    const row = document.createElement("tr");

    // Get status class and text
    let statusText = "";
    let statusClass = "";
    switch (student.status) {
      case "present":
        statusText = "Present";
        statusClass = "present";
        break;
      case "absent":
        statusText = "Absent";
        statusClass = "absent";
        break;
      case "late":
        statusText = "Late";
        statusClass = "late";
        break;
      case "excused":
        statusText = "Excused";
        statusClass = "excused";
        break;
    }

    row.innerHTML = `
            <td><strong>${student.id}</strong></td>
            <td>
                <div class="student-info">
                    <div class="student-avatar">${student.avatar}</div>
                    <div class="student-details">
                        <h4>${student.name}</h4>
                        <p>${student.id}</p>
                    </div>
                </div>
            </td>
            <td>Grade ${student.grade} - ${student.section}</td>
            <td>
                <select class="status-select ${statusClass}" data-id="${student.id}">
                    <option value="present" ${student.status === "present" ? "selected" : ""}>Present</option>
                    <option value="absent" ${student.status === "absent" ? "selected" : ""}>Absent</option>
                    <option value="late" ${student.status === "late" ? "selected" : ""}>Late</option>
                    <option value="excused" ${student.status === "excused" ? "selected" : ""}>Excused</option>
                </select>
            </td>
            <td>${student.checkIn}</td>
            <td>
                <input type="text" class="remarks-input" data-id="${student.id}" 
                       value="${student.remarks}" placeholder="Add remarks...">
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-icon view-student" data-id="${student.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-icon notify-student" data-id="${student.id}">
                        <i class="fas fa-bell"></i>
                    </button>
                </div>
            </td>
        `;

    tableBody.appendChild(row);
  });

  // Add event listeners
  addAttendanceEventListeners();
}

// Add event listeners for attendance table
function addAttendanceEventListeners() {
  // Status select change
  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", function () {
      const studentId = this.dataset.id;
      const newStatus = this.value;
      updateStudentStatus(studentId, newStatus);

      // Update select class
      this.className = `status-select ${newStatus}`;
    });
  });

  // Remarks input change
  document.querySelectorAll(".remarks-input").forEach((input) => {
    input.addEventListener("change", function () {
      const studentId = this.dataset.id;
      const remarks = this.value;
      updateStudentRemarks(studentId, remarks);
    });
  });

  // View student buttons
  document.querySelectorAll(".view-student").forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentId = this.dataset.id;
      const student = attendanceStudents.find((s) => s.id === studentId);
      if (student) {
        viewStudentAttendance(student);
      }
    });
  });

  // Notify student buttons
  document.querySelectorAll(".notify-student").forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentId = this.dataset.id;
      const student = attendanceStudents.find((s) => s.id === studentId);
      if (student) {
        notifyStudent(student);
      }
    });
  });
}

// Update student status
function updateStudentStatus(studentId, newStatus) {
  const student = attendanceStudents.find((s) => s.id === studentId);
  if (student) {
    const oldStatus = student.status;
    student.status = newStatus;

    // Update check-in time based on status
    if (newStatus === "present") {
      student.checkIn = "8:15 AM";
    } else if (newStatus === "late") {
      student.checkIn = "8:45 AM";
    } else {
      student.checkIn = "-";
    }

    // Add activity
    attendanceActivities.unshift({
      type: newStatus,
      title: `Status Updated`,
      desc: `${student.name} marked as ${newStatus}`,
      time: "Just now",
    });

    // Update activity list
    updateActivityList();

    // Update stats
    updateAttendanceStats();

    showNotification(
      `Updated ${student.name}'s status to ${newStatus}`,
      "success",
    );
  }
}

// Update student remarks
function updateStudentRemarks(studentId, remarks) {
  const student = attendanceStudents.find((s) => s.id === studentId);
  if (student) {
    student.remarks = remarks;
    showNotification(`Updated remarks for ${student.name}`, "info");
  }
}

// View student attendance details
function viewStudentAttendance(student) {
  const details = `
        Student Attendance Details:
        
        Name: ${student.name}
        ID: ${student.id}
        Status: ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        Check-in: ${student.checkIn}
        Remarks: ${student.remarks || "None"}
        Grade: ${student.grade}
        Section: ${student.section}
    `;

  alert(details);
}

// Notify student
function notifyStudent(student) {
  const message = prompt(
    `Send notification to ${student.name}:`,
    `Your attendance has been marked as ${student.status}`,
  );
  if (message) {
    showNotification(`Notification sent to ${student.name}`, "success");
  }
}

// Update activity list
function updateActivityList() {
  const activityList = document.getElementById("activityList");
  if (!activityList) return;

  activityList.innerHTML = "";

  attendanceActivities.forEach((activity) => {
    const item = document.createElement("div");
    item.className = "activity-item";
    item.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${
                  activity.type === "attendance"
                    ? "check-circle"
                    : activity.type === "absent"
                      ? "times-circle"
                      : activity.type === "late"
                        ? "clock"
                        : "bell"
                }"></i>
            </div>
            <div class="activity-info">
                <h4>${activity.title}</h4>
                <p>${activity.desc}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
    activityList.appendChild(item);
  });
}

// Update attendance stats
function updateAttendanceStats() {
  const presentCount = attendanceStudents.filter(
    (s) => s.status === "present",
  ).length;
  const absentCount = attendanceStudents.filter(
    (s) => s.status === "absent",
  ).length;
  const lateCount = attendanceStudents.filter(
    (s) => s.status === "late",
  ).length;
  const totalStudents = attendanceStudents.length;
  const attendanceRate = ((presentCount / totalStudents) * 100).toFixed(1);

  // Update stat cards if they exist
  const statCards = document.querySelectorAll(".stat-card .stat-value");
  if (statCards.length >= 3) {
    statCards[0].textContent = `${attendanceRate}%`;
    statCards[1].textContent = absentCount;
    statCards[2].textContent = lateCount;
  }
}

// Date navigation
function initializeDateNavigation() {
  let currentDate = new Date();

  const prevDateBtn = document.getElementById("prevDate");
  const nextDateBtn = document.getElementById("nextDate");
  const todayBtn = document.getElementById("todayBtn");
  const currentDateElement = document.getElementById("currentDate");

  function updateDateDisplay() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    currentDateElement.textContent = currentDate.toLocaleDateString(
      "en-US",
      options,
    );
  }

  if (prevDateBtn) {
    prevDateBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() - 1);
      updateDateDisplay();
      showNotification(`Viewing attendance for previous day`, "info");
    });
  }

  if (nextDateBtn) {
    nextDateBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() + 1);
      updateDateDisplay();
      showNotification(`Viewing attendance for next day`, "info");
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener("click", () => {
      currentDate = new Date();
      updateDateDisplay();
      showNotification(`Viewing today's attendance`, "success");
    });
  }

  updateDateDisplay();
}

// Filter functionality
function initializeFilters() {
  const gradeSelect = document.getElementById("gradeSelect");
  const sectionSelect = document.getElementById("sectionSelect");
  const statusFilter = document.getElementById("statusFilter");
  const searchInput = document.getElementById("studentSearch");

  function applyFilters() {
    const grade = gradeSelect ? gradeSelect.value : "all";
    const section = sectionSelect ? sectionSelect.value : "all";
    const status = statusFilter ? statusFilter.value : "all";
    const search = searchInput ? searchInput.value.toLowerCase() : "";

    const rows = document.querySelectorAll("#attendanceTableBody tr");
    let visibleCount = 0;

    rows.forEach((row) => {
      const studentId = row.querySelector("td:nth-child(1) strong").textContent;
      const student = attendanceStudents.find((s) => s.id === studentId);

      if (student) {
        const gradeMatch = grade === "all" || student.grade === grade;
        const sectionMatch = section === "all" || student.section === section;
        const statusMatch = status === "all" || student.status === status;
        const searchMatch =
          !search ||
          student.name.toLowerCase().includes(search) ||
          student.id.toLowerCase().includes(search);

        const shouldShow =
          gradeMatch && sectionMatch && statusMatch && searchMatch;
        row.style.display = shouldShow ? "" : "none";

        if (shouldShow) visibleCount++;
      }
    });

    // Update count
    const countElement = document.querySelector(".table-subtitle");
    if (countElement) {
      countElement.textContent = `Showing ${visibleCount} students`;
    }
  }

  if (gradeSelect) gradeSelect.addEventListener("change", applyFilters);
  if (sectionSelect) sectionSelect.addEventListener("change", applyFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyFilters);
  if (searchInput) searchInput.addEventListener("input", applyFilters);

  applyFilters(); // Initial filter
}

// Mark all buttons
function initializeMarkAllButtons() {
  const markAllPresent = document.getElementById("markAllPresent");
  const markAllAbsent = document.getElementById("markAllAbsent");
  const markAllLate = document.getElementById("markAllLate");

  function markAll(status) {
    if (confirm(`Are you sure you want to mark ALL students as ${status}?`)) {
      attendanceStudents.forEach((student) => {
        student.status = status;
        if (status === "present") {
          student.checkIn = "8:15 AM";
        } else if (status === "late") {
          student.checkIn = "8:45 AM";
        } else {
          student.checkIn = "-";
        }
      });

      initializeAttendanceTable();
      updateAttendanceStats();

      // Add activity
      attendanceActivities.unshift({
        type: status,
        title: `Bulk Update`,
        desc: `All students marked as ${status}`,
        time: "Just now",
      });

      updateActivityList();
      showNotification(`All students marked as ${status}`, "success");
    }
  }

  if (markAllPresent) {
    markAllPresent.addEventListener("click", () => markAll("present"));
  }

  if (markAllAbsent) {
    markAllAbsent.addEventListener("click", () => markAll("absent"));
  }

  if (markAllLate) {
    markAllLate.addEventListener("click", () => markAll("late"));
  }
}

// Header buttons
function initializeHeaderButtons() {
  const markAttendanceBtn = document.getElementById("markAttendance");
  const exportAttendanceBtn = document.getElementById("exportAttendance");

  if (markAttendanceBtn) {
    markAttendanceBtn.addEventListener("click", function () {
      showNotification("Today's attendance marked successfully!", "success");
    });
  }

  if (exportAttendanceBtn) {
    exportAttendanceBtn.addEventListener("click", function () {
      alert("Exporting attendance report...");
      showNotification("Attendance report exported successfully!", "success");
    });
  }
}

// Initialize charts
function initializeCharts() {
  if (typeof Chart === "undefined") return;

  // Attendance Trend Chart
  const trendCtx = document.getElementById("attendanceTrendChart");
  if (trendCtx) {
    const trendChart = new Chart(trendCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Attendance Rate",
            data: [92.5, 94.2, 93.8, 95.1, 94.7, 91.3, 90.8],
            borderColor: "#2ecc71",
            backgroundColor: "rgba(46, 204, 113, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.parsed.y}% attendance`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 85,
            max: 100,
            grid: { color: "rgba(0, 0, 0, 0.05)" },
            ticks: { callback: (value) => value + "%" },
          },
          x: { grid: { color: "rgba(0, 0, 0, 0.05)" } },
        },
      },
    });

    window.trendChart = trendChart;
  }

  // Status Distribution Chart
  const distributionCtx = document.getElementById("statusDistributionChart");
  if (distributionCtx) {
    const distributionChart = new Chart(distributionCtx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Present", "Absent", "Late", "Excused"],
        datasets: [
          {
            data: [65, 12, 8, 5],
            backgroundColor: ["#2ecc71", "#e74c3c", "#f39c12", "#3498db"],
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right" },
        },
        cutout: "65%",
      },
    });

    window.distributionChart = distributionChart;
  }
}

// Initialize multimedia section
function initializeMultimediaSection() {
  const mediaItems = document.querySelectorAll(".media-item");
  const videoPlaceholder = document.querySelector(".video-placeholder");
  const tutorialBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(1)",
  );
  const handbookBtn = document.querySelector(
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
                <span style="font-size: 18px; font-weight: 500;">Attendance Tutorial Playing</span>
                <p style="font-size: 14px; margin-top: 10px;">Video: Best practices for attendance tracking</p>
                <div style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-info-circle"></i> Learning effective attendance management
                </div>
            `;
      videoPlaceholder.style.background =
        "linear-gradient(135deg, #3498db, #2980b9)";

      setTimeout(() => {
        videoPlaceholder.innerHTML = `
                    <i class="fas fa-graduation-cap"></i>
                    <span>Attendance Management Tutorial</span>
                    <p style="font-size: 14px; margin-top: 10px;">Video: Best practices for attendance tracking</p>
                `;
        videoPlaceholder.style.background =
          "linear-gradient(135deg, #2c3e50, #34495e)";
      }, 3000);
    });
  }

  // Handbook button
  if (handbookBtn) {
    handbookBtn.addEventListener("click", function () {
      showNotification("Downloading attendance handbook...", "info");
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
  console.log("Attendance Management initialized");

  // Initialize all components
  initializeAttendanceTable();
  initializeDateNavigation();
  initializeFilters();
  initializeMarkAllButtons();
  initializeHeaderButtons();
  initializeCharts();
  updateActivityList();
  updateAttendanceStats();
  initializeMultimediaSection();

  // Add animation to table rows
  const tableRows = document.querySelectorAll("#attendanceTableBody tr");
  tableRows.forEach((row, index) => {
    row.style.animationDelay = `${index * 0.1}s`;
    row.style.animation = "fadeIn 0.5s ease-out";
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + M to mark attendance
    if (e.altKey && e.key === "m") {
      e.preventDefault();
      const markBtn = document.getElementById("markAttendance");
      if (markBtn) markBtn.click();
    }
    // Alt + E to export
    if (e.altKey && e.key === "e") {
      e.preventDefault();
      const exportBtn = document.getElementById("exportAttendance");
      if (exportBtn) exportBtn.click();
    }
  });
});
