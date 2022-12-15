const buttonEditProfile = document.querySelector('.profile__edit-button'); //кнопка "Редактировать"
const buttonAddCard = document.querySelector('.profile__add-button'); //кнопка "Добавить"
const popupEdit = document.querySelector('.popup_type_editprofile'); //попап редактирования профиля
const popupAddCard = document.querySelector('.popup_type_addcard'); //попап добавления карточки
const popupPreview = document.querySelector('.popup_type_preview'); //попап открытия большого фото

//кнопка "Закрыть" попапа редактирования профиля
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close-button');

//кнопка "Закрыть" попапа добавления карточки
const buttonClosePopupAdd = popupAddCard.querySelector('.popup__close-button');

//кнопка "Закрыть" попапа превью
const buttonClosePopupPreview = popupPreview.querySelector('.popup__close-preview');

const popupEditForm = document.querySelector('.popup__editform'); //форма попапа редактирования профиля
const popupAddForm = document.querySelector('.popup__addform'); //форма попапа добавления карточки

//поля попапа редактирования профиля, сюда будут вводиться значения имени и профессии
const inputNameInfo = document.querySelector('.popup__input_type_name');
const inputJobInfo = document.querySelector('.popup__input_type_job');

//поля попапа добавления карточки, сюда будут вводиться название места и ссылка
const inputAddTitle = document.querySelector('.popup__input_type_title');
const inputAddLink = document.querySelector('.popup__input_type_link');

//профиль, здесь имя и профессия будут сохраняться
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');

const bigImage = document.querySelector('.popup__big-image'); //увеличенная картинка
const cardName = document.querySelector('.popup__card-name'); //подпись под увеличенной картинкой

const list = document.querySelector('.cards__list'); //получаем родительский элемент карточки

//здесь лежит li, взятый из template
const itemTemplate = document.querySelector('.template').content.querySelector('.card');

//функция открытия попапа
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyDown);
}

//функция закрытия попапа
function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyDown);
}

//функция, которая сохраняет в профиле значения, введенные в поля попапа и закрывает попап
function submitEditProfileForm (evt) {
  evt.preventDefault();

  profileName.textContent = inputNameInfo.value;
  profileJob.textContent = inputJobInfo.value;

  closePopup(popupEdit);
}

//функция отрисовывает карточку через вспомогательную функцию createCard и добавляет ее в DOM
function renderCard(data) {
  const newCard = createCard(data);
  list.prepend(newCard);
}

//функция создает и возвращает карточку
function createCard(data) {
  const cardElement = itemTemplate.cloneNode(true); //клонируем ноду
  const cardImage = cardElement.querySelector('.card__image'); //получаем элемент - картинку в карточке
  const cardTitle = cardElement.querySelector('.card__title'); //получаем элемент - название карточки
  cardTitle.textContent = data.name; //устанавливаем значение для названия карточки
  cardImage.src = data.link; //устанавливаем ссылку на картинку
  cardImage.alt = data.name; //устанавливаем значение атрибута alt для картинки

  setListenersForItem(cardElement, data); //навешиваем слушатели на каждую карточку

  return cardElement;
}

//функция навешивания слушателей на кнопки внутри карточки
function setListenersForItem(card, data) {
  //получаем в качестве элемента кнопку удаления карточки
  const cardDeleteButton = card.querySelector('.card__delete');
  //навешиваем слушатель на кнопку удаления карточки, при клике выполняется функция handleDelete, событие event
  cardDeleteButton.addEventListener('click', handleDelete);

  //получаем в качестве элемента кнопку лайка
  const cardLikeButton = card.querySelector('.card__like');
  //навешиваем слушатель на лайк, при клике выполняется функция handleLike, событие event
  cardLikeButton.addEventListener('click', handleLike);

  //получаем в качестве элемента кнопку, которая занимает весь размер картинки
  const cardImageButton = card.querySelector('.card__image-button');
  //навешиваем слушатель на кнопку-картинку, при клике выполняется функция handleImage
  
  cardImageButton.addEventListener('click', () => {
    handleImage(data);
  });
}

function handleDelete(event) {
  event.target.closest('.card').remove();
}

function handleLike(event) {
  event.target.classList.toggle('card__like_button_active');
}

function handleImage(data) {
  //1. Наполнить модальное окно данными
  //2. Открыть модальное окно

  //контент модального окна
  bigImage.src = data.link;
  cardName.textContent = data.name;
  bigImage.alt = data.name;

  openPopup(popupPreview); //открытие модального окна
}

//функция создания новой карточки по данным, введенным пользователем
function handleAddNewCard(event) {
  event.preventDefault();
  renderCard({name: inputAddTitle.value, link: inputAddLink.value});

  closePopup(popupAddCard);
}

//закрываем попап по нажатию кнопки Escape
function handleKeyDown(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрываем попап по клику на оверлей
function closePopupOverlay(element) {
  element.addEventListener('click', function(evt) {
    if (!evt.target.closest('.popup__container')) {
      closePopup(element);
    }
  })
}

closePopupOverlay(popupEdit);
closePopupOverlay(popupAddCard);
closePopupOverlay(popupPreview);

//на кнопку редактирования профиля навешиваем слушатель, в случае клика открывается попап, поля заполнены значениями из профиля
buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEdit);
  inputNameInfo.value = profileName.textContent;
  inputJobInfo.value = profileJob.textContent;
});

//на кнопку добавления карточки навешиваем слушатель
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//слушатель сабмита на форму попапа редактирования профиля
popupEditForm.addEventListener('submit', submitEditProfileForm);

//слушатель на кнопку "Закрыть" попапа редактирования профиля
buttonClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

//слушатель на кнопку "Закрыть" попапа добавления карточки
buttonClosePopupAdd.addEventListener('click', () => {
  closePopup(popupAddCard);
  inputAddTitle.value = '';
  inputAddLink.value = '';
});

buttonClosePopupPreview.addEventListener('click', () => {
  closePopup(popupPreview);
});

initialCards.forEach(renderCard);

popupAddForm.addEventListener('submit', handleAddNewCard);
