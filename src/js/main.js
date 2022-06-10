const popup = document.getElementById('popupContainer');
const buttons = document.getElementsByClassName('moduleBtn');
const popupCounterText = document.getElementById('popupCounterText');
const xIcon = document.getElementById('xIcon');
const resetBtn = document.getElementById('resetBtn');

const btnsCounters = [{}];

const showPopup = () => {
  popup.style.visibility = 'visible';
};

const hidePopup = () => {
  popup.style.visibility = 'hidden';
};

const setBtnsCounters = () => {
  for (let button of buttons) {
    let btnCounter = { button: button, counter: 0 };
    btnsCounters.push(btnCounter);
    button.addEventListener('click', (el) => counterIncreaseValue(el));
  }
};

const counterIncreaseValue = ({ target }) => {
  for (let element of btnsCounters) {
    if (element.button == target) {
      element.counter++;
      popupCounterText.textContent = `${element.counter} times`;

      if (element.counter > 5) {
        resetBtn.style.display = 'flex';
        resetBtn.addEventListener('click', () => {
          element.counter = 0;
          hidePopup();
        });
      } else {
        resetBtn.style.display = 'none';
      }
      showPopup();
    }
  }
};

// Main

setBtnsCounters();

xIcon.addEventListener('click', hidePopup);

popup.addEventListener('click', ({ target }) => {
  if (!document.getElementById('popup').contains(target)) {
    hidePopup();
  }
});
