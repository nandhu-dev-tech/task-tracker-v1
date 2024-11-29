// Select elements
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('tasks');

// Modal Elements
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveEditButton = document.getElementById('save-edit');
const cancelEditButton = document.getElementById('cancel-edit');

// Variables to manage tasks
let taskToDelete = null;
let taskToEdit = null;

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#tasks li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create task element
function createTaskElement(taskText, completed = false) {
    // Create task item
    const taskItem = document.createElement('li');
    if (completed) {
        taskItem.classList.add('completed');
    }

    // Task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Task actions
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');

    // Edit button
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(taskSpan));

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(taskItem));

    // Complete checkbox
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = completed;
    completeCheckbox.addEventListener('change', () => toggleComplete(taskItem));

    // Append buttons
    actionsDiv.appendChild(completeCheckbox);
    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    // Append task text and actions to list item
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(actionsDiv);

    // Add task to task list
    taskList.appendChild(taskItem);
}

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskText);
    saveTasks(); // Save to localStorage
    taskInput.value = ''; // Clear input
}

// Toggle Complete
function toggleComplete(taskItem) {
    taskItem.classList.toggle('completed');
    saveTasks(); // Save to localStorage
}

// Edit Task
function editTask(taskSpan) {
    editModal.style.display = 'flex';
    editTaskInput.value = taskSpan.textContent;
    taskToEdit = taskSpan;
}

// Save Edited Task
saveEditButton.addEventListener('click', () => {
    if (taskToEdit) {
        taskToEdit.textContent = editTaskInput.value.trim();
        taskToEdit = null;
        saveTasks(); // Save to localStorage
    }
    editModal.style.display = 'none';
});

// Cancel Edit
cancelEditButton.addEventListener('click', () => {
    taskToEdit = null;
    editModal.style.display = 'none';
});

// Delete Task with Modal
function deleteTask(taskItem) {
    deleteModal.style.display = 'flex';
    taskToDelete = taskItem;
}

// Confirm Delete
confirmDeleteButton.addEventListener('click', () => {
    if (taskToDelete) {
        taskToDelete.remove();
        taskToDelete = null;
        saveTasks(); // Save to localStorage
    }
    deleteModal.style.display = 'none';
});

// Cancel Delete
cancelDeleteButton.addEventListener('click', () => {
    taskToDelete = null;
    deleteModal.style.display = 'none';
});

// Add event listener for Add Task button
addTaskButton.addEventListener('click', addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Close modal when pressing 'Esc' key
document.addEventListener('keydown', function(event) {
    const modal = document.querySelector('.modal');
    if (event.key === 'Escape') {
        modal.style.display = "none";
    }
});
