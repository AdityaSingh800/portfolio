let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");

let allButton = document.getElementById("allButton");
let completedButton = document.getElementById("completedButton");
let pendingButton = document.getElementById("pendingButton");
let clearButton = document.getElementById("clearButton");

let taskList = document.getElementById("taskList");
let counter = document.getElementById("counter");


// Get saved tasks
let savedTasks = localStorage.getItem("tasks");

let tasks = savedTasks ? JSON.parse(savedTasks) : [];


// Current filter
let currentFilter = "all";


// Save tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Display counters
function updateCounter() {

    let total = tasks.length;

    let completed = tasks.filter(task => task.completed).length;

    let pending = total - completed;

    counter.textContent =
        `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;

}


// Display tasks
function displayTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks;


    // All
    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(task => task.completed);

    }


    // Pending
    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(task => !task.completed);

    }


    filteredTasks.forEach((task, index) => {

        let li = document.createElement("li");

        let taskText = document.createElement("span");

        taskText.textContent = task.text;

        li.appendChild(taskText);


        // Completed style
        if (task.completed) {

            li.style.textDecoration = "line-through";

        }


        // Complete / Incomplete
        li.addEventListener("click", function() {

            task.completed = !task.completed;

            saveTasks();

            displayTasks();

        });


        // Edit button
        let editButton = document.createElement("button");

        editButton.textContent = "Edit";


        editButton.addEventListener("click", function(event) {

            event.stopPropagation();

            let newTask = prompt(
                "Edit your task:",
                task.text
            );


            if (newTask !== null && newTask.trim() !== "") {

                task.text = newTask.trim();

                saveTasks();

                displayTasks();

            }

        });


        // Delete button
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function(event) {

            event.stopPropagation();

            let taskIndex = tasks.indexOf(task);

            tasks.splice(taskIndex, 1);

            saveTasks();

            displayTasks();

        });


        li.appendChild(editButton);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateCounter();

}


// Add task function
function addTask() {

    let taskText = taskInput.value.trim();


    if (taskText === "") {

        return;

    }


    let task = {

        text: taskText,

        completed: false

    };


    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    displayTasks();

}


// Add button
addButton.addEventListener("click", function() {

    addTask();

});


// Enter key
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// All filter
allButton.addEventListener("click", function() {

    currentFilter = "all";

    displayTasks();

});


// Completed filter
completedButton.addEventListener("click", function() {

    currentFilter = "completed";

    displayTasks();

});


// Pending filter
pendingButton.addEventListener("click", function() {

    currentFilter = "pending";

    displayTasks();

});


// Clear all
clearButton.addEventListener("click", function() {

    tasks = [];

    saveTasks();

    displayTasks();

});


// Display saved tasks when page opens
displayTasks();