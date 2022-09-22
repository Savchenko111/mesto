const popupEl = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = popupEl.querySelector('.popup__close-button');
const submitPopupButton = popupEl.querySelector('.popup__submit-button');

const togglePopup = () => {
    popupEl.classList.toggle('popup_opened');
};

editButton.addEventListener('click', () => {
  togglePopup();
});

closePopupButton.addEventListener('click', () => {
  togglePopup();
});

function formSubmitHandler (evt) {
  evt.preventDefault();

//сюда будут вводиться значения имени и профессии
  let inputNameInfo = popupEl.querySelector('.popup__name-info');
  let inputJobInfo = popupEl.querySelector('.popup__job-info');

//а здесь имя и профессия будут сохраняться
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__profession');

  profileName.textContent = inputNameInfo.value;
  profileJob.textContent = inputJobInfo.value;

  togglePopup();
}

popupEl.addEventListener('submit', formSubmitHandler);