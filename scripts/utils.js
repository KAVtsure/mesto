// Открытие модального окна
function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', closeModalWindowEsc);
}

// Закрытие модального окна
function closeModalWindow(modalWindow) {
    modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeModalWindowEsc);
}

//Закрытие по Esc
function closeModalWindowEsc(event) {
    if (event.key === 'Escape') {
        const modalWindowOpen = document.querySelector('.popup_opened');
        closeModalWindow(modalWindowOpen);
    }
};

export { openModalWindow, closeModalWindow };