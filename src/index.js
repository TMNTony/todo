import "./style.css";

const myTasks = [];

function taskItem(task, description, due, priority) {
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
  for (let i = 0; i < tasks.length; i++) {
    const row = `<tr>
                    <td>${tasks[i].task}</td>
                    <td>${tasks[i].description}</td>
                    <td>${tasks[i].priority}</td>
                    <td><button onclick="editTask(${i})">Edit Task</button></td>
                    <td><button onclick="removeTask(${i})">Remove Task</button></td> 
                  </tr>`;
    table.innerHTML += row;
  }
}

function editTask(index) {
  const row = document.querySelectorAll("tr")[index + 1];
  const task = row.querySelectorAll("td")[0].textContent;
  const description = row.querySelectorAll("td")[1].textContent;
  const due = row.querySelectorAll("td")[2].textContent;
  const priority = row.querySelectorAll("td")[3].textContent;
  myTasks[index] = new taskItem(task, description, due, priority);
  buildTable();
}

function addTask() {
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const due = document.querySelector("#dueBy").value;
  const priority = document.querySelector("#priority").value;
  const newTask = new taskItem(task, description, due, priority);
  myTasks.push(newTask);
  buildTable();
  document.forms[0].reset();
}

function removeTask(index) {
  myTasks.splice(index, 1);
  buildTable();
}
window.editTask = editTask;
window.removeTask = removeTask;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });
});
