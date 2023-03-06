import "./style.css";

const myTasks = [];

document.addEventListener("DOMContentLoaded", () => {
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
                    <td><button onclick="openEditModal(${i})">Edit Task</button></td>
                    <td><button onclick="removeTask(${i})">Remove Task</button></td> 
                  </tr>`;
      }
      table.innerHTML = rows;
    }

    function openEditModal(index) {
      // Get the task to edit from the myTasks array
      const taskToEdit = myTasks[index];

      // Fill in the modal fields with the task details
      document.querySelector("#editTask").value = taskToEdit.task;
      document.querySelector("#editDescription").value = taskToEdit.description;
      document.querySelector("#editDueBy").value = taskToEdit.due;
      document.querySelector("#editPriority").value = taskToEdit.priority;

      // Show the modal
      const modal = document.querySelector("#editModal");
      modal.classList.replace("modal", "modal-content");

      // Add an event listener to the Save button in the modal
      const saveButton = document.querySelector("#saveBtn");
      saveButton.addEventListener("click", () => {
        // Get the updated task details from the modal fields
        const updatedTask = new taskItem(
          document.querySelector("#editTask").value,
          document.querySelector("#editDescription").value,
          document.querySelector("#editDueBy").value,
          document.querySelector("#editPriority").value,
        );

        // Update the myTasks array with the updated task
        myTasks[index] = updatedTask;

        // Hide the modal
        modal.classList.remove("show");

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
      buildTable();
    }

    function removeTask(index) {
      // Remove objects from myTasks array and rebuild tables
      myTasks.splice(index, 1);
      buildTable();
    }

    window.openEditModal = openEditModal;
    window.removeTask = removeTask;
    window.myTasks = myTasks;
    addTask();
  });
});
