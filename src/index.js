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
        // Нельзя в кэш
        cards: document.querySelectorAll('.goods .card'),
        cardInBasketNode: () => document.querySelectorAll('.cart-wrapper .card'),
    };
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
            totalPrice =  command === 'add' ? totalPrice + parseFloat(price.textContent)
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

                if (checked) {
                    if (!isSale) {
                        card.parentNode.style.display = 'none';
                        return;
                    }
                } else {
                    card.parentNode.style.display = '';
                }

                if ((!!maxPrice && maxPrice < priceCard) || (!!minPrice && minPrice > priceCard)) {
                    card.parentNode.style.display = 'none';
                    return;
                } else {
                    card.parentNode.style.display = '';
                }
            });
        };

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

    toggleCheckbox();
    bucketApi();
    filterCard();
})();
