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
        }
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userDescription.textContent = data.about;
        this._avatar.src = data.avatar;

    }
}
