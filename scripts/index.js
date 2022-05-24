import Card from './Card.js';
import { initialCards } from './cards.js';
import FormValidator from './FormValidator.js';
import { openModalWindow, closeModalWindow } from './utils.js';



// Для вставки элементов в разметку
const listContainer = document.querySelector('.elements__list');

//Кнопки
const buttonAdd = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonSubmitNewElement = document.querySelector('.popup__submit-button_add');

//Модальные окна
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupElementEdit = document.querySelector('.popup_element-edit');

//Данные профиля
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//формы
const profileEditForm = document.querySelector('.popup__edit_profile');
const elementAddForm = document.querySelector('.popup__edit_element');

// поля ввода формы элемента
const placeInput = popupElementEdit.querySelector('.popup__field_place');
const imageLinkInput = popupElementEdit.querySelector('.popup__field_image-link');
const nameInput = profileEditForm.querySelector('.popup__field_name');
const jobInput = profileEditForm.querySelector('.popup__field_description');

const config = {
    formSelector: '.popup__edit',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_visible'
};

function render() {
    initialCards.map((item) => {
        const card = new Card(item, '.template');
        const cardElemnt = card.generateCard();
        listContainer.prepend(cardElemnt);
    });

}

render();

const profileEditFormValid = new FormValidator (config, profileEditForm);
const elementAddFormValid = new FormValidator (config, elementAddForm);

//включение валидации форм профиля и добавления карточки
profileEditFormValid.enableValidation();
elementAddFormValid.enableValidation();

//добавление новой карточки
function handleAddElement(event) {
    event.preventDefault();
    const elementAdd = new Card({ name: placeInput.value, link: imageLinkInput.value }, '.template');
    listContainer.prepend(elementAdd.generateCard());
    closeModalWindow(popupElementEdit);
    placeInput.value = '';
    imageLinkInput.value = '';
    buttonSubmitNewElement.setAttribute('disabled', 'disabled');
    buttonSubmitNewElement.classList.add('popup__submit-button_disabled');
}
elementAddForm.addEventListener('submit', handleAddElement);

// Открытие окна добавления элемента
buttonAdd.addEventListener('click', () => {
    openModalWindow(popupElementEdit);
});

// Обработчик «отправки» формы профиля
function handleSubmitEditProfile(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModalWindow(popupProfileEdit);
}
profileEditForm.addEventListener('submit', handleSubmitEditProfile);

// Вносит в поля формы текущие значения профиля пользователя
function handleOpenProfileEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModalWindow(popupProfileEdit);
}
buttonEditProfile.addEventListener('click', () => {
    handleOpenProfileEdit();
    profileEditFormValid.checkInputValidityOpenPopup();
});

// Закрытие модальных окон по "крестику"
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
Array.from(popupCloseButtons).forEach(btn => btn.addEventListener('click', () => {
    Array.from(popups).forEach(closeModalWindow);
}
));

//Закрытие по оверлею
Array.from(popups).forEach((modalWindow) => modalWindow.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
        closeModalWindow(modalWindow);
    }
}))

