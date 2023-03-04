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

  function addTask() {
    const task = document.querySelector("#task").value;
    const description = document.querySelector("#description").value;
    const due = document.querySelector("#dueBy").value;
    const priority = document.querySelector("#priority").value;
    const newTask = new taskItem(task, description, due, priority);
    myTasks.push(newTask);
    document.forms[0].reset();
  }
  addTask();
  console.log(myTasks);
});
