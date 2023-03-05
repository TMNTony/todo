import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const myTasks = [];

  function taskItem(task, description, due, priority) {
    return {
      task,
      description,
      due,
      priority,
    };
  }

  function test() {
    console.log("JS is properly linked!");
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

  function buildTable() {
    const table = document.getElementById("overdue");
    table.innerHTML = "";
    for (let i = 0; i < myTasks.length; i++) {
      const row = `<tr>
                            <td>${myTasks[i].task}</td>
                            <td>${myTasks[i].description}</td>
                            <td>${myTasks[i].due}</td>
                            <td>${myTasks[i].priority}</td>
                            <td><button type="button" onclick="removeTask(${i})">Remove Task</button></td> 
                      </tr>`;
      table.innerHTML += row;
    }
  }

  function removeTask(index) {
    console.log("removeTask called");
    myTasks.splice(index, 1);
    buildTable();
  }

  test();
  buildTable();
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });
});
