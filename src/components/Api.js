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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    deleteCard(cardId) {
        return fetch(`${this._urlCards}/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getUserInfo() {
        return fetch(this._urlUser, {
            headers: this._headers,
            method: 'GET',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    likeCard(cardId) {
        return fetch(`${this._urlCards}/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    unlikeCard(cardId) {
        return fetch(`${this._urlCards}/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    updateAvatar(link) {
        return fetch(`${this._urlUser}/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}
