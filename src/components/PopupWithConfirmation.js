import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__edit');
        this._submitButton = this.this._popupForm.querySelector('.popup__submit-button');
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submtClickHandler();
        })
    }

    submtClickHandlerCallback(action) {
        this._submtClickHandler = action;
    }

    submitLoading(textContentButton) {
        this._submitButton.textContent = textContentButton;
    }
}