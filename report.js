// reports.js - For reports.html

// Sample reports data
const reportsData = [
  {
    id: "REP-2023-001",
    title: "Attendance Summary",
    period: "November 2023",
    grade: "10-A & 10-B",
    pages: 12,
    format: "PDF",
    size: "2.4 MB",
    generated: "Today",
    status: "generated",
    icon: "fa-calendar-check",
    color: "#3498db",
  },
  {
    id: "REP-2023-002",
    title: "Academic Performance",
    period: "Semester 1, 2023",
    grade: "All Grades",
    pages: 24,
    format: "Excel",
    size: "3.8 MB",
    generated: "2 days ago",
    status: "generated",
    icon: "fa-chart-line",
    color: "#2ecc71",
  },
  {
    id: "REP-2023-003",
    title: "Student Progress",
    period: "Weekly Report",
    grade: "Grade 11 Only",
    pages: 8,
    format: "PDF",
    size: "1.2 MB",
    generated: "Just now",
    status: "processing",
    icon: "fa-user-graduate",
    color: "#9b59b6",
  },
];

// Initialize reports cards
function initializeReportsCards() {
  const reportsGrid = document.querySelector(".students-grid");
  if (!reportsGrid) return;

  reportsGrid.innerHTML = "";

  reportsData.forEach((report) => {
    const reportCard = document.createElement("div");
    reportCard.className = "student-card";
    reportCard.dataset.id = report.id;

    const statusClass =
      report.status === "generated" ? "status-active" : "status-inactive";
    const statusIcon =
      report.status === "generated" ? "fa-check-circle" : "fa-clock";
    const statusText =
      report.status === "generated" ? "Generated" : "Processing";

    reportCard.innerHTML = `
            <div class="student-header">
                <div class="student-avatar-lg" style="background: linear-gradient(135deg, ${report.color}, ${adjustColor(report.color, -20)});">
                    <i class="fas ${report.icon}"></i>
                </div>
                <div class="student-status ${statusClass}">
                    <i class="fas ${statusIcon}"></i> ${statusText}
                </div>
            </div>
            <div class="student-info">
                <h3>${report.title}</h3>
                <p><i class="fas fa-calendar"></i> ${report.period}</p>
                <p><i class="fas fa-users"></i> ${report.grade}</p>
            </div>
            <div class="student-details">
                <div class="detail-item">
                    <div class="detail-label">Pages</div>
                    <div class="detail-value">${report.pages}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Format</div>
                    <div class="detail-value">${report.format}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Size</div>
                    <div class="detail-value">${report.size}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Generated</div>
                    <div class="detail-value">${report.generated}</div>
                </div>
            </div>
            <div class="button-group mt-2">
                <button class="action-btn view-report" data-id="${report.id}" style="padding: 8px 16px;">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn ${report.status === "processing" ? "danger" : "primary"} ${report.status === "processing" ? "cancel-report" : "download-report"}" 
                        data-id="${report.id}" style="padding: 8px 16px;">
                    <i class="fas ${report.status === "processing" ? "fa-times" : "fa-download"}"></i> 
                    ${report.status === "processing" ? "Cancel" : "Download"}
                </button>
            </div>
        `;

    reportsGrid.appendChild(reportCard);
  });

  // Add event listeners
  addReportEventListeners();
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  // Simple color adjustment for gradient
  return color; // In a real app, this would adjust the color
}

// Add event listeners to report cards
function addReportEventListeners() {
  // View buttons
  document.querySelectorAll(".view-report").forEach((btn) => {
    btn.addEventListener("click", function () {
      const reportId = this.dataset.id;
      const report = reportsData.find((r) => r.id === reportId);
      if (report) {
        viewReport(report);
      }
    });
  });

  // Download buttons
  document.querySelectorAll(".download-report").forEach((btn) => {
    btn.addEventListener("click", function () {
      const reportId = this.dataset.id;
      const report = reportsData.find((r) => r.id === reportId);
      if (report) {
        downloadReport(report);
      }
    });
  });

  // Cancel buttons
  document.querySelectorAll(".cancel-report").forEach((btn) => {
    btn.addEventListener("click", function () {
      const reportId = this.dataset.id;
      const report = reportsData.find((r) => r.id === reportId);
      if (report) {
        cancelReport(report);
      }
    });
  });
}

