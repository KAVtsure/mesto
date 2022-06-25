export default class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
        this._urlUser = `${this._url}/users/me`;
        this._urlCards = `${this._url}/cards`;
        this._urlUserAvatar = `${this._url}/users/me/avatar`;
    }

    getInitialCards() {
        return fetch(this._urlCards, {
            headers: this._headers,
            method: 'GET'
        })
            .then(this._checkResponse);
    }

    addCard(cardName, cardLink) {
        return fetch(this._urlCards, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._urlCards}/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._urlUser, {
            headers: this._headers,
            method: 'GET',
        })
            .then(this._checkResponse);
    }

    saveUserInfo(userName, userDescription) {
        return fetch(this._urlUser, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: userName,
                about: userDescription
            })
        })
            .then(this._checkResponse);
    }

    likeCard(cardId) {
        return fetch(`${this._urlCards}/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
        })
            .then(this._checkResponse);
    }

    unlikeCard(cardId) {
        return fetch(`${this._urlCards}/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._checkResponse);
    }

    updateAvatar(link) {
        return fetch(`${this._urlUser}/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}
