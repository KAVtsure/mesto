import {
    config, initialCards, listContainer, buttonAdd, buttonEditProfile,
    popupProfileEdit, popupElementEdit, profileName, profileDescription,
    profileEditForm, elementAddForm, placeInput, imageLinkInput, nameInput, jobInput
} from '../utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openModalWindow, closeModalWindow } from '../utils/utils.js';

function createCard(item) {
    const card = new Card(item, '.template');
    const cardElement = card.generateCard();
    console.log(cardElement);
    return cardElement;

}

function render() {
    initialCards.map((item) => {
        const cardElement = createCard(item);
        listContainer.prepend(cardElement);
    });

}

render(initialCards);

const profileEditFormValid = new FormValidator(config, profileEditForm);
const elementAddFormValid = new FormValidator(config, elementAddForm);

//включение валидации форм профиля и добавления карточки
profileEditFormValid.enableValidation();
elementAddFormValid.enableValidation();

//добавление новой карточки
function handleAddElement(event) {
    event.preventDefault();
    const elementAdd = createCard({ name: placeInput.value, link: imageLinkInput.value }, '.template');
    listContainer.prepend(elementAdd);
    closeModalWindow(popupElementEdit);
    elementAddForm.reset();
    elementAddFormValid.checkInputValidityOpenClosePopup();
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
    profileEditFormValid.checkInputValidityOpenClosePopup();
});



