var _a;
import { Product } from "./classi.js";
var coloriCiabatte = ["rosa", "rosso", "blu"];
var prodotto1 = new Product("abc", "Ciabatte", coloriCiabatte, "Ciabatte belle", 45, "Ciccio&Co");
const prodotto = document.querySelector("#prodotto");
var listaProdotti = [prodotto1, prodotto1, prodotto1, prodotto1];
for (let product of listaProdotti) {
    var card = prodotto === null || prodotto === void 0 ? void 0 : prodotto.cloneNode(true);
    var figliCard = (_a = card === null || card === void 0 ? void 0 : card.firstChild) === null || _a === void 0 ? void 0 : _a.childNodes;
    if (card === null || card === void 0 ? void 0 : card.hasChildNodes) {
        console.log(figliCard);
    }
}
