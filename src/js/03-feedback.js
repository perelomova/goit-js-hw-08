import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', handleSubmit);
refs.form.addEventListener('input', throttle(saveDataToLocalStorage, 500));

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const localStorageSavedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

//Alternative way for populateFormWithData

// if (localStorage.getItem(STORAGE_KEY) != null) {
//   refs.input.value = localStorageSavedData.email;
//   refs.textarea.value = localStorageSavedData.message;
// }
populateFormWithData();

function saveDataToLocalStorage(data) {
  formData[data.target.name] = data.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData, null, '  '));
};

function handleSubmit(event) {
  event.preventDefault();

  console.log(localStorageSavedData);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
};

function populateFormWithData() {
  if (localStorageSavedData) {
    refs.input.value = localStorageSavedData.email;
    refs.textarea.value = localStorageSavedData.message;
  }
}



