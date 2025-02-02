// logout.js
function logout() {
    // Clear the current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Redirect to the login page
    window.location.href = 'login.html';
}

// Attach the logout function to the logout button
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});