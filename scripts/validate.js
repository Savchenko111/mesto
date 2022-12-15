const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__submit-button', 
  inactiveButtonClass: 'popup__submit-button_disabled', 
  inputErrorClass: 'popup__input_type_invalid', 
  errorClass: 'error_active' 
}

//функция проверки валидности инпутов
function checkInputValidity(input, validationConfig) {
  if (!input.validity.valid) {
    showInputError(input, validationConfig);
  } else {
    hideInputError(input, validationConfig);
  }
}

//функция, которая добавляет класс с ошибкой
function showInputError(element, validationConfig) {
  const error = document.querySelector(`#${element.id}-error`);
  element.classList.add(validationConfig.inputErrorClass);
  error.classList.add(validationConfig.errorClass);
  error.textContent = element.validationMessage;
}

//функция, которая удаляет класс с ошибкой
function hideInputError(element, validationConfig) {
  const error = document.querySelector(`#${element.id}-error`);
  element.classList.remove(validationConfig.inputErrorClass);
  error.classList.remove(validationConfig.errorClass);
  error.textContent = '';
}

//функция, которая делает кнопку сабмита неактивной и наоборот
function setSubmitButtonState(inputs, buttonSubmit, validationConfig) {
  const isFormValid = Array.from(inputs).every(input => {
    return input.validity.valid;
  });

  if (isFormValid) {
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
  }
}

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector); //находим все формы

  forms.forEach(form => {
    const inputs = form.querySelectorAll(validationConfig.inputSelector); //находим все инпуты
    const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector); //находим кнопку сабмита
  
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  
    inputs.forEach(function(input) {
      input.addEventListener('input', () => {
        checkInputValidity(input, validationConfig); //проверяем валидность инпутов
        setSubmitButtonState(inputs, buttonSubmit, validationConfig); //делаем активной или неактивной кнопку сабмита
      })
    })
    
  })
}

enableValidation(validationConfig);