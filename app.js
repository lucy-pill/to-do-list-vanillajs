const toDoForm = document.querySelector('.to_do_form');
const toDoFormInput = document.querySelector('.to_do_form Input');
const toDoList = document.querySelector('.to_do_list');
const toDoListUl = document.querySelector('.to_do_list_ul');

toDoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const li = document.createElement('li');
  const span = document.createElement('span');

  span.innerText = toDoFormInput.value;
  li.appendChild(span);
  toDoListUl.appendChild(li);
});

// const todoInput = document.querySelector('#todo-form input');
// const toDoList = document.getElementById('to_do-list');
// const TODOS_KEY = 'todos';

// let toDos = localStorage.getItem(TODOS_KEY) ? JSON.parse(localStorage.getItem(TODOS_KEY)) : [];

// const saveTodo = (toDos) => {
//   localStorage.setItem('todos', JSON.stringify(toDos));
// };

// const paintTodo = (newTodo) => {
//   const li = document.createElement('li');
//   const span = document.createElement('span');
//   const button = document.createElement('button');

//   button.innerText = 'X';
//   button.addEventListener('click', (event) => {
//     const li = event.target.parentElement;
//     li.remove();
//     toDos = toDos.filter((newTodo) => {
//       if (newTodo.id !== parseInt(li.id)) {
//         return newTodo;
//       }
//     });
//     saveTodo(toDos);
//   });

//   li.id = newTodo.id;
//   li.appendChild(span);
//   li.appendChild(button);
//   span.innerText = newTodo.text;
//   toDoList.appendChild(li);
// };

// toDoForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const newTodo = todoInput.value;
//   const newTodoObj = {
//     id: Date.now(),
//     text: newTodo,
//   };
//   todoInput.value = '';
//   toDos.push(newTodoObj);
//   saveTodo(toDos);
//   paintTodo(newTodoObj);
// });

// if (toDos !== null) {
//   for (let items of toDos) {
//     paintTodo(items);
//   }
// }
