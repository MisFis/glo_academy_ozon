import getServerData from "./modules/api";
import toggleCheckbox from "./modules/checkbox";
import bucketApi from "./modules/bucket";
import filterCard from "./modules/card";
import renderCatalog from "./modules/catalog";

(function init() {
    getServerData()
        .then(() => {
            toggleCheckbox();
            bucketApi();
            filterCard();
            renderCatalog();
        })
    ;

})();
