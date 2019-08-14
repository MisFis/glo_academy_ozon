
function init() {
    // Чекбокс
    const checkbox = document.querySelector('#discount-checkbox');

    checkbox.addEventListener('change', (event) => {
        const customCheckbox = checkbox.nextElementSibling;
        if (checkbox.checked) {
            customCheckbox.classList.add('checked');
        } else {
            customCheckbox.classList.remove('checked');
        }
    });

    // ##### КОРЗИНА #####
    const btnCart = document.querySelector('#cart');
    const modalCart = document.querySelector('.cart');
    const closeModal = document.querySelector('.cart-close');

    btnCart.addEventListener('click', function () {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', function () {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });


    // добавление товара в корзину
    const cards = document.querySelectorAll('.goods .card');
    const cardModal = document.querySelector('.cart-wrapper');
    const cardModalEmpty = document.querySelector('#cart-empty');
    let countInBucket = 0;

    cards.forEach((card) => {
       const btn = card.querySelector('.btn');
       btn.addEventListener('click', (event) => {
           addCardInBucket(card);

           // btn.setAttribute('disabled', 'true');
           cardModalEmpty.remove();
       });
    });

    // добавление
    const addCardInBucket = (card) => {
        const cardClone = card.cloneNode(true);
        cardModal.appendChild(cardClone);

        const copyBtnNode = cardClone.querySelector('.btn');
        copyBtnNode.textContent = 'Удалить';
        copyBtnNode.addEventListener('click', (event) => removeCardInBucket(cardClone, event));

        countElementBasket();
        sumInBasket();
    };

    // удаление
    const removeCardInBucket = (card, event) => {
        card.remove();

        sumInBasket();
        countElementBasket();
        if (countInBucket === 0) {
            cardModal.appendChild(cardModalEmpty);
        }
    };

    // подсчет элементов в корзине
    const countElementBasket = () => {
        const countNode = btnCart.querySelector('.counter');
        const cardInBasketNode = cardModal.querySelectorAll('.card');
        countInBucket = cardInBasketNode.length;

        countNode.textContent = String(countInBucket);
    };

    // сумма в корзине
    const sumInBasket = () => {
        const cardInBasketNode = cardModal.querySelectorAll('.card');
        let totalPrice = 0;

        cardInBasketNode.forEach(item => {
            const price = item.querySelector('.card-price');
            totalPrice += parseFloat(price.textContent);
        });

        const totalPriceNode = document.querySelector('.cart-total');
        totalPriceNode.querySelector('span').textContent = String(totalPrice);
    };
}

init();



