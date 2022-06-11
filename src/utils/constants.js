const config = {
    formSelector: '.popup__edit',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_visible'
};

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Для вставки элементов в разметку
const listContainer = document.querySelector('.elements__list');
const listContainerSelector = '.elements__list';

//Кнопки
const buttonAdd = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
// const buttonSubmitNewElement = document.querySelector('.popup__submit-button_add');

//Модальные окна
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupElementEdit = document.querySelector('.popup_element-edit');
const popupImage = document.querySelector('.popup_image');

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

export {
    config, initialCards, listContainerSelector, buttonAdd, buttonEditProfile,
    profileEditForm, elementAddForm, nameInput, jobInput
};