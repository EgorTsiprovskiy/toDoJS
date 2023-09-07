const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const toDoList = document.querySelector(".todo-list");
const toDoCompleted = document.querySelector(".todo-completed");

//Создаем массив объектов в котором будем хранить все toDo
let toDoData = [];
const localData = JSON.parse(localStorage.getItem('toDo'));

//render перебор массив toDo
const render = function () {
toDoList.innerHTML = '';
toDoCompleted.innerHTML = '';

toDoData.forEach(function (item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

      if (item.completed) {
        toDoCompleted.append(li);
      } else {
        toDoList.append(li)
      }
      
      li.querySelector('.todo-complete').addEventListener('click' , function () {
        item.completed = !item.completed;
        render();
      })

      li.querySelector('.todo-remove').addEventListener('click', function () {
        toDoData.splice(index, 1);
        render();
      })
  });
  localStorage.setItem('toDo', JSON.stringify(toDoData));
};

//При событие submit добавляеть новый объект в массив toDoData
todoControl.addEventListener("submit", function (event) {
  //При отправке формы событие submit отправит все данные из input-ов с помощью get запроса, что вызовет перезагрузку страницы,
  event.preventDefault();
  //отключаем данное поведение

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (newToDo.text) {
    toDoData.push(newToDo);

  } else {
    alert("Дело не может быть пустым!");
  }
  
  headerInput.value = "";
  render();
});

const start = function () {
    if (localData != undefined || localData != "") {
        toDoData = localData;
        render();
    }
}

start();