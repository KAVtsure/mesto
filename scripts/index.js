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
const template = document.querySelector('.template');

//Кнопки
const addButton = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

//Модальные окна
const popup = document.querySelector('.popup');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupElementEdit = document.querySelector('.popup_element-edit');
const popupImage = document.querySelector('.popup_image');
const popupImageZoom = popupImage.querySelector('.popup__image-zoom');
const popupImageTitle = popupImage.querySelector('.popup__image-title');


//Данные профиля
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

//формы
const profileEditForm = document.querySelector('.popup__edit_profile');
const elementAddForm = document.querySelector('.popup__edit_element');

// поля ввода формы элемента
let placeInput = popupElementEdit.querySelector('.popup__field_place');
let imageLinkInput = popupElementEdit.querySelector('.popup__field_image-link');
let nameInput = profileEditForm.querySelector('.popup__field_name');
let jobInput = profileEditForm.querySelector('.popup__field_description');


function getElement(item) {
    const newElement = template.content.cloneNode(true);
    const titleElement = newElement.querySelector('.element__title');
    const imageElement = newElement.querySelector('.element__image');
    const removeButton = newElement.querySelector(".element__delete");
    const likeButton = newElement.querySelector('.element__like');

    titleElement.textContent = item.name;
    imageElement.src = item.link;

    removeButton.addEventListener('click', handleRemoveElement);
    likeButton.addEventListener('click', handleLikeElement);
    imageElement.addEventListener('click', () => {
        handleOpenPopupImage(item);
    });

    return newElement;
}

function render() {
    const html = initialCards.map(getElement);
    listContainer.prepend(...html);
}

render();

function handleRemoveElement(evt) {
    const element = evt.target.closest('.element');
    element.remove();
}

function handleLikeElement(evt) {
    const element = evt.target.closest('.element__like');
    element.classList.toggle('element__like_enable');
}


function handleAddElement(evt) {
    evt.preventDefault();
    const elementAdd = getElement({ name: placeInput.value, link: imageLinkInput.value });
    listContainer.prepend(elementAdd);
    toggleModalWindow(popupElementEdit);
    placeInput.value = '';
    imageLinkInput.value = '';

}
elementAddForm.addEventListener('submit', handleAddElement);

function handleOpenPopupImage(item) {
    popupImageZoom.src = item.link;
    popupImageTitle.textContent = item.name;
    popupImageZoom.alt = item.name;
    toggleModalWindow(popupImage);
}

// Открытие окна добавления элемента
addButton.addEventListener('click', () => {
    toggleModalWindow(popupElementEdit);
});

// Обработчик «отправки» формы профиля
function handleSubmitEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    toggleModalWindow(popup);
}
profileEditForm.addEventListener('submit', handleSubmitEditProfile);

// Открытие-закрытие модального окна
function toggleModalWindow(popup) {
    popup.classList.toggle('popup_opened');
}

// Закрытие модальных окон по "крестику"
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
Array.from(popupCloseButtons).forEach(btn => btn.addEventListener('click', () => {
    Array.from(popups).forEach(elem => elem.classList.remove('popup_opened'));
}
));

// Вносит в поля формы текущие значения профиля пользователя
function handleOpenProfileEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    toggleModalWindow(popup);
}
profileEditBtn.addEventListener('click', handleOpenProfileEdit);