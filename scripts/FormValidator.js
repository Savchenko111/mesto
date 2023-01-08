export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputs = this._form.querySelectorAll(this._settings.inputSelector);
    this._buttonSubmit = this._form.querySelector(this._settings.submitButtonSelector);
  }

  //метод, который добавляет класс с ошибкой
  _showInputError(element) {
    const error = this._form.querySelector(`#${element.id}-error`);
    element.classList.add(this._settings.inputErrorClass);
    error.classList.add(this._settings.errorClass);
    error.textContent = element.validationMessage;
  }

  //метод, который удаляет класс с ошибкой
  _hideInputError(element) {
    const error = this._form.querySelector(`#${element.id}-error`);
    element.classList.remove(this._settings.inputErrorClass);
    error.classList.remove(this._settings.errorClass);
    error.textContent = '';
  }

  //метод проверки валидности инпутов
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  //метод, который делает кнопку сабмита неактивной и наоборот
  _setSubmitButtonState() {
    const isFormValid = Array.from(this._inputs).every(input => {
      return input.validity.valid;
    });
  
    if (isFormValid) {
      this._buttonSubmit.removeAttribute('disabled');
      this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this._buttonSubmit.setAttribute('disabled', true);
      this._buttonSubmit.classList.add(this._settings.inactiveButtonClass);
    }
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input); //проверяем валидность инпутов
        this._setSubmitButtonState(); //делаем активной или неактивной кнопку сабмита
      })
    })
  }

  resetErrors() {
    this._form.reset();
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    })
    this._setSubmitButtonState();
  }
}