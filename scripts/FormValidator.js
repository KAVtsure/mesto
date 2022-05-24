export default class FormValidator {
    constructor(config, formSelector) {
        this._config = config;
        this._formSelector = formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._inputs = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        this._submitButton = this._formSelector.querySelector(this._submitButtonSelector);
    }

    //проверка валидности поля ввода
    _checkInputValidity = (input) => {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        }
    }

    //показ ошибки ввода
    _showInputError = (input, errorMessage) => {
        const errorElement = this._formSelector.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //скрытие ошибки ввода
    _hideInputError = (input) => {
        const errorElement = this._formSelector.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    //переключение состояния кнопки
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.setAttribute('disabled', 'disabled');
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.removeAttribute('disabled', 'disabled');
        }
    }

    //проверка наличия невалидных полей ввода
    _hasInvalidInput = () => {
        return this._inputs.some((input) => {
            return !input.validity.valid;
        })
    }

    //проверка валидности полей при открытии модального окна
    checkInputValidityOpenPopup = () => {
        this._inputs.forEach((input) => {
            this._hideInputError(input);
            this._toggleButtonState();
        });
    }

    //установка слушателей
    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState(this._submitButton);
            });
        }
        )
    }
    
    //включение валидации
    enableValidation = () => {
        this._formSelector.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
    }
}

