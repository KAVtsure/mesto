import './index.css';
import {
    config, listContainerSelector, buttonAdd, buttonEditProfile, buttonEditAvatar,
    profileEditForm, elementAddForm, avatarEditForm, nameInput, jobInput
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

let userId;


//Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
    headers: {
        authorization: '875f0935-5842-4013-860b-5457ce9f84f3',
        'Content-Type': 'application/json'
    }
});


//Информация о пользователе
const user = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
});


//Загрузка данных с сервера 
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, initialCards]) => {

        userId = userInfo._id;
        console.log(userId);
        user.setUserInfo(userInfo);

        cardList.renderedItems(initialCards);
    })
    .catch((err) => {
        console.log(err);
    })


//Создание карточек    
function createCard(item) {

    const card = new Card({
        cardData: item,
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);

        },
        handleLikeClick: (cardId) => {
            api.likeCard(cardId)
                .then((res) => {
                    card.handleSetLike(res);
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
        },
        handleDeleteLikeClick: (cardId) => {
            api.unlikeCard(cardId)
                .then((res) => {
                    card.handleSetLike(res);
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
        },
        handleDeleteClick: (cardId) => {
            elementDeleteConfirmPopup.open();
            elementDeleteConfirmPopup.setSubmitHandler(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        elementDeleteConfirmPopup.close();
                        card.handleRemoveElement();
                    })
                    .catch((err) => {
                        console.log(err); // выведем ошибку в консоль
                    })
            })
        },
        userId: userId
    }, '.template');
    const cardElement = card.generateCard();
    return cardElement;
}


//Секция с карточками
const cardList = new Section({
    renderer: (item) => {
        const newCard = createCard(item);
        cardList.addItem(newCard);
    }
}, listContainerSelector);

// cardList.renderedItems();


//Попап с картинкой
const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();


//Валидация
const avatarEditFormValidator = new FormValidator(config, avatarEditForm);
avatarEditFormValidator.enableValidation();

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')

        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);


//Профиль
function handleOpenProfileEdit() {
    const profileInfo = user.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.description;
    formValidators['profile_edit_form'].resetValidation();
}

const profileEditPopup = new PopupWithForm('.popup_profile-edit',
    {
        handleSubmitForm: (data) => {
            profileEditPopup.renderLoading('Сохранение...');
            api.saveUserInfo(data['profile_name'], data['profile__description'])
                .then((res) => {
                    user.setUserInfo(res);
                    profileEditPopup.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
                .finally(() => {
                    profileEditPopup.renderLoading('Сохранить');
                })
        }
    }
)
profileEditPopup.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    handleOpenProfileEdit();
    profileEditPopup.open();
})


//Карточки
const elementEditPopup = new PopupWithForm('.popup_element-edit',
    {
        handleSubmitForm: (item) => {
            elementEditPopup.renderLoading('Сохранение...');
            api.addCard(item['place_name'], item['image-link'])
                .then((item) => {
                    cardList.renderCard(item);
                    elementEditPopup.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
                .finally(() => {
                    elementEditPopup.renderLoading('Сохранить');
                })
        }
    }
)

elementEditPopup.setEventListeners();

buttonAdd.addEventListener('click', () => {
    formValidators['element_edit_form'].resetValidation();
    elementEditPopup.open();
})


//Аватар
const avatarEditPopup = new PopupWithForm('.popup_avatar-edit',
    {
        handleSubmitForm: (data) => {
            avatarEditPopup.renderLoading('Сохранение...');
            api.updateAvatar(data['avatar-link'])
                .then((data) => {
                    user.setUserInfo(data);
                    avatarEditPopup.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
                .finally(() => {
                    avatarEditPopup.renderLoading('Сохранить');
                })
        }
    }
)
avatarEditPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
    avatarEditFormValidator.resetValidation();
    avatarEditPopup.open();
})


//Окно подтверждения
const elementDeleteConfirmPopup = new PopupWithConfirmation('.popup_confirmation');
elementDeleteConfirmPopup.setEventListeners();


// const profileEditFormValid = new FormValidator(config, profileEditForm);
// const elementAddFormValid = new FormValidator(config, elementAddForm);
// const avatarEditFormValidator = new FormValidator(config, avatarEditForm);

// profileEditFormValid.enableValidation();
// elementAddFormValid.enableValidation();
// avatarEditFormValidator.enableValidation();