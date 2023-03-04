import "./style.css";

const myTasks = [];

document.addEventListener("DOMContentLoaded", () => {
  function taskItem(task, description, due, priority) {
    return {
      task,
      description,
      due,
      priority,
    };
  }

  function buildTable() {
    const table = document.getElementById("myTable");
    table.innerHTML = "";
    for (let i = 0; i < myTasks.length; i++) {
      const row = `<tr>
                        <td>${myTasks[i].task}</td>
                        <td>${myTasks[i].description}</td>
                        <td>${myTasks[i].due}</td>
                        <td>${myTasks[i].priority}</td>
                        <td><button onclick="removeTask(${i})">Remove</button></td> 
                  </tr>`;
      table.innerHTML += row;
    }
  }

  function removeTask(index) {
    myTasks.splice(index, 1);
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
    console.log(myTasks);
  }

  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });
});
