/* eslint-disable no-unused-vars */
// Imports
import generatePassword from './passwordGenerator'

const passwordForm = document.querySelector('#password-form');
const newPassword = document.querySelector('.new-password');
const messageDiv = document.querySelector('.messages');
const passwordLenght = document.querySelector('#pw-length');
const digits = document.querySelector('#digits');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const symbols = document.querySelector('#symbols');

export default () => {
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkSubmit()) return;

    newPassword.innerHTML = generatePassword(
      Number(passwordLenght.value),
      digits.checked,
      uppercase.checked,
      lowercase.checked,
      symbols.checked
    )
  });
}

function checkSubmit() {
  messageDiv.innerText = '';

  if (!Number(passwordLenght.value)) {
    warningMessage('Password lenght must be a number.');
    return false;
  }

  if (Number(passwordLenght.value) < 6) {
    warningMessage('Password must have 6 characters at least.');
    return false;
  }

  if (Number(passwordLenght.value) > 30) {
    warningMessage('Password must have 30 characters maximum.');
    return false;
  }

  if (!digits.checked && !uppercase.checked && !lowercase.checked && !symbols.checked) {
    warningMessage('At least one of the options above must be checked.');
    return false
  }

  return true;
}

function warningMessage(msg) {
  messageDiv.innerText = msg;
}
