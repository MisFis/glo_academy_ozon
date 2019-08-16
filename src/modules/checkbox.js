// Д1
// Чекбокс
import {domValue} from "./_helper";

export default function toggleCheckbox() {
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
