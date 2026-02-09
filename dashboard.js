// dashboard.js - For dashboard.html

// Initialize Charts
function initializeCharts() {
  // Check if Chart.js is loaded
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not loaded");
    return;
  }

  // Attendance Chart
  const attendanceCtx = document.getElementById("attendanceChart");
  if (attendanceCtx) {
    const attendanceChart = new Chart(attendanceCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Attendance Rate",
            data: [92, 94, 93, 95, 94, 91, 90],
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
                return `${context.dataset.label}: ${context.parsed.y}%`;
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
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
          },
          x: {
            grid: { color: "rgba(0, 0, 0, 0.05)" },
          },
        },
      },
    });

    // Store chart reference for updates
    window.attendanceChart = attendanceChart;
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
            data: [35, 40, 15, 7, 3],
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

    window.gradeChart = gradeChart;
  }
}

// Period button functionality
function initializePeriodButtons() {
  const periodBtns = document.querySelectorAll(".period-btn");

  periodBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      periodBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const period = this.textContent;
      console.log(`Switching to ${period} view`);

      // Update chart data based on period
      if (window.attendanceChart) {
        if (period === "Weekly") {
          window.attendanceChart.data.labels = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ];
          window.attendanceChart.data.datasets[0].data = [
            92, 94, 93, 95, 94, 91, 90,
          ];
        } else if (period === "Monthly") {
          window.attendanceChart.data.labels = [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
          ];
          window.attendanceChart.data.datasets[0].data = [93, 94, 92, 95];
        } else {
          window.attendanceChart.data.labels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          window.attendanceChart.data.datasets[0].data = [
            91, 92, 93, 94, 95, 94, 92, 93, 94, 95, 94, 93,
          ];
        }
        window.attendanceChart.update();
      }
    });
  });
}

// Quick Actions functionality
function initializeQuickActions() {
  const actionItems = document.querySelectorAll(".action-item");

  actionItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      const actions = [
        "Add Student",
        "Import Data",
        "Generate Report",
        "Schedule Event",
      ];
      const action = actions[index] || "Action";

      // Visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);

      alert(`Opening ${action} form...`);
    });
  });
}

// Header buttons functionality
function initializeHeaderButtons() {
  // Refresh button
  const refreshBtn = document.querySelector(".action-btn:nth-child(1)");
  if (refreshBtn && refreshBtn.querySelector(".fa-sync-alt")) {
    refreshBtn.addEventListener("click", function () {
      console.log("Refreshing dashboard...");

      // Add spinning animation
      const icon = this.querySelector("i");
      icon.classList.add("fa-spin");

      // Simulate refresh delay
      setTimeout(() => {
        icon.classList.remove("fa-spin");

        // Update date/time
        updateDateTime();

        // Show notification
        showNotification("Dashboard refreshed successfully!", "success");
      }, 1000);
    });
  }

  // Settings button
  const settingsBtn = document.querySelector(".action-btn:nth-child(2)");
  if (settingsBtn && settingsBtn.querySelector(".fa-cog")) {
    settingsBtn.addEventListener("click", function () {
      console.log("Opening settings...");
      alert("Settings panel would open here");
    });
  }
}

// Update date and time
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = now.toLocaleDateString("en-US", options);
  const day = dateStr.split(",")[0];
  const date = dateStr.split(",")[1] + "," + dateStr.split(",")[2];

  const dayElement = document.querySelector(".day");
  const dateElement = document.querySelector(".date");

  if (dayElement) dayElement.textContent = day;
  if (dateElement) dateElement.textContent = date;
}

// Activity load more functionality
function initializeActivityLoadMore() {
  const loadMoreBtn = document.querySelector(".activity-card .action-btn");
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener("click", function () {
    console.log("Loading more activities...");

    const activities = [
      {
        icon: "fa-user-edit",
        type: "student",
        title: "Student Profile Updated",
        desc: "Emily Wilson - Contact info changed",
        time: "1 day ago",
      },
      {
        icon: "fa-award",
        type: "grade",
        title: "Student Award",
        desc: "Michael Chen - Perfect attendance",
        time: "2 days ago",
      },
      {
        icon: "fa-exclamation-circle",
        type: "system",
        title: "System Maintenance",
        desc: "Scheduled for this weekend",
        time: "3 days ago",
      },
    ];

    const activityList = document.querySelector(".activity-list");

    activities.forEach((activity) => {
      const activityItem = document.createElement("div");
      activityItem.className = "activity-item";
      activityItem.innerHTML = `
                <div class="activity-icon ${activity.type}">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-info">
                    <h4>${activity.title}</h4>
                    <p><i class="fas fa-info-circle"></i> ${activity.desc}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            `;
      activityList.appendChild(activityItem);
    });

    // Hide load more button after clicking
    this.style.display = "none";

    showNotification("More activities loaded!", "info");
  });
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "dashboard-notification";
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

// Initialize dashboard multimedia section
function initializeMultimediaSection() {
  const mediaItems = document.querySelectorAll(".media-item");
  const videoPlaceholder = document.querySelector(".video-placeholder");
  const playBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(1)",
  );
  const customizeBtn = document.querySelector(
    ".multimedia-section .action-btn:nth-child(2)",
  );

  // Media items interaction
  mediaItems.forEach((item) => {
    item.addEventListener("click", function () {
      const title = this.querySelector(".media-title").textContent;
      showNotification(`Opening ${title} details...`, "info");
    });
  });

  // Play button
  if (playBtn && videoPlaceholder) {
    playBtn.addEventListener("click", function () {
      videoPlaceholder.innerHTML = `
                <i class="fas fa-play-circle" style="font-size: 64px; margin-bottom: 15px;"></i>
                <span style="font-size: 18px; font-weight: 500;">Dashboard Tutorial Playing</span>
                <p style="font-size: 14px; margin-top: 10px;">Video: Maximizing dashboard efficiency</p>
                <div style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-info-circle"></i> This would play an actual tutorial video
                </div>
            `;
      videoPlaceholder.style.background =
        "linear-gradient(135deg, #3498db, #2980b9)";

      setTimeout(() => {
        videoPlaceholder.innerHTML = `
                    <i class="fas fa-desktop"></i>
                    <span>Dashboard Tutorial</span>
                    <p style="font-size: 14px; margin-top: 10px;">Video: Maximizing dashboard efficiency</p>
                `;
        videoPlaceholder.style.background =
          "linear-gradient(135deg, #2c3e50, #34495e)";
      }, 3000);
    });
  }

  // Customize button
  if (customizeBtn) {
    customizeBtn.addEventListener("click", function () {
      showNotification("Opening dashboard customization options...", "info");
    });
  }
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard initialized");

  // Initialize all components
  initializeCharts();
  initializePeriodButtons();
  initializeQuickActions();
  initializeHeaderButtons();
  initializeActivityLoadMore();
  initializeMultimediaSection();

  // Update date/time
  updateDateTime();

  // Auto-update time every minute
  setInterval(updateDateTime, 60000);

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + R to refresh
    if (e.altKey && e.key === "r") {
      e.preventDefault();
      const refreshBtn = document.querySelector(".action-btn:nth-child(1)");
      if (refreshBtn) refreshBtn.click();
    }
    // Alt + S for settings
    if (e.altKey && e.key === "s") {
      e.preventDefault();
      const settingsBtn = document.querySelector(".action-btn:nth-child(2)");
      if (settingsBtn) settingsBtn.click();
    }
  });

  // Add hover effects to stat cards
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});
