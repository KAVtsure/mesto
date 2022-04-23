// Для вставки элементов в разметку
const listContainer = document.querySelector('.elements__list');
const template = document.querySelector('.template');

//Кнопки
const buttonAdd = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');

//Модальные окна
// const modalWindow = document.querySelector('.popup');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupElementEdit = document.querySelector('.popup_element-edit');
const popupImage = document.querySelector('.popup_image');
const popupImageZoom = popupImage.querySelector('.popup__image-zoom');
const popupImageTitle = popupImage.querySelector('.popup__image-title');


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


function getElement(item) {
    const newElement = template.content.cloneNode(true);
    const titleElement = newElement.querySelector('.element__title');
    const imageElement = newElement.querySelector('.element__image');
    const removeButton = newElement.querySelector(".element__delete");
    const likeButton = newElement.querySelector('.element__like');

    titleElement.textContent = item.name;
    imageElement.src = item.link;
    imageElement.alt = item.name;

    removeButton.addEventListener('click', handleRemoveElement);
    likeButton.addEventListener('click', handleLikeElement);
    imageElement.addEventListener('click', () => {
        handleOpenPopupImage(item);
    });

    return newElement;
}

function render() {
    const cards = initialCards.map(getElement);
    listContainer.prepend(...cards);
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
    closeModalWindow(popupElementEdit);
    placeInput.value = '';
    imageLinkInput.value = '';

}
elementAddForm.addEventListener('submit', handleAddElement);

function handleOpenPopupImage(item) {
    popupImageZoom.src = item.link;
    popupImageTitle.textContent = item.name;
    popupImageZoom.alt = item.name;
    openModalWindow(popupImage);
}

// Открытие окна добавления элемента
buttonAdd.addEventListener('click', () => {
    openModalWindow(popupElementEdit);
});

// Обработчик «отправки» формы профиля
function handleSubmitEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModalWindow(popupProfileEdit);
}
profileEditForm.addEventListener('submit', handleSubmitEditProfile);

// Открытие модального окна
function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_opened');
}

// Закрытие модального окна
function closeModalWindow(modalWindow) {
    modalWindow.classList.remove('popup_opened');
}

// Закрытие модальных окон по "крестику"
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
Array.from(popupCloseButtons).forEach(btn => btn.addEventListener('click', () => {
    Array.from(popups).forEach(closeModalWindow);
}
));

// Вносит в поля формы текущие значения профиля пользователя
function handleOpenProfileEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModalWindow(popupProfileEdit);
}
buttonEditProfile.addEventListener('click', handleOpenProfileEdit);