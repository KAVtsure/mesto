export default class Card {

    constructor({ cardData, handleCardClick, handleLikeClick, handleDeleteClick, userId }, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._cardId = cardData._id;
        this._ownerCard = cardData.owner._id;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;


        this._cardImage = document
            .querySelector(this._template)
            .content.querySelector('.element__image');
        this._cardTitle = document
            .querySelector(this._template)
            .content.querySelector('.element__title');
        this._likesCounter = document
            .querySelector(this._template)
            .content.querySelector('.element__like-counter');

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
        this._likesCounter.textContent = this._likes.length;


        this._checkOwnLikes();
        this._checkDeleteButton()
        this._element = this._getTemplate();
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners = () => {

        this._cardDelete = this._element.querySelector('.element__delete');
        this._cardDelete.addEventListener('click', () => {
            this._handleDeleteClick(this._cardId);
        });

        this._cardLike = this._element.querySelector('.element__like');
        this._cardLike.addEventListener('click', () => {
            this._handleLikeClick(this._cardId);
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

    handleRemoveElement() {
        this._element.remove();
    }

    _handleLikeElement = () => {
        this._cardLike.classList.toggle('element__like_enable');
    }

    _checkOwnLikes() {
        this._likes.forEach(element => {
            if (element._id === this._userId) {
                this._cardLike.classList.add('element__like_enable');
            }
        });
    }

    _checkDeleteButton() {
        if (this._ownerCard !== this._userId) {
            this._cardDelete.remove();
        }
    }

    handleSetLike(cardData) {
        this._likes = cardData.likes;
        this._likesCounter.textContent = this._likes.length;
        _handleLikeElement();
    }
}