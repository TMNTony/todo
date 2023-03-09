import "./style.css";

let myTasks = [];

if (localStorage.getItem("myTasks")) {
  myTasks = JSON.parse(localStorage.getItem("myTasks"));
}

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();

  function taskItem(task, description, due, priority) {
    // Factory to create array of tasks
    return {
      task,
      description,
      due,
      priority,
    };
  }

  function buildTable() {
    // Get references to the four tables
    const overdueTable = document.getElementById("overdue");
    const todayTable = document.getElementById("today");
    const tomorrowTable = document.getElementById("tomorrow");
    const laterTable = document.getElementById("later");

    // Clear the contents of all tables
    overdueTable.innerHTML = "";
    todayTable.innerHTML = "";
    tomorrowTable.innerHTML = "";
    laterTable.innerHTML = "";

    // Sort tasks into their respective categories
    const now = new Date();
    const overdueTasks = [];
    const todayTasks = [];
    const tomorrowTasks = [];
    const laterTasks = [];
    for (let i = 0; i < myTasks.length; i++) {
      const dueDate = new Date(myTasks[i].due);
      if (dueDate < now) {
        overdueTasks.push(myTasks[i]);
      } else if (dueDate.toDateString() === now.toDateString()) {
        todayTasks.push(myTasks[i]);
      } else if (dueDate.toDateString() === new Date(now.getTime() + 86400000).toDateString()) {
        tomorrowTasks.push(myTasks[i]);
      } else {
        laterTasks.push(myTasks[i]);
      }
    }

    // Render each array as a separate table in the HTML
    renderTable(overdueTable, overdueTasks);
    renderTable(todayTable, todayTasks);
    renderTable(tomorrowTable, tomorrowTasks);
    renderTable(laterTable, laterTasks);
  }

  function renderTable(table, tasks) {
    // Add rows for each item in myTasks array
    let rows = "";
    for (let i = 0; i < tasks.length; i++) {
      rows += `<tr>
                    <td>${tasks[i].task}</td>
                    <td>${tasks[i].description}</td>
                    <td>${tasks[i].priority}</td>
                    <td><button onclick="openEditModal(${i}), show()" >Edit Task</button></td>
                    <td><button onclick="removeTask(${i})">Remove Task</button></td> 
                  </tr>`;
    }
    table.innerHTML = rows;
  }

  // Show the modal
  function show() {
    const modal = document.querySelector("#editModal");
    modal.classList.replace("modal", "modal-content");

    // Close modal
    function close() {
      modal.classList.replace("modal-content", "modal");
    }

    // Add an event listener to the close button in the modal
    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", () => {
      close();
    });
  }
  // Close modal
  function close() {
    const modal = document.querySelector("#editModal");
    modal.classList.replace("modal-content", "modal");
  }

  function openEditModal(index) {
    // Get the task to edit from the myTasks array
    const taskToEdit = myTasks[index];

    // Fill in the modal fields with the task details
    document.querySelector("#editTask").value = taskToEdit.task;
    document.querySelector("#editDescription").value = taskToEdit.description;
    document.querySelector("#editDueBy").value = taskToEdit.due;
    document.querySelector("#editPriority").value = taskToEdit.priority;

    // Add an event listener to the Save button in the modal
    const saveButton = document.querySelector("#saveBtn");
    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      // Get the updated task details from the modal fields
      const task = document.querySelector("#editTask").value;
      const description = document.querySelector("#editDescription").value;
      const due = document.querySelector("#editDueBy").value;
      const priority = document.querySelector("#editPriority").value;

      // Update the task object in the myTasks array
      const updatedTask = {
        ...taskToEdit, task, description, due, priority,
      };
      myTasks.splice(index, 1, updatedTask);
      localStorage.setItem("myTasks", JSON.stringify(myTasks));

      // Hide the modal
      close();

      // Rebuild the table with the updated task
      buildTable();
    });
  }

  function addTask() {
    // Add items in HTML input field to myTasks array
    const task = document.querySelector("#task").value;
    const description = document.querySelector("#description").value;
    const due = document.querySelector("#dueBy").value;
    const priority = document.querySelector("#priority").value;
    const newTask = new taskItem(task, description, due, priority);
    myTasks.push(newTask);
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    buildTable();
  }

  function removeTask(index) {
    // Remove objects from myTasks array and rebuild tables
    myTasks.splice(index, 1);
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    buildTable();
  }

  window.openEditModal = openEditModal;
  window.removeTask = removeTask;
  window.myTasks = myTasks;
  window.show = show;
  addTask();
});
