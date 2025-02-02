// Registration
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        addictionType: document.getElementById('addictionType').value,
        password: document.getElementById('password').value,
        streak: 0,
        points: 0,
        lastLogin: new Date().toISOString()
    };

    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');
    
    const request = store.add(user);
    
    request.onsuccess = () => {
        alert('Registration successful!');
        window.location.href = 'login.html';
    };
    
    request.onerror = () => {
        alert('Username already exists!');
    };
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const request = store.get(username);

    request.onsuccess = (e) => {
        const user = e.target.result;
        if (user && user.password === password) {
            // Update streak
            const lastLogin = new Date(user.lastLogin);
            const now = new Date();
            
            // Check if it's a new day (after 12:01 AM)
            if (isNewDay(lastLogin, now)) {
                if (isConsecutiveDay(lastLogin, now)) {
                    user.streak++;
                } else {
                    user.streak = 1;
                }
            }

            // Update last login time
            user.lastLogin = now.toISOString();
            
            // Update user in the database
            const updateTransaction = db.transaction(['users'], 'readwrite');
            const updateStore = updateTransaction.objectStore('users');
            updateStore.put(user);

            // Save user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials!');
        }
    };
});

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Helper function to check if it's a new day (after 12:01 AM)
function isNewDay(lastLogin, now) {
    const lastLoginDate = new Date(lastLogin);
    const currentDate = new Date(now);

    // Check if the current date is after 12:01 AM
    if (currentDate.getHours() >= 0 && currentDate.getMinutes() >= 1) {
        // Check if the date has changed
        return (
            currentDate.getFullYear() !== lastLoginDate.getFullYear() ||
            currentDate.getMonth() !== lastLoginDate.getMonth() ||
            currentDate.getDate() !== lastLoginDate.getDate()
        );
    }
    return false;
}

// Helper function to check if the new login is on the next consecutive day
function isConsecutiveDay(lastLogin, now) {
    const lastLoginDate = new Date(lastLogin);
    const currentDate = new Date(now);

    // Calculate the difference in days
    const timeDiff = currentDate - lastLoginDate;
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Check if it's exactly 1 day difference
    return dayDiff === 1;
}