
function init() {
    // чекбокс
    const checkbox = document.querySelector('#discount-checkbox');

    checkbox.addEventListener('change', (event) => {
        const customCheckbox = checkbox.nextElementSibling;
        if (checkbox.checked) {
            customCheckbox.classList.add('checked');
        } else {
            customCheckbox.classList.remove('checked');
        }
    });

    // Корзина
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
           countElementBasket();

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
    };

    // удаление
    const removeCardInBucket = (card, event) => {
        card.remove();

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
}

init();



