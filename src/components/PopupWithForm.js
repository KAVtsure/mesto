import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__edit');
        this._inputList = this._popupForm.querySelectorAll('.popup__field');
        this._submitButton = this._popupForm.querySelector('.popup__submit-button');

    }

    _getInputValues = () => {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;

    }

    setEventListeners() {
        super.setEventListeners();
        
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    renderLoading(textContentButton) {
        this._submitButton.textContent = textContentButton;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
            input.value = data[input.name];
            console.log(this._inputList)
        });
    }
}