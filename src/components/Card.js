export default class Card {

    constructor({ name, link }, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;

        this._cardImage = document
            .querySelector(this._template)
            .content.querySelector('.element__image');
        this._cardTitle = document
            .querySelector(this._template)
            .content.querySelector('.element__title');
    }

    _getTemplate = () => {
        const newElement = document
            .querySelector(this._template)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return newElement;
    }

    generateCard = () => {
        // this._element.querySelector('.element__title').textContent = this._name;
        // this._element.querySelector('.element__image').src = this._link;
        // this._element.querySelector('.element__image').alt = this._name;

        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._element = this._getTemplate();
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners = () => {

        this._cardDelete = this._element.querySelector('.element__delete');
        this._cardDelete.addEventListener('click', () => {
            this._handleRemoveElement();
        });

        this._cardLike = this._element.querySelector('.element__like');
        this._cardLike.addEventListener('click', () => {
            this._handleLikeElement();
        });

        this._cardImageShow = this._element.querySelector('.element__image');
        this._cardImageShow.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

    };

    // _handleOpenPopupImage = () => {
    //     popupImageZoom.src = this._link;
    //     popupImageTitle.textContent = this._name;
    //     popupImageZoom.alt = this._name;
    //     openModalWindow(popupImage);
    // }

    _handleRemoveElement = () => {
        this._element.remove();
    }

    _handleLikeElement = () => {
        this._cardLike.classList.toggle('element__like_enable');
    }
}