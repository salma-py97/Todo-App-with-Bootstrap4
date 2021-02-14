// UI Variables
const taskInput = document.getElementById('task-input');
const form = document.getElementById('task-form');
const filter = document.getElementById('filter-tasks');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-tasks')
// load all Event Listeners
loadAllEventListeners();
// Event Listeners
function loadAllEventListeners(){
    // Load DOM Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task
    form.addEventListener('submit', addTask);
    // Remove Task
    taskList.addEventListener('click', removeTask);
    // Filter Tasks
    filter.addEventListener('keyup', filterTasks);
    // Clear Tasks
    clearBtn.addEventListener('click', clearTasks);
}

// EVENT HANDLERS
// Get Tasks
function getTasks(){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks=[];
    } else {
        tasks= JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // add Bootstrap4 class
        li.className = "list-group-item d-flex justify-content-between"
        // Create and Append textNode
        li.appendChild(document.createTextNode(task));
        // create link
        const link = document.createElement('a');
        // Add class
        link.className="remove-item";
        // Add icon HTML
        link.innerHTML= "<i class='fa fa-remove ml-5'></i>";
        // Append link to li 
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);

    })
}
// Add Tasks
function addTask(e){
    if (taskInput.value === ""){
        alert("add a Task")
    } else {
        // Create li element
        const li = document.createElement('li');
        // add class
        li.className = "list-group-item d-flex justify-content-between"
        // Create and Append textNode
        li.appendChild(document.createTextNode(taskInput.value));
        // create link
        link = document.createElement('a');
        // Add class
        link.className="remove-item";
        // Add icon HTML
        link.innerHTML= "<i class='fa fa-remove ml-5'></i>";
        // Append link to li 
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);

        // Add tasks to Local Storage
        addTasktoLocalStorage(taskInput.value);

        // Clear Input
        taskInput.value="";        
    }
    e.preventDefault();
}

// Add tasks to localStorage
function addTasktoLocalStorage(task){
    // init tasks
    let tasks;
    // Check if LS has tasks
    if (localStorage.getItem("tasks") === null){
        // Init tasks as an array
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Tasks
function removeTask(e){
    // e.target = i
    // e.target.parentElement = a
    // e.target.parentElement.parentElement = li
    if (e.target.parentElement.classList.contains("remove-item")){
        e.target.parentElement.parentElement.remove();
    };
    // Remove Task from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    e.preventDefault();
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem){
    // Init tasks
    let tasks;
    // Check if tasks is in LS
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    // Loop through Tasks and remove the one that matches the task we want removed
    tasks.forEach(function(task, index){
        if(task === taskItem.textContent){
            tasks.splice(index, 1);
        }
    })

    // Set the new array to LS
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Filter Tasks
function filterTasks(e){
    // Compare betweeen tasks in the ul and the input in the filter
    const text = e.target.value.toLowerCase();
    console.log(text);
    // Select all the lis and loop through them
    document.querySelectorAll('.list-group-item').forEach(function(task){
        console.log(task);
     
        const item = task.firstChild.textContent;
        console.log(task);
        // If the filterInput matches a task, show task
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.className = "list-group-item d-flex justify-content-between";
        } else {
            // else, hide task
            task.classList.remove("d-flex");
            task.classList.add("d-none");
        }
    })
    e.preventDefault();

}
// Clear Tasks
function clearTasks(e){
    taskList.innerHTML="";

    // Clear Tasks from LS
    clearTasksFromLocalStorage();

    e.preventDefault();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}