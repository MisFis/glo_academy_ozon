import {domValue} from "./_helper";

export default function renderCatalog() {
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
