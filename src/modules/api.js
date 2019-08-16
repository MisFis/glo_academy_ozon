// Д3
// серверное API
import {domValue, template} from "./_helper";
import {renderCard} from "./card";



export default function getServerData() {
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
