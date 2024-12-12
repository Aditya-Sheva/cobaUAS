// Handle Logout Button
const logoutButton = document.querySelector('.btn-danger');

logoutButton.addEventListener('click', () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        alert("You have been logged out!");
        // Redirect to the homepage or login page
        window.location.href = "login.html";
    }
});
