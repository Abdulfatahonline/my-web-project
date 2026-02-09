// main.js - For index.html (Homepage)

// Initialize date display
function initializeDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", options);
  document.getElementById("currentDate").textContent = dateString;
}

// Feature cards interaction
function initializeFeatureCards() {
  const featureCards = document.querySelectorAll(".media-item");

  featureCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector(".media-title").textContent;
      alert(`Opening ${title} details...`);
    });
  });
}

// Video placeholder interaction
function initializeVideoPlaceholder() {
  const videoPlaceholder = document.querySelector(".video-placeholder");
  const playBtn = document.querySelector(".action-btn:nth-child(1)");

  if (videoPlaceholder && playBtn) {
    playBtn.addEventListener("click", function () {
      videoPlaceholder.innerHTML = `
                <i class="fas fa-play-circle" style="font-size: 64px; margin-bottom: 15px;"></i>
                <span style="font-size: 18px; font-weight: 500;">Demo Video Playing</span>
                <p style="font-size: 14px; margin-top: 10px;">Video: Introduction to Classroom Management System</p>
                <div style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.8);">
                    <i class="fas fa-info-circle"></i> This would play an actual video in a real system
                </div>
            `;
      videoPlaceholder.style.background =
        "linear-gradient(135deg, #3498db, #2980b9)";

      // Reset after 3 seconds
      setTimeout(() => {
        videoPlaceholder.innerHTML = `
                    <i class="fas fa-play-circle"></i>
                    <span>System Demo Video</span>
                    <p style="font-size: 14px; margin-top: 10px;">Video: Introduction to Classroom Management System</p>
                `;
        videoPlaceholder.style.background =
          "linear-gradient(135deg, #2c3e50, #34495e)";
      }, 3000);
    });
  }
}

// Quick actions interaction
function initializeQuickActions() {
  const quickActions = document.querySelectorAll(".action-item");

  quickActions.forEach((action) => {
    action.addEventListener("click", function () {
      const label = this.querySelector(".action-label").textContent;
      alert(`Navigating to ${label}...`);
    });
  });
}

// System stats animation
function animateStats() {
  const statValues = document.querySelectorAll(".stat-value-sidebar");

  statValues.forEach((stat) => {
    const originalValue = stat.textContent;
    const value = parseInt(originalValue);

    // Animate counting up
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        stat.textContent = originalValue;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(start);
      }
    }, 16);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Homepage initialized");

  // Initialize all components
  initializeDate();
  initializeFeatureCards();
  initializeVideoPlaceholder();
  initializeQuickActions();

  // Animate stats after a short delay
  setTimeout(animateStats, 500);

  // Header actions
  const loginBtn = document.querySelector('a[href="login.html"]');
  const registerBtn = document.querySelector('a[href="register.html"]');

  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      if (!document.querySelector('[href="login.html"]')) {
        e.preventDefault();
        alert("Login page would open here");
      }
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Redirecting to registration page...");
      window.location.href = "register.html";
    });
  }

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + H for Home
    if (e.altKey && e.key === "h") {
      e.preventDefault();
      window.location.href = "index.html";
    }
    // Alt + D for Dashboard
    if (e.altKey && e.key === "d") {
      e.preventDefault();
      window.location.href = "dashboard.html";
    }
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll(".stat-card, .section-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Show welcome message
  console.log("Welcome to Classroom Management System!");
});
