const outputBox = document.getElementById("outputBox");
const addButton = document.getElementById("submitAll");
const searchText = document.getElementById("searchText");
const todoListener = document.getElementById("listener");
const parser = new DOMParser();

function submitNewTodo() {
  const activity = document.getElementById("activityText").value;

  if (activity !== "") {
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
  // console.log(arrayList.activity);
  const template = `
  <div class="margin">
    <div id="todo-${index}" class="todo">
      <div id="listener" class="listener">
        <p id="par-${index}" class="par" for="activities">${arrayList.activity}</p>
        <input id="edit-${index}" type="text" class="editText" value="${arrayList.activity}">
        <button id="delete-${index}" name="delete" class="delete red">X</button>
      </div>
    </div>
  </div>
    `;
  return template;
}
// <input id="edit" class="Edit" onclick=editTodo(${index})>
// <div class="margin">
// <div id="todo-${index}" class="todo">
//   <div id="listener" class="listener">
//   <p id="par-${index}" class="par" for="activities">${arrayList.activity}
//     <input id="edit-${index}" type="text" class="editText" value="${arrayList.activity}">
//     <button id="delete-${index}" name="delete" class="delete red">X</button>
//   </p>
//   </div>
// </div>
// </div>

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
  toggleHandler();
}

function deleteTodo() {
  if (event.target.matches(".delete")) {
    // console.log("CALLED DELETE");
    const id = event.target.id.replace("delete-", "");
    const todos = getTodo();
    todos.splice(id, 1);
    setTodo(todos);
    displayTodo();
    toggleHandler();
  }
}

function editTodo() {
  const toggleEditText = document.getElementsByClassName("editText");
  const toggleTodo = document.getElementsByClassName("par");
  if (event.target.matches(".par")) {
    const id = event.target.id.replace("par-", "");
    // console.log(id);
    toggleTodo[id].style.display = 'none';
    toggleEditText[id].style.display = 'block';
    // console.log(todo);
    saveEditTodo(id);
  }
}

function saveEditTodo(id) {
  // console.log(id);
  var input = document.getElementsByClassName("editText")[id];
  // console.log(input);
  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      const todo = document.getElementsByClassName("editText")[id].value;
      console.log(todo);
      const arrayList = getTodo();
      arrayList.splice(id, 1, {activity:todo});
      console.log(arrayList);
      setTodo(arrayList);
      displayTodo();
      toggleHandler();
    }
  });
}

function toggleHandler() {
  const toggleEdit = document.getElementsByClassName("editText");
  for (var i = 0; i < toggleEdit.length; i++) {
    toggleEdit[i].style.display = 'none';
  };
}

displayTodo();
toggleHandler();

addButton.addEventListener("click", submitTodo);
outputBox.addEventListener("click", deleteTodo);
outputBox.addEventListener("dblclick", editTodo);
