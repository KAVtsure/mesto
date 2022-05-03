const config = {
    formSelector: '.popup__edit',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_visible'
};

//включение валидации
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    Array.from(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListeners(form, config);
    })
}

enableValidation(config);

//добавление слушателей для полей формы и состояния кнопки во время ввода текста
function setEventListeners(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputs, submitButton, config);
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            toggleButtonState(inputs, submitButton, config);
        });
    }
    )
}

//проверка валидности поля ввода
function checkInputValidity(form, input, config) {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, config);
    } else {
        hideInputError(form, input, config);
    }
}

//показ ошибки ввода
function showInputError(form, input, errorMessage, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

//скрытие ошибки ввода
function hideInputError(form, input, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

//переключение состояния кнопки
function toggleButtonState(inputs, submitButton, config) {
    if (hasInvalidInput(inputs)) {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.setAttribute('disabled', 'disabled');
    } else {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.removeAttribute('disabled', 'disabled');
    }
}

//проверка наличия невалидных полей ввода
function hasInvalidInput(inputs) {
    return inputs.some((input) => {
        return !input.validity.valid;
    })
}


