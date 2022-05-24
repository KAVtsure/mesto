import { openModalWindow } from './utils.js';

const popupImage = document.querySelector('.popup_image');
const popupImageZoom = popupImage.querySelector('.popup__image-zoom');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateSelector;
    }

    _getTemplate = () => {
        const newElement = document
            .querySelector(this._template)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return newElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;

        return this._element;
    }

    _setEventListeners = () => {
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleRemoveElement();
        });
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeElement();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopupImage();
        });
    };

    _handleOpenPopupImage = () => {
        popupImageZoom.src = this._link;
        popupImageTitle.textContent = this._name;
        popupImageZoom.alt = this._name;
        openModalWindow(popupImage);
    }

    _handleRemoveElement = () => {
        this._element.remove();
    }

    _handleLikeElement = () => {
        this._element.querySelector('.element__like').classList.toggle('element__like_enable');
    }

}