const buttonElement = document.querySelector('body button');
const modalElement = document.querySelectorAll('body .modal');

let trigger = false;

buttonElement.addEventListener('click', () => {
  if(trigger === false) {
    modalElement.style.display = 'block';
    trigger = true;
  } else {
    modalElement.style.display = 'none';
    trigger = false;
  }
});

