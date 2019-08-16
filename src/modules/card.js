// Фильтры для товаров
import {domValue, filterData, template} from "./_helper";

function renderCard(data) {
    data.goods.forEach(card => {
        const cardNode = template.card(card);
        domValue.cardContainer.appendChild(cardNode);

        domValue.cards = document.querySelectorAll('.goods .card');
    });
    return true;
}

export {renderCard};

export default function filterCard() {
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