// View report
function viewReport(report) {
  const details = `
        Report Details:
        
        Title: ${report.title}
        ID: ${report.id}
        Period: ${report.period}
        Grade Level: ${report.grade}
        Pages: ${report.pages}
        Format: ${report.format}
        Size: ${report.size}
        Generated: ${report.generated}
        Status: ${report.status}
    `;

  alert(details + "\n\nThis would open the report in a preview window.");
}

// Download report
function downloadReport(report) {
  showNotification(`Downloading ${report.title}...`, "info");

  // Simulate download delay
  setTimeout(() => {
    showNotification(`${report.title} downloaded successfully!`, "success");
  }, 1500);
}

// Cancel report
function cancelReport(report) {
  if (confirm(`Are you sure you want to cancel "${report.title}"?`)) {
    report.status = "cancelled";
    initializeReportsCards();
    showNotification(`Report "${report.title}" cancelled`, "info");
  }
}

// Filter functionality
function initializeFilters() {
  const dateRange = document.getElementById("dateRange");
  const reportGrade = document.getElementById("reportGrade");
  const reportType = document.getElementById("reportType");

  const generateBtn = document.querySelector(".primary-btn");
  const resetBtn = document.querySelector(".action-btn");

  if (generateBtn) {
    generateBtn.addEventListener("click", function () {
      const date = dateRange ? dateRange.value : "Last 7 Days";
      const grade = reportGrade ? reportGrade.value : "All Grades";
      const type = reportType ? reportType.value : "Attendance Summary";

      showNotification(
        `Generating ${type} report for ${grade} (${date})...`,
        "info",
      );

      // Simulate report generation
      setTimeout(() => {
        // Add new report
        const newReport = {
          id: `REP-${new Date().getFullYear()}-${String(reportsData.length + 1).padStart(3, "0")}`,
          title: type,
          period: date,
          grade: grade,
          pages: Math.floor(Math.random() * 20) + 5,
          format: type.includes("Excel") ? "Excel" : "PDF",
          size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
          generated: "Just now",
          status: "generated",
          icon: getIconForReportType(type),
          color: getColorForReportType(type),
        };

        reportsData.unshift(newReport);
        initializeReportsCards();
        showNotification(`Report generated successfully!`, "success");
      }, 2000);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (dateRange) dateRange.value = "Last 7 Days";
      if (reportGrade) reportGrade.value = "All Grades";
      if (reportType) reportType.value = "Attendance Summary";
      showNotification("Filters reset to default", "info");
    });
  }
}

// Helper function to get icon for report type
function getIconForReportType(type) {
  if (type.includes("Attendance")) return "fa-calendar-check";
  if (type.includes("Academic") || type.includes("Performance"))
    return "fa-chart-line";
  if (type.includes("Student") || type.includes("Progress"))
    return "fa-user-graduate";
  if (type.includes("Class") || type.includes("Statistics"))
    return "fa-chart-bar";
  return "fa-file-alt";
}

// Helper function to get color for report type
function getColorForReportType(type) {
  if (type.includes("Attendance")) return "#3498db";
  if (type.includes("Academic") || type.includes("Performance"))
    return "#2ecc71";
  if (type.includes("Student") || type.includes("Progress")) return "#9b59b6";
  if (type.includes("Class") || type.includes("Statistics")) return "#f39c12";
  return "#95a5a6";
}

