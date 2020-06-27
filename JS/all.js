var todoData = [];
//Model
//  Task
//    ID
//    Todo Description
//    Todo checked
//  Task Count
//Functions
//  addTask()
//  delTask()
//  checkTask()
//  clearAllTasks()

//Render
//  Task to add : ID
//  Task to del : ID
//  Task to check : ID


// Model
let taskLst = [];
let taskCount = 0;
let action = {};

function addTask(taskTitle) {
  let currentID = Math.floor(Date.now());
  taskLst.push({
    id : currentID,
    title : taskTitle,
    finished : false,
  });
  action = {
    type : 'add',
    id : currentID,
  }
}

function delTask(delID) {
  let index = taskLst.findIndex(task => task.id == delID);
  taskLst.splice(index, 1);

  action = {
    type : 'delete',
    id : delID,
  }
}

function checkTask(checkID) {
  let taskToCheck = taskLst.find(task => task.id == checkID);
  taskToCheck.finished = !taskToCheck.finished;

  action = {
    type : 'check',
    id : checkID,
  }
}

function cleanTasks() {
  taskLst = [];
  action = {
    type : 'clean',
  }
}

// View
function render() {
  let todoLst = document.getElementById('todoList');
  if(action==null) return;
  if(action.type == 'add'){
    todoLst.appendChild(renderTask(action.id));
  }else if(action.type == 'delete'){
    document.querySelector(`li[data-id='${action.id}']`).remove();
  }else if(action.type == 'check'){
    let taskToCheck = taskLst.find(task => task.id == action.id);
    document.querySelector(`input[type="checkbox"][data-id='${action.id}']`).checked = taskToCheck.finished;
    document.querySelector(`label[data-id='${action.id}']`).className = `form-check-label ${taskToCheck.finished ? 'completed' : ''}`;
  }else if(action.type == 'clean'){
    document.getElementById('todoList').innerHTML = '';
  }

  document.getElementById('taskCount').textContent = taskLst.length;
  console.log(taskLst);
  action = null;
}

function renderTask(newID) {
  let item = taskLst.find(task => task.id == newID);
  let li = document.createElement('li');
  li.className = 'list-group-item';
  li.dataset.id = item.id;

  li.innerHTML = `<div class="d-flex">
  <div class="form-check">
  <input type="checkbox" class="form-check-input" data-action="complete" data-id="${item.id}">
  <label class="form-check-label" data-action="complete" data-id="${item.id}"> ${item.title}</label>
  </div>
  <button type="button" class="close ml-auto" aria-label="Close">
  <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
  </button>
  </div>`;
  return li;
}

// Controllers
document.getElementById('addTodo').addEventListener('click', ()=> {
  let newTodo = document.getElementById('newTodo');
  if (newTodo.value.trim() !== '') {
    addTask(newTodo.value);
    render();
  }
  newTodo.value = '';
});

document.getElementById('todoList').addEventListener('click', function (e) {
  let dataset = e.target.dataset;
  if(dataset.action == 'remove'){
    delTask(dataset.id);
    render();
  }else if(dataset.action == 'complete'){
    console.log('check');
    checkTask(dataset.id);
    render();
  }
});

document.getElementById('clearTask').addEventListener('click', function (e) {
  e.preventDefault();
  cleanTasks();
  render();
});