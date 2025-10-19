const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";

  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete-btn">✔️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);

    li.querySelector(".complete-btn").addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      saveTasks();
    });
  });
}
