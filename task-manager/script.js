const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

function addTask() {
  const task = taskInput.value.trim();
  const date = taskDate.value;
  const priority = taskPriority.value;

  if (!task || !date) return;

  const li = document.createElement("li");
  const priorityClass =
    priority === "High" ? "high" : priority === "Medium" ? "medium" : "low";

  li.innerHTML = `
    <div>
      <strong>${task}</strong><br />
      📅 ${date} |
      <span class="${priorityClass}">${priority}</span>
    </div>
    <span class="delete">✖</span>
  `;

  const deleteBtn = li.querySelector(".delete");
  deleteBtn.addEventListener("click", () => li.remove());

  taskList.appendChild(li);
  taskInput.value = "";
  taskDate.value = "";
}

addBtn.addEventListener("click", addTask);
