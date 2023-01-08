export class Card {
  constructor(data, cardTemplateSelector, handleClickImage) {
    this._data = data;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');
    this._handleClickImage = handleClickImage;
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardDeleteButton = this._cardElement.querySelector('.card__delete');
    this._cardLikeButton = this._cardElement.querySelector('.card__like');
    this._cardImageButton = this._cardElement.querySelector('.card__image-button');
  }

  _handleDelete = () => {
    this._cardElement.remove();
  }

  _handleLike = () => {
    this._cardLikeButton.classList.toggle('card__like_button_active');
  }

  _setListenersForItem() {
    this._cardDeleteButton.addEventListener('click', this._handleDelete);
    this._cardLikeButton.addEventListener('click', this._handleLike);
    this._cardImageButton.addEventListener('click', () => this._handleClickImage(this._data));
  };

  createCard() {
    const cardImage = this._cardElement.querySelector('.card__image');
    const cardTitle = this._cardElement.querySelector('.card__title');
    cardTitle.textContent = this._data.name;
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;

    this._setListenersForItem();

    return this._cardElement;
  }
}