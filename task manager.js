const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tasksFilePath = 'tasks.json';

// Load tasks from the file
let tasks = loadTasks();

// Display menu
function displayMenu() {
    console.log('\n===== Task Manager =====');
    console.log('1. Add Task');
    console.log('2. List Tasks');
    console.log('3. Exit');
}

// Save tasks to the file
function saveTasks() {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks), 'utf-8');
}

// Load tasks from the file
function loadTasks() {
    try {
        const data = fs.readFileSync(tasksFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Add a new task
function addTask() {
    rl.question('Enter task: ', (task) => {
        tasks.push({ task, done: false });
        saveTasks();
        console.log('Task added successfully!');
        displayMenu();
        getUserInput();
    });
}

// List all tasks
function listTasks() {
    console.log('\n===== Tasks =====');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. [${task.done ? '✔' : '❌'}] ${task.task}`);
    });
    displayMenu();
    getUserInput();
}

// Handle user input
function handleInput(choice) {
    switch (choice) {
        case '1':
            addTask();
            break;
        case '2':
            listTasks();
            break;
        case '3':
            console.log('Exiting Task Manager. Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid choice. Please enter a valid option.');
            displayMenu();
            getUserInput();
    }
}

// Get user input
function getUserInput() {
    rl.question('Enter your choice: ', (choice) => {
        handleInput(choice);
    });
}

// Initial display
displayMenu();
getUserInput();
