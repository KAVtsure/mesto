let formElement = document.querySelector('.popup__edit');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

// Обработчик следит за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Открытие-закрытие окна редактирования профиля пользователя
const profileEditBtn = document.querySelector('.profile__edit-button');
const ModalWindow = document.querySelector('.popup');
const ModalWindowCloseBtn = ModalWindow.querySelector('.popup__close-button');

function toggleModalWindow() {
    ModalWindow.classList.toggle('popup_opened');
}

// Обработчик следит за событием “click” - «Открытие/закрытие окна редактирования профиля пользователя по кнопке»
profileEditBtn.addEventListener('click', toggleModalWindow);
ModalWindowCloseBtn.addEventListener('click', toggleModalWindow);


formElement.addEventListener('submit', toggleModalWindow);// Обработчик следит за событием “submit” - "закрытие модального окна"


// Вносит в поля формы текущие значения профиля пользователя
function openProfileEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

profileEditBtn.addEventListener('click', openProfileEdit);// Обработчик следит за событием “click” - «Внесение текущих значений профиля пользователя в поля формы»