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
    .then(([UserInfo, InitialCards]) => {

        userId = UserInfo._id;
        console.log(userId);
        user.setUserInfo(UserInfo);

        cardList.renderedItems(InitialCards);
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
            console.log(imagePopup)
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
            elementDeleteConfirmPopup.submtClickHandlerCallback(() => {
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
const profileEditFormValid = new FormValidator(config, profileEditForm);
const elementAddFormValid = new FormValidator(config, elementAddForm);
const avatarEditFormValidator = new FormValidator(config, avatarEditForm);

profileEditFormValid.enableValidation();
elementAddFormValid.enableValidation();
avatarEditFormValidator.enableValidation();


//Профиль
function handleOpenProfileEdit() {
    const profileInfo = user.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.description;
    profileEditFormValid.checkInputValidityOpenClosePopup();
}

const profileEditPopup = new PopupWithForm('.popup_profile-edit',
    {
        handleSubmitForm: (data) => {
            profileEditPopup.submitLoading('Сохранение...');
            api.saveUserInfo(data['profile_name'], data['profile__description'])
                .then((res) => {
                    user.setUserInfo(res);
                    profileEditPopup.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
                .finally(() => {
                    profileEditPopup.submitLoading('Сохранить');
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
            elementEditPopup.submitLoading('Сохранение...');
            api.addCard(item['place_name'], item['image-link'])
                .then((item) => {
                    cardList.addItem(createCard(item));
                    elementEditPopup.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
                .finally(() => {
                    elementEditPopup.submitLoading('Сохранить');
                })
        }
    }
)

elementEditPopup.setEventListeners();

buttonAdd.addEventListener('click', () => {
    elementAddFormValid.checkInputValidityOpenClosePopup();
    elementEditPopup.open();
})


//Аватар
const avatarEditPopup = new PopupWithForm('.popup_avatar-edit',
    {
        handleSubmitForm: (data) => {
            avatarEditPopup.submitLoading('Сохранение...');
            api.updateAvatar(data['avatar-link'])
                .then((data) => {
                    user.setUserInfo(data);
                    avatarEditPopup.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
                .finally(() => {
                    avatarEditPopup.submitLoading('Сохранить');
                })
        }
    }
)
avatarEditPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
    avatarEditFormValidator.checkInputValidityOpenClosePopup();
    avatarEditPopup.open();
})


//Окно подтверждения
const elementDeleteConfirmPopup = new PopupWithConfirmation('.popup_confirmation');
elementDeleteConfirmPopup.setEventListeners();
