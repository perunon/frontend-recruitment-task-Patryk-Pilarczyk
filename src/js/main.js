const popup = document.getElementById('popupDiv');
const buttons = document.getElementsByClassName('moduleBtn');
const popupCounterText = document.getElementById('popupCounterText');
const xIcon = document.getElementById('popupCloseIcon');
const resetBtn = document.getElementById('counterResetBtn');
const localStorage = window.localStorage;

const btnsCounters = [{}];

const togglePopup = () => {
  popup.classList.toggle('show');
};

const setBtnsCounters = () => {
  for (let button of buttons) {
    if (!localStorage.getItem(button.id)) {
      localStorage.setItem(button.id, 0);
    }
    let btnCounter = {
      button: button.id,
      counter: localStorage.getItem(button.id),
    };
    btnsCounters.push(btnCounter);
    button.addEventListener('click', (el) => counterIncreaseValue(el));
  }
};

const counterIncreaseValue = ({ target }) => {
  for (let element of btnsCounters) {
    if (element.button == target.id) {
      element.counter++;
      popupCounterText.textContent = `${element.counter} times`;

      if (element.counter > 5) {
        resetBtn.style.display = 'flex';
        resetBtn.addEventListener('click', () => {
          element.counter = 0;
          togglePopup();
          localStorage.setItem(element.button, element.counter);
        });
      } else {
        resetBtn.style.display = 'none';
      }
      localStorage.setItem(element.button, element.counter);
      togglePopup();
    }
  }
};

// Main

setBtnsCounters();

xIcon.addEventListener('click', togglePopup);

popup.addEventListener('click', ({ target }) => {
  if (!document.getElementById('popupCard').contains(target)) {
    togglePopup();
  }
});
