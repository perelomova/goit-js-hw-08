//Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь что-то печатает.

//Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
//При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
//При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
//Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', handleSubmit);
refs.form.addEventListener('input', throttle(saveDataToLocalStorage, 500));

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

populateFormWithData();

function saveDataToLocalStorage(data) {
  formData[data.target.name] = data.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData, null, '  '));
};

function handleSubmit(event) {
  event.preventDefault();
  
  if (refs.input.value === "" || refs.textarea.value === "") {
    return alert("Please fill in all the fields!");
  } else {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }
  event.currentTarget.reset();
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
};

function populateFormWithData() {
  let localStorageSavedData = localStorage.getItem(STORAGE_KEY);
  if (localStorageSavedData) {
    localStorageSavedData = JSON.parse(localStorageSavedData);
    Object.entries(localStorageSavedData).forEach(([name, value]) => {
      formData[name] = value;
      refs.form.elements[name].value = value;
    });
  } 
}
 


