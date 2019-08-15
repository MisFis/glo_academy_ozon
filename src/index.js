(function init() {
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
    // Д1
    // Чекбокс
    function toggleCheckbox() {
        const checkbox = domValue.stockCheckbox;

        checkbox.addEventListener('change', () => {
            const customCheckbox = checkbox.nextElementSibling;
            if (checkbox.checked) {
                customCheckbox.classList.add('checked');
            } else {
                customCheckbox.classList.remove('checked');
            }
        });
    }

    // КОРЗИНА
    function bucketApi() {

        const {btnCart, modalPopup} = domValue;

        btnCart.addEventListener('click', function () {
            modalPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        const closeModal = document.querySelector('.cart-close');
        closeModal.addEventListener('click', function () {
            modalPopup.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Д1
        // добавление товара в корзину
        const {cardModalContainer, cardContainer} = domValue;
        const cardModalEmpty = document.querySelector('#cart-empty');
        let countInBucket = 0;

        cardContainer.addEventListener('click', (event) => {
            const buttonCard = event.target.closest('.btn');
            if (buttonCard) {
                const card = buttonCard.closest('.card');
                if (card) {
                    addCardInBucket(card);
                }
            }
        });
        // Д1
        // добавление
        const addCardInBucket = (card) => {
            const cardClone = card.cloneNode(true);
            cardModalContainer.appendChild(cardClone);

            const copyBtnNode = cardClone.querySelector('.btn');
            copyBtnNode.textContent = 'Удалить';
            copyBtnNode.addEventListener('click', () => removeCardInBucket(cardClone));

            countElementBasket();
            sumInBasketLazy(card, 'add');
            if (countInBucket === 1) {
                cardModalEmpty.remove();
            }
        };
        // Д1
        // удаление
        const removeCardInBucket = (card) => {
            card.remove();

            countElementBasket();
            sumInBasketLazy(card, 'remove');
            if (countInBucket === 0) {
                cardModalContainer.appendChild(cardModalEmpty);
            }
        };
        // Д1
        // подсчет элементов в корзине
        const countElementBasket = () => {
            const countNode = btnCart.querySelector('.counter');
            const cardInBasketNode = domValue.cardInBasketNode();
            countInBucket = cardInBasketNode.length;

            countNode.textContent = String(countInBucket);
        };
        // Д2
        // сумма в корзине
        let totalPrice = 0;

        const sumInBasketLazy = (newCard, command) => {
            const price = newCard.querySelector('.card-price');
            totalPrice = command === 'add' ? totalPrice + parseFloat(price.textContent)
                : totalPrice - parseFloat(price.textContent);

            const totalPriceNode = document.querySelector('.cart-total');
            totalPriceNode.querySelector('span').textContent = String(totalPrice);
        };
    }

    // Фильтры для товаров
    function filterCard() {
        const {cards, stockCheckbox, minField: min, maxField: max} = domValue;
        // Д2 Доп задание
        // Поиск по цене и акциям
        const filterCardsEvent = () => {
            const {checked} = stockCheckbox;
            const maxPrice = parseFloat(max.value);
            const minPrice = parseFloat(min.value);

            cards.forEach(card => {
                const isSale = card.querySelector('.card-sale');
                const priceCard = parseFloat(card.querySelector('.card-price').textContent);

                if (checked && !isSale) {
                    card.parentNode.style.display = 'none';
                } else if (filterData.category && card.dataset.category !== filterData.category) {
                    card.parentNode.style.display = 'none';
                } else if ((!!maxPrice && maxPrice < priceCard) || (!!minPrice && minPrice > priceCard)) {
                    card.parentNode.style.display = 'none';
                } else {
                    card.parentNode.style.display = '';
                }
            });
        };

        // Д3
        // Фильтр по категорями ДОП
        let oldSelectedCategory = null;
        domValue.catalogContainer.addEventListener('click', (event) => {
            const target = event.target.closest('li');
            if (target) {
                if (target === oldSelectedCategory) {
                    filterData.category = null;
                    oldSelectedCategory.classList.remove('active');
                    oldSelectedCategory = null;
                    filterCardsEvent();
                    return;
                }
                if (oldSelectedCategory) {
                    oldSelectedCategory.classList.remove('active');
                }
                target.classList.add('active');
                filterData.category = target.textContent;
                oldSelectedCategory = target;
                filterCardsEvent();
            }
        });

        stockCheckbox.addEventListener('change', filterCardsEvent);
        min.addEventListener('change', filterCardsEvent);
        max.addEventListener('change', filterCardsEvent);

        // Д2
        // Поиск по тексту
        const searchTextNode = document.querySelector('.search-wrapper_input');

        const searchText = () => {
            const searchText = searchTextNode.value;
            cards.forEach(card => {
                const cardContent = card.querySelector('.card-title').textContent;
                if (cardContent.toLowerCase().includes(searchText)) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            });
        };

        document.querySelector('.search-btn').addEventListener('click', searchText);
    }

    // Д3
    // серверное API
    function getServerData() {
        return fetch('./db/db.json')
            .then(response => {
                    if (!response.ok) {
                        throw new Error('Все плохо, пора бежать с сайта, ' +
                            'товаров не будет и статус там странный, смотри ' + response.status);
                    }
                    return response.json();
                }
            )
            .then(renderCard)
            .catch(error => {
                console.warn(error);
                domValue.cardContainer.innerHTML = `<h1 style="color: red">${error.message}</h1>`;
            })
            ;
    }

    function renderCard(data) {
        data.goods.forEach(card => {
            const cardNode = template.card(card);
            domValue.cardContainer.appendChild(cardNode);

            domValue.cards = document.querySelectorAll('.goods .card');
        });
        return true;
    }

    function renderCatalog() {
        const {cards, catalogButton, catalogContainer} = domValue;
        const categores = new Set();

        cards.forEach(card => {
            categores.add(card.dataset.category);
        });

        categores.forEach(category => {
            const el = document.createElement('li');
            el.textContent = category;
            catalogContainer.appendChild(el);
        });


        catalogButton.addEventListener('click', () => {
            const display = domValue.catalogWrapper.computedStyleMap().get('display').value;
            domValue.catalogWrapper.style.display = display === 'none' ? 'block' : 'none';
        });
    }

    getServerData()
        .then(() => {
            toggleCheckbox();
            bucketApi();
            filterCard();
            renderCatalog();
        })
    ;

})();
