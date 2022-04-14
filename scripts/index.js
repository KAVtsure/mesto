let formElement = document.querySelector('.popup__edit');
let nameInput = formElement.querySelector('.popup__field_name');
let jobInput = formElement.querySelector('.popup__field_description');


let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
// Обработчик «отправки» формы
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    toggleModalWindow();
}
// Обработчик следит за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// Открытие-закрытие окна редактирования профиля пользователя
const ModalWindow = document.querySelector('.popup');
function toggleModalWindow() {
    ModalWindow.classList.toggle('popup_opened');
}

const ModalWindowCloseBtn = ModalWindow.querySelector('.popup__close-button');
// Обработчик следит за событием “click” - «закрытие окна редактирования профиля пользователя по кнопке "Закрыть"»
ModalWindowCloseBtn.addEventListener('click', toggleModalWindow);


const profileEditBtn = document.querySelector('.profile__edit-button');
// Вносит в поля формы текущие значения профиля пользователя
function openProfileEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    toggleModalWindow();
}
// Обработчик следит за событием “click” - «Внесение текущих значений профиля пользователя в поля формы по кнопке "Редактировать профиль"»
profileEditBtn.addEventListener('click', openProfileEdit);