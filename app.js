const toDoForm = document.querySelector('.to_do_form');
const toDoFormInput = document.querySelector('.to_do_form Input');
const toDoListUl = document.querySelector('.to_do_list_ul');
const TODOS_KEY = 'todos';
const DONEDOS_KEY = 'donedos';

let toDos = localStorage.getItem(TODOS_KEY) ? JSON.parse(localStorage.getItem(TODOS_KEY)) : [];
let doneDos = localStorage.getItem(DONEDOS_KEY) ? JSON.parse(localStorage.getItem(DONEDOS_KEY)) : [];

const saveToDo = (toDos) => {
  localStorage.setItem('todos', JSON.stringify(toDos));
};
const saveDoneDo = (doneDos) => {
  localStorage.setItem('doneDos', JSON.stringify(doneDos));
};
const paintToDo = (newToDo) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const buttonDone = document.createElement('span');
  const buttonDelete = document.createElement('span');

  buttonDelete.innerText = 'done';
  buttonDelete.className = 'material-symbols-outlined';
  buttonDelete.addEventListener('click', (event) => {
    const li = event.target.parentElement;
    li.remove();
    doneDos.push(newToDo);
    toDos = toDos.filter((newToDo) => {
      if (newToDo.id !== parseInt(li.id)) {
        return newToDo;
      }
    });
    saveToDo(toDos);
    saveDoneDo(doneDos);
  });

  buttonDone.innerText = 'close';
  buttonDone.className = 'material-symbols-outlined';
  buttonDone.addEventListener('click', () => {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((newToDo) => {
      if (newToDo.id !== parseInt(li.id)) {
        return newToDo;
      }
    });
    saveToDo(toDos);
  });

  li.id = newToDo.id;
  li.appendChild(span);
  li.appendChild(buttonDone);
  li.appendChild(buttonDelete);

  span.innerText = newToDo.text;
  toDoListUl.appendChild(li);
};

toDoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newToDo = toDoFormInput.value;
  toDoFormInput.value = '';
  const newToDoObj = {
    id: Date.now(),
    text: newToDo,
  };

  toDos.push(newToDoObj);
  saveToDo(toDos);
  paintToDo(newToDoObj);
});

if (toDos !== null) {
  for (let items of toDos) {
    paintToDo(items);
  }
}