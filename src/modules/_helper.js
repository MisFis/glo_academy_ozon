const domValue = {
    // Можно в кэш
    stockCheckbox: document.querySelector('#discount-checkbox'),
    btnCart: document.querySelector('#cart'),
    minField: document.querySelector('#min'),
    maxField: document.querySelector('#max'),
    modalPopup: document.querySelector('.cart'),
    cardModalContainer: document.querySelector('.cart-wrapper'),
    cardContainer: document.querySelector('.goods'),
    catalogButton: document.querySelector('.catalog-button'),
    catalogContainer: document.querySelector('.catalog-list'),
    catalogWrapper: document.querySelector('.catalog'),
    // Нельзя в кэш
    cards: document.querySelectorAll('.goods .card'),
    cardInBasketNode: () => document.querySelectorAll('.cart-wrapper .card'),
};

const template = {
    card: (card) => {
        const template = `<div class="col-12 col-md-6 col-lg-4 col-xl-3">
                        <div class="card" data-category="${card.category}">
                            <div class="card-img-wrapper">
                                <span class="card-img-top"
                                    style="background-image: url('${card.img}')"></span>
                            </div>
                            ${card.sale ? ' <div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                            <div class="card-body justify-content-between">
                                <div class="card-price">${card.price} ₽</div>
                                <h5 class="card-title">${card.title}</h5>
                                <button class="btn btn-primary">В корзину</button>
                            </div>
                        </div>
                    </div>`;
        return  createElementFromHTML(template);
    }
};

const filterData = {
    category: null
};


function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

export {domValue, template, filterData};
