document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("btn");
    const mediaQuery = window.matchMedia("(max-width: 992px)");
  
    // Ensure the sidebar is open by default on load (desktop)
    checkbox.checked = true;
  
    // Close sidebar automatically when screen size changes to mobile
    const handleScreenChange = (e) => {
      if (e.matches) {
        checkbox.checked = false; // Close sidebar on mobile
      } else {
        checkbox.checked = true; // Keep sidebar open on desktop
      }
    };
  
    // Add event listener for media query changes
    mediaQuery.addEventListener("change", handleScreenChange);
  
    // Initial check for the current screen size
    handleScreenChange(mediaQuery);
  
    // Handle "User" button click to toggle sidebar
    checkbox.addEventListener("change", () => {
      // Toggle functionality already handled by the checkbox state
    });
  });
  
  
    function toggleNotifications() {
        const panel = document.getElementById('notificationPanel');
        panel.classList.toggle('active');
    }

// Set the initial active button and content
document.addEventListener('DOMContentLoaded', () => {
  const leftButton = document.getElementById('showWebsiteNotifications');
  const rightButton = document.getElementById('showFriendRequests');
  const websiteNotifications = document.getElementById('websiteNotifications');
  const friendRequests = document.getElementById('friendRequests');
  
  // Ensure initial state
  leftButton.classList.add('active');
  rightButton.classList.remove('active');
  websiteNotifications.classList.add('active');
  friendRequests.classList.remove('active');
});

// Event listeners for buttons
document.getElementById('showWebsiteNotifications').addEventListener('click', () => {
  document.getElementById('showWebsiteNotifications').classList.add('active');
  document.getElementById('showFriendRequests').classList.remove('active');
  document.getElementById('websiteNotifications').classList.add('active');
  document.getElementById('friendRequests').classList.remove('active');
});

document.getElementById('showFriendRequests').addEventListener('click', () => {
  document.getElementById('showFriendRequests').classList.add('active');
  document.getElementById('showWebsiteNotifications').classList.remove('active');
  document.getElementById('friendRequests').classList.add('active');
  document.getElementById('websiteNotifications').classList.remove('active');
});
