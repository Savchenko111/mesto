//функция проверки валидности инпутов
function checkInputValidity(input, obj) {
  const error = document.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, obj);
    error.textContent = input.validationMessage;
  } else {
    hideInputError(input, obj);
    error.textContent = '';
  }
}

//функция, которая делает кнопку сабмита неактивной и наоборот
function setSubmitButtonState(inputs, buttonSubmit, obj) {
  const isFormValid = Array.from(inputs).every(input => {
    return input.validity.valid;
  });

  if (isFormValid) {
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove(obj.inactiveButtonClass);
  } else {
    buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.classList.add(obj.inactiveButtonClass);
  }
}

//функция, которая добавляет класс с ошибкой
function showInputError(element, obj) {
  element.classList.add(obj.inputErrorClass);
}

//функция, которая удаляет класс с ошибкой
function hideInputError(element, obj) {
  element.classList.remove(obj.inputErrorClass);
}

function enableValidation(obj) {
  const forms = document.querySelectorAll(obj.formSelector); //находим все формы

  forms.forEach(form => {
    const inputs = form.querySelectorAll(obj.inputSelector); //находим все инпуты
    const buttonSubmit = form.querySelector(obj.submitButtonSelector); //находим кнопку сабмита
  
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  
    inputs.forEach(function(input) {
      input.addEventListener('input', () => {
        checkInputValidity(input, obj); //проверяем валидность инпутов
        setSubmitButtonState(inputs, buttonSubmit, obj); //делаем активной или неактивной кнопку сабмита
      })
    })
    
  })
}

enableValidation({ 
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__submit-button', 
  inactiveButtonClass: 'popup__submit-button_disabled', 
  inputErrorClass: 'popup__input_type_invalid', 
  errorClass: 'error' 
});
