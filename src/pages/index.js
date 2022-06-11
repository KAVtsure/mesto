import './index.css';
import {
    config, initialCards, listContainerSelector, buttonAdd, buttonEditProfile,
    profileEditForm, elementAddForm, nameInput, jobInput
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';


function createCard(item) {
    const card = new Card(item, '.template',
        (name, link) => {
            imagePopup.open(name, link);
        });
    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({
    items: initialCards,
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

profileEditFormValid.enableValidation();
elementAddFormValid.enableValidation();


const profileEditPopup = new PopupWithForm('.popup_profile-edit',
    {
        handleSubmitForm: (data) => {
            user.setUserInfo(data['profile_name'], data['profile__description']);
        }
    }
)
profileEditPopup.setEventListeners();

const user = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
});

function handleOpenProfileEdit() {
    const profileInfo = user.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.description;
    profileEditFormValid.checkInputValidityOpenClosePopup();
}

buttonEditProfile.addEventListener('click', () => {
    handleOpenProfileEdit();
    profileEditPopup.open();
})


const elementEditPopup = new PopupWithForm('.popup_element-edit',
    {
        handleSubmitForm: (item) => {
            const newElement = {
                name: item['place_name'],
                link: item['image-link']
            }
            cardList.addItem(createCard(newElement));
        }
    }
)

elementEditPopup.setEventListeners();

buttonAdd.addEventListener('click', () => {
    elementAddFormValid.checkInputValidityOpenClosePopup();
    elementEditPopup.open();
})



