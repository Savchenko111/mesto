const popupEl = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = popupEl.querySelector('.popup__close-button');

//сюда будут вводиться значения имени и профессии
let inputNameInfo = popupEl.querySelector('.popup__input_type_name');
let inputJobInfo = popupEl.querySelector('.popup__input_type_job');

//а здесь имя и профессия будут сохраняться
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__profession');

const togglePopup = () => {
    popupEl.classList.toggle('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = inputNameInfo.value;
  profileJob.textContent = inputJobInfo.value;

  togglePopup();
}

editButton.addEventListener('click', () => {
  togglePopup();
  inputNameInfo.textContent = profileName.value;
  inputJobInfo.textContent = profileJob.value;
});

closePopupButton.addEventListener('click', () => {
  togglePopup();
});

popupForm.addEventListener('submit', formSubmitHandler);