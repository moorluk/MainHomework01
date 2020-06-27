var todoData = [];

document.getElementById('addTodo').addEventListener('click', function () {
  var str = '';
  if (document.getElementById('newTodo').value.trim() !== '') {
    todoData.push({
      id: Math.floor(Date.now()),
      title: document.getElementById('newTodo').value,
      completed: false,
    })
    todoData.forEach(function (item) {
      str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check">
<input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
<label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
</div>
<button type="button" class="close ml-auto" aria-label="Close">
<span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
</button>
</div>
</li>`;
    })
    document.getElementById('todoList').innerHTML = str;
    document.getElementById('taskCount').textContent = todoData.length;
    document.getElementById('newTodo').value = '';
  }
});
document.getElementById('clearTask').addEventListener('click', function (e) {
  e.preventDefault();
  todoData = [];
  document.getElementById('todoList').innerHTML = '';
  document.getElementById('taskCount').textContent = todoData.length;
});
document.getElementById('todoList').addEventListener('click', function (e) {
  var newIndex = 0;
  if (e.target.dataset.action == 'remove') {
    todoData.forEach(function (item, key) {
      if (e.target.dataset.id == item.id) {
        newIndex = key;
      }
    })
    todoData.splice(newIndex, 1);
    var str = '';
    todoData.forEach(function (item) {
      str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check">
<input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
<label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
</div>
<button type="button" class="close ml-auto" aria-label="Close">
<span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
</button>
</div>
</li>`;
    });
    document.getElementById('todoList').innerHTML = str;
    document.getElementById('taskCount').textContent = todoData.length;
  }
});
document.getElementById('todoList').addEventListener('click', function (e) {
  if (e.target.dataset.action == 'complete') {
    todoData.forEach(function (item) {
      if (e.target.dataset.id == item.id) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
    })
    var str = '';
    todoData.forEach(function (item) {
      str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check">
<input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
<label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
</div>
<button type="button" class="close ml-auto" aria-label="Close">
<span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
</button>
</div>
</li>`;
    })
    document.getElementById('todoList').innerHTML = str;
    document.getElementById('taskCount').textContent = todoData.length;
  }
});