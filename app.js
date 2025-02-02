document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user && window.location.pathname.endsWith('dashboard.html')) {
        window.location.href = 'login.html';
        return;
    }

    if (user) {
        document.getElementById('username').textContent = user.username;
        document.getElementById('streak').textContent = user.streak;
        document.getElementById('points').textContent = user.points;

        // Load daily tip
        const randomTip = getRandomTip(user.addictionType);
        document.getElementById('dailyTip').textContent = randomTip;
    }
});

function showTasks() {
    const tasksSection = document.getElementById('tasksSection');
    tasksSection.classList.remove('hidden');

    const transaction = db.transaction(['tasks'], 'readonly');
    const store = transaction.objectStore('tasks');
    const request = store.getAll();

    request.onsuccess = (e) => {
        const tasks = e.target.result;
        const tasksHTML = tasks.map(task => `
            <div class="task">
                <h3>${task.name}</h3>
                <p>Points: ${task.points}</p>
                <button onclick="completeTask(${task.id}, ${task.points})">Complete Task</button>
            </div>
        `).join('');

        tasksSection.innerHTML = `<h2>Tasks</h2>${tasksHTML}`;
    };
}

function completeTask(taskId, points) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.points += points;
    
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');
    store.put(user);
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.getElementById('points').textContent = user.points;
    alert('Task completed! Points added.');
}

function showGiftCards() {
    alert('Feature coming soon!');
}