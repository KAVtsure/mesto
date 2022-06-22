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
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
    headers: {
        authorization: '875f0935-5842-4013-860b-5457ce9f84f3',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([UserInfo, InitialCards]) => {
        user.setUserInfo(UserInfo);
        cardList.renderedItems(InitialCards);
    })
    .catch((err) => {
        console.log(err);
    })

function createCard(item) {

    const card = new Card({
        cardData: item,
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        },
        handleLikeClick: (cardId) => {
            api.likeCard(cardId)
                .then((item) => {
                    card.handleSetLike(item);
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

const cardList = new Section({
    renderer: (item) => {
        const newCard = createCard(item);
        cardList.addItem(newCard);
    }
}, listContainerSelector);

cardList.renderedItems();


const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();


const profileEditFormValid = new FormValidator(config, profileEditForm);
const elementAddFormValid = new FormValidator(config, elementAddForm);
const avatarEditFormValidator = new FormValidator(config, avatarEditForm);

profileEditFormValid.enableValidation();
elementAddFormValid.enableValidation();
avatarEditFormValidator.enableValidation();

const user = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
});

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
            api.saveUserInfo(data)
                .then((data) => {
                    user.setUserInfo(data);
                    profileEditPopup.close();
                    // user.setUserInfo(data['profile_name'], data['profile__description']);
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


const elementEditPopup = new PopupWithForm('.popup_element-edit',
    {
        handleSubmitForm: (item) => {
            elementEditPopup.submitLoading('Сохранение...');
            const newElement = {
                name: item['place_name'],
                link: item['image-link']
            }
            api.addCard(newElement)
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


const elementDeleteConfirmPopup = new PopupWithConfirmation('.popup_confirmation');

elementDeleteConfirmPopup.setEventListeners();


// api.getInitialCards()
//     .then((items) => {
//         const cardList = new Section({
//             items,
//             renderer: (item) => {
//                 const newCard = createCard(item);
//                 cardList.addItem(newCard);
//             }
//         }, listContainerSelector);
//     })
//     .catch((err) => {
//         console.log(err); // выведем ошибку в консоль
//     });

// function addTaskHandler(taskName) {
//     api.addTask(taskName)
//         .then((res) => {
//             const cardList = new Section({
//                 items,
//                 renderer: (item) => {
//                     const newCard = createCard(item);
//                     cardList.addItem(newCard);
//                 }
//             }, listContainerSelector);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

// function deleteTaskHandler(taskId) {
//     api.deleteTask(taskId);
// }

// // api.getUserInfo()
// //     .then((UserInfo) => {
// //         api.getInitialCards()
// //             .then((cards) => {

// //             })
// //     })

// Promise.all([api.getUserInfo(), api.getInitialCards()])
// .then(([UserInfo, cards]))