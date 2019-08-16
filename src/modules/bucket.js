// КОРЗИНА
import {domValue} from "./_helper";

export default function bucketApi() {

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
