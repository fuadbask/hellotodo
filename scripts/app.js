const outputBox = document.getElementById("outputBox");
const addButton = document.getElementById("submitAll");
const parser = new DOMParser();

function submitNewTodo() {
  const activity = document.getElementById("activityText").value;

  if (activity !== "" ) {
    // push new contact to storage
    addTodo({
      activity: activity
    });
    // empty out the input box value
    document.getElementById("activityText").value = "";
  } else {
    alert("Input can't be empty");
  }
}

function getTodo() {
  if (localStorage.todoList) {
    const arrayList = JSON.parse(localStorage.todoList);
    return arrayList;
  } else {
    localStorage.setItem("todoList", "[]");
    return [];
  }
}

function addTodo(newTodo) {
  const arrayList = getTodo();
  arrayList.push(newTodo);
  setTodo(arrayList);
}

function setTodo(newTodos) {
  localStorage.todoList = JSON.stringify(newTodos);
}

function createTemplate(index, arrayList) {
  const template = `
  <div class="margin">
  <div id="todo-${index}">
    <p for="activities">${arrayList.activity}
      <button name="delete" class="red">X</button>
    </p>
  </div>
    `;
  return template;
}
// <input id="edit" class="Edit" onclick=editTodo(${index})>

function displayTodo() {
  outputBox.innerHTML = "";
  const arrayList = getTodo();
  for (var index = 0; index < arrayList.length; index++) {
    const nodeString = createTemplate(index, arrayList[index]);
    const doc = parser.parseFromString(nodeString, "text/html");
    const node = doc.body.firstChild;
    outputBox.append(node);
  }
}

function submitTodo() {
  submitNewTodo();
  displayTodo();
}

function toggleHandler() {
  const toggleSearchText = document.getElementById("searchText");
  toggleSave.style.display = "none";
}

getTodo();
displayTodo();
addButton.addEventListener("click", submitTodo);
