let db;

const initDB = () => {
    const request = indexedDB.open('AddictionRecoveryDB', 1);

    request.onupgradeneeded = (event) => {
        db = event.target.result;

        // Create users store
        const usersStore = db.createObjectStore('users', { keyPath: 'username' });
        usersStore.createIndex('email', 'email', { unique: true });

        // Create tasks store
        const tasksStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        tasksStore.createIndex('name', 'name', { unique: false });

        // Initialize sample tasks
        tasksStore.add({ name: 'Morning Meditation', points: 50 });
        tasksStore.add({ name: 'Exercise 30 minutes', points: 75 });
        tasksStore.add({ name: 'Journal Entry', points: 60 });

        // Create tips store
        const tipsStore = db.createObjectStore('tips', { keyPath: 'id', autoIncrement: true });
        tipsStore.createIndex('type', 'type', { unique: false });

        // Initialize sample tips
        tipsStore.add({ 
            type: 'smoking',
            text: 'Drink water when you feel cravings'
        });
        tipsStore.add({ 
            type: 'alcohol',
            text: 'Avoid situations that trigger drinking'
        });
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log('Database initialized successfully!');
    };

    request.onerror = (event) => {
        console.error('Database error:', event.target.error);
    };
};

initDB();