// Initialize charts
function initializeCharts() {
  if (typeof Chart === "undefined") return;

  // Attendance Chart
  const attendanceCtx = document.getElementById("attendanceChart");
  if (attendanceCtx) {
    const attendanceChart = new Chart(attendanceCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Attendance Rate",
            data: [92.5, 94.2, 93.8, 95.1],
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
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
  }

  // Grade Chart
  const gradeCtx = document.getElementById("gradeChart");
  if (gradeCtx) {
    const gradeChart = new Chart(gradeCtx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: [
          "A (90-100)",
          "B (80-89)",
          "C (70-79)",
          "D (60-69)",
          "F (Below 60)",
        ],
        datasets: [
          {
            data: [25, 35, 20, 15, 5],
            backgroundColor: [
              "#2ecc71",
              "#3498db",
              "#f1c40f",
              "#e67e22",
              "#e74c3c",
            ],
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
  }
}

// Initialize multimedia section
function initializeMultimediaSection() {
  const mediaItems = document.querySelectorAll(".media-item");
  const videoPlaceholder = document.querySelector(".video-placeholder");
  const tutorialBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(1)",
  );
  const templatesBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(2)",
  );
  const quickActions = document.querySelectorAll(".action-item");

  // Media items interaction
  mediaItems.forEach((item) => {
    item.addEventListener("click", function () {
      const title = this.querySelector(".media-title").textContent;
      showNotification(`Opening ${title} tools...`, "info");
    });
  });

  // Quick actions
  quickActions.forEach((action) => {
    action.addEventListener("click", function () {
      const label = this.querySelector(".action-label").textContent;
      showNotification(`Initiating ${label}...`, "info");
    });
  });

  // Tutorial button
  if (tutorialBtn && videoPlaceholder) {
    tutorialBtn.addEventListener("click", function () {
      videoPlaceholder.innerHTML = `
                <i class="fas fa-play-circle" style="font-size: 64px; margin-bottom: 15px;"></i>
                <span style="font-size: 18px; font-weight: 500;">Report Tutorial Playing</span>
                <p style="font-size: 14px; margin-top: 10px;">Video: How to create effective reports</p>
                <div style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-info-circle"></i> Learning report generation techniques
                </div>
            `;
      videoPlaceholder.style.background =
        "linear-gradient(135deg, #3498db, #2980b9)";

      setTimeout(() => {
        videoPlaceholder.innerHTML = `
                    <i class="fas fa-file-alt"></i>
                    <span>Report Generation Guide</span>
                    <p style="font-size: 14px; margin-top: 10px;">Video: How to create effective reports</p>
                `;
        videoPlaceholder.style.background =
          "linear-gradient(135deg, #2c3e50, #34495e)";
      }, 3000);
    });
  }

  // Templates button
  if (templatesBtn) {
    templatesBtn.addEventListener("click", function () {
      showNotification("Downloading report templates...", "info");
    });
  }
}

// Header buttons
function initializeHeaderButtons() {
  const generateReportBtn = document.getElementById("generateReport");
  const exportAllBtn = document.getElementById("exportAll");

  if (generateReportBtn) {
    generateReportBtn.addEventListener("click", function () {
      showNotification("Opening report generation wizard...", "info");
    });
  }

  if (exportAllBtn) {
    exportAllBtn.addEventListener("click", function () {
      if (confirm("Export all reports? This may take a moment.")) {
        showNotification("Exporting all reports...", "info");
        setTimeout(() => {
          showNotification("All reports exported successfully!", "success");
        }, 2000);
      }
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
  console.log("Reports & Analytics initialized");

  // Initialize all components
  initializeReportsCards();
  initializeFilters();
  initializeCharts();
  initializeMultimediaSection();
  initializeHeaderButtons();

  // Add animation to report cards
  const reportCards = document.querySelectorAll(".student-card");
  reportCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = "fadeIn 0.5s ease-out";
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + G to generate report
    if (e.altKey && e.key === "g") {
      e.preventDefault();
      const generateBtn = document.querySelector(".primary-btn");
      if (generateBtn) generateBtn.click();
    }
    // Alt + X to export
    if (e.altKey && e.key === "x") {
      e.preventDefault();
      const exportBtn = document.getElementById("exportAll");
      if (exportBtn) exportBtn.click();
    }
  });
});
