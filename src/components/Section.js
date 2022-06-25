export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderedItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
        return items;
    }

    renderCard(item) {
        this._renderer(item);
    }

    // addItem(item) {
    //     const card = this._renderer(item)
    //     this._container.prepend(card);
    // }


}