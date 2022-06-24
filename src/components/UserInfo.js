export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userDescription = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
      
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            description: this._userDescription.textContent,
            id: this._id
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._userName.textContent = name;
        this._userDescription.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
    }
}
