// Constants
const toDoForm = document.querySelector('.to_do_form');
const toDoFormInput = document.querySelector('.to_do_form Input');
const toDoListUl = document.querySelector('.to_do_list_ul');
const buttonElement = document.querySelector('body .btn_modal');
const modalElement = document.querySelector('.modal');
const modalListElement = document.querySelector('.modal .modal_list');
const modalListUlElement = document.querySelector('.modal .modal_list ul');
const modalClearElement = document.querySelector('.modal .modal_clear');
const modalListUl = document.querySelector('.modal_list_ul');
const TODOS_KEY = 'todos';
const DONEDOS_KEY = 'doneDos';
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Variables
let trigger = false;
let toDos = localStorage.getItem(TODOS_KEY) ? JSON.parse(localStorage.getItem(TODOS_KEY)) : [];
let doneDos = localStorage.getItem(DONEDOS_KEY) ? JSON.parse(localStorage.getItem(DONEDOS_KEY)) : [];

// Functions
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
  const date = document.createElement('span');

  buttonDone.innerText = 'done';
  buttonDone.className = 'material-symbols-outlined';
  buttonDone.addEventListener('click', () => {
    const li = event.target.parentElement;
    const today = new Date();
    const time = `Finished time: ${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()} | ${String(
      today.getHours()
    ).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;
    const doneDoObj = {
      id: newToDo.id,
      text: newToDo.text,
      CompleteDate: time,
    };
    li.remove();

    doneDos.push(doneDoObj);
    toDos = toDos.filter((newToDo) => {
      if (newToDo.id !== parseInt(li.id)) {
        return newToDo;
      }
    });

    paintModalList(doneDoObj);
    saveToDo(toDos);
    saveDoneDo(doneDos);
  });

  buttonDelete.innerText = 'close';
  buttonDelete.className = 'material-symbols-outlined';
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

  date.innerText = newToDo.createDate;
  li.id = newToDo.id;
  li.appendChild(span);
  li.appendChild(buttonDone);
  li.appendChild(buttonDelete);
  li.appendChild(date);

  span.innerText = newToDo.text;
  toDoListUl.appendChild(li);
};
const paintModalList = (doneToDo) => {
  const li = document.createElement('li');
  const spanText = document.createElement('span');
  const spanTime = document.createElement('span');
  const buttonDelete = document.createElement('span');

  spanText.innerText = doneToDo.text;
  spanTime.innerText = doneToDo.CompleteDate;
  buttonDelete.innerText = 'close';
  buttonDelete.className = 'material-symbols-outlined';
  buttonDelete.addEventListener('click', (event) => {
    const li = event.target.parentElement;
    li.remove();
    doneDos = doneDos.filter((doneToDo) => {
      if (doneToDo.id !== parseInt(li.id)) {
        return doneToDo;
      }
    });
    saveDoneDo(doneDos);
  });
  li.appendChild(spanText);
  li.appendChild(spanTime);
  li.appendChild(buttonDelete);
  modalListUl.appendChild(li);
};
const paintModal = () => {
  if (trigger === false) {
    modalElement.style.display = 'flex';
    trigger = true;
  } else {
    modalElement.style.display = 'none';
    trigger = false;
  }
};
const clearModalList = () => {
  const listElement = document.querySelectorAll('.modal .modal_list li');
  for (let items of listElement) {
    modalListUlElement.removeChild(items);
  }
  doneDos = [];
  saveDoneDo(doneDos);
};

// MAIN PAGE PAINT
toDoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const today = new Date();
  const time = `Registration time: ${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()} | ${String(
    today.getHours()
  ).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;
  const newToDo = toDoFormInput.value;
  toDoFormInput.value = '';
  const newToDoObj = {
    id: Date.now(),
    text: newToDo,
    createDate: time,
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

// MODAL PAGE PAINT
buttonElement.addEventListener('click', paintModal);
modalClearElement.addEventListener('click', clearModalList);

if (doneDos !== null) {
  for (let items of doneDos) {
    paintModalList(items);
  }
}
