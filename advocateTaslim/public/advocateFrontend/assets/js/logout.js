// Redirect to login if no token
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("adminToken");
    if (!token) {
        window.location.href = "signin.html";
    }
});

// Prevent back button from showing cached page after logout
window.onpageshow = function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            window.location.href = "signin.html";
        }
    }
};





document.getElementById("logoutBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("adminToken");

  await fetch("http://localhost:8000/api/admin/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  localStorage.removeItem("adminToken");

  Swal.fire({
    icon: "success",
    title: "Logged Out",
    timer: 1200,
    showConfirmButton: false
  }).then(() => {
    window.location.href = "signin.html";
  });
});
