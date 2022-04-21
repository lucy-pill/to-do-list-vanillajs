const toDoForm = document.querySelector('.to_do_form');
const toDoFormInput = document.querySelector('.to_do_form Input');
const toDoListUl = document.querySelector('.to_do_list_ul');
const TODOS_KEY = 'todos';

let toDos = localStorage.getItem(TODOS_KEY) ? JSON.parse(localStorage.getItem(TODOS_KEY)) : [];

const saveToDo = (toDos) => {
  localStorage.setItem('todos', JSON.stringify(toDos));
};
const saveDoneDo = (doneDos) => {
  localStorage.setItem('doneDos', JSON.stringify(doneDos));
}
const paintToDo = (newToDo) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const buttonDone = document.createElement('button');
  const buttonDelete = document.createElement('button');
  
  buttonDone.innertext = 'V';
  buttonDone.className = 'btn_done'
  buttonDone.addEventListener('click', () => {

  });

  buttonDelete.innerText = 'X';
  buttonDelete.className = 'btn_delete'
  buttonDelete.addEventListener('click', (event) => {
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
  paintToDo(newToDoObj)
});

if (toDos !== null) {
  for (let items of toDos) {
    paintToDo(items);
  }
}