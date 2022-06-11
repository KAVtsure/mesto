import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageZoom = this._popup.querySelector('.popup__image-zoom');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');

    }

    open = (name, link) => {
        this._popupImageZoom.src = link;
        this._popupImageTitle.textContent = name;
        this._popupImageZoom.alt = name;
        super.open();
    }
}

