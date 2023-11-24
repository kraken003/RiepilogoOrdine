//script
import { Product, OrderLineItem, Order, Address } from './classi.js';
var listaOrdini = [];
var ordine;
var contatoreDiOrdini = 0;
var indirizzoFatturazione;
var indirizzoDiSpedizione;
var selectedProductsModal = document.querySelector("#selectedProductsModal");
var billingAddress = document.querySelector("#billingAddress");
var riepilogoOrdine = document.querySelector("#riepilogoOrdine");
var modale = document.querySelector("#myModal");
let backGrModale = document.querySelector(".background-Modale");
document.addEventListener('DOMContentLoaded', () => {
    const product1 = new Product('1', 'Prodotto 1', ['Variante A', 'Variante B'], 'Descrizione prodotto 1', 10, 'Retailer 1');
    const product2 = new Product('2', 'Prodotto 2', ['Variante X', 'Variante Y'], 'Descrizione prodotto 2', 20, 'Retailer 2');
    const product3 = new Product('3', 'Prodotto 3', ['Variante P', 'Variante Q'], 'Descrizione prodotto 3', 15, 'Retailer 3');
    const productsListDiv = document.getElementById('productsList');
    const selectedProductsDiv = document.getElementById('selectedProducts');
    if (productsListDiv && selectedProductsDiv) {
        [product1, product2, product3].forEach(product => {
            const productCard = createProductCard(product, selectedProductsDiv);
            productsListDiv.appendChild(productCard);
        });
    }
    else {
        console.error("Elemento 'productsList' o 'selectedProducts' non trovato.");
    }
});
function createProductCard(product, selectedProductsDiv) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const productName = document.createElement('span');
    productName.textContent = product.name;
    const variantSelect = document.createElement('select');
    variantSelect.id = `variantSelect_${product.code}`; // Aggiungi un id univoco
    product.variants.forEach(variant => {
        const option = document.createElement('option');
        option.value = variant;
        option.textContent = variant;
        variantSelect.appendChild(option);
    });
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = '1';
    quantityInput.min = '1';
    quantityInput.classList.add("form-control");
    card.appendChild(checkbox);
    card.appendChild(productName);
    card.appendChild(variantSelect);
    card.appendChild(quantityInput);
    card.classList.add("border", "border-secondary");
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            const quantity = +quantityInput.value;
            addToSelectedProducts(product, quantity, selectedProductsDiv);
        }
        else {
            /*  removeFromSelectedProducts(product, selectedProductsDiv); */
        }
    });
    return card;
}
function addToSelectedProducts(product, quantity, selectedProductsDiv) {
    var _a, _b, _c, _d, _e, _f;
    var isThere = false;
    if (listaOrdini.length > 0) {
        for (let prodottoSingolo of listaOrdini) {
            if (prodottoSingolo.product.code != product.code) {
                isThere = true;
            }
        }
    }
    else {
        isThere = true;
    }
    if (isThere) {
        const productItem = document.createElement('div');
        productItem.classList.add('selected-product-item');
        const quantitySpan = document.createElement('span');
        quantitySpan.id = `id_Quantity_${product.code}`;
        quantitySpan.textContent = `${quantity}x `;
        const productInfoSpan = document.createElement('span');
        productInfoSpan.textContent = `${product.name} - ${getSelectedVariant(product)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            removeProductFromSelected(product, productItem, selectedProductsDiv);
        });
        productItem.appendChild(quantitySpan);
        productItem.appendChild(productInfoSpan);
        productItem.appendChild(removeButton);
        var ordineSingolo = new OrderLineItem(product.code, product, product.price, quantity);
        listaOrdini.push(ordineSingolo);
        selectedProductsDiv.appendChild(productItem);
    }
    else {
        for (let prodottoSingolo of listaOrdini) {
            prodottoSingolo.quantity += quantity;
            (_a = document.querySelector(`#id_Quantity_${product.code}`)) === null || _a === void 0 ? void 0 : _a.textContent = prodottoSingolo.quantity + "x ";
            console.log(prodottoSingolo.quantity);
        }
    }
    function removeFromSelectedProducts(product, selectedProductsDiv) {
        const productItems = selectedProductsDiv.getElementsByClassName('selected-product-item');
        for (const item of productItems) {
            const quantitySpan = item.querySelector('span');
            if (quantitySpan && quantitySpan.textContent && quantitySpan.textContent.includes(product.name)) {
                selectedProductsDiv.removeChild(item);
                for (let ind = 0; ind < listaOrdini.length; ind++) {
                    if (listaOrdini[ind].product.name == product.name) {
                        listaOrdini.splice(ind, 1);
                    }
                }
                break;
            }
        }
    }
    function removeProductFromSelected(product, productItem, selectedProductsDiv) {
        selectedProductsDiv.removeChild(productItem);
    }
    function getSelectedVariant(product) {
        const variantSelect = document.getElementById(`variantSelect_${product.code}`);
        if (variantSelect && variantSelect.options.length > 0) {
            const selectedOption = variantSelect.options[variantSelect.selectedIndex];
            return selectedOption.value;
        }
        return '';
    }
    (_b = document.querySelector("#nextButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        aperturaModalePadre(listaOrdini);
    });
    function aperturaModalePadre(listaProdotti) {
        var _a;
        modale === null || modale === void 0 ? void 0 : modale.classList.remove("d-none");
        backGrModale === null || backGrModale === void 0 ? void 0 : backGrModale.classList.add("modalEE");
        selectedProductsModal === null || selectedProductsModal === void 0 ? void 0 : selectedProductsModal.classList.remove("d-none");
        for (let prodottoSing of listaProdotti) {
            var rigaProdotto = document.createElement("div");
            var quantita = document.createElement("input");
            quantita.type = "number";
            quantita.value = prodottoSing.quantity.toString();
            quantita.min = "1";
            quantita.id = prodottoSing.product.name.replace(/\s/g, '') + "_inputDue_id";
            var nomeProdotto = document.createElement("span");
            nomeProdotto.textContent = prodottoSing.product.name;
            var varianteProdotto = document.createElement("span");
            varianteProdotto.textContent = (_a = document.querySelector(`#variantSelect_${prodottoSing.product.code}`)) === null || _a === void 0 ? void 0 : _a.value;
            rigaProdotto.appendChild(nomeProdotto);
            rigaProdotto.appendChild(varianteProdotto);
            rigaProdotto.appendChild(quantita);
            selectedProductsModal === null || selectedProductsModal === void 0 ? void 0 : selectedProductsModal.appendChild(rigaProdotto);
        }
    }
    //event per aggiornare le quantità dal modal
    (_c = document.querySelector("#nextModalButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        for (let singOrd of listaOrdini) {
            let stringaIDInput = "#" + singOrd.product.name.replace(/\s/g, '') + "_inputDue_id";
            let inputNuovo = document.querySelector(stringaIDInput);
            singOrd.quantity = inputNuovo === null || inputNuovo === void 0 ? void 0 : inputNuovo.value;
        }
        nextToBilling();
    });
    function nextToBilling() {
        selectedProductsModal === null || selectedProductsModal === void 0 ? void 0 : selectedProductsModal.classList.add("d-none");
        billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.classList.remove("d-none");
    }
    //event per tornare al body
    (_d = document.querySelector("#backModalButton")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        backGrModale === null || backGrModale === void 0 ? void 0 : backGrModale.classList.remove("modalEE");
        modale === null || modale === void 0 ? void 0 : modale.classList.add("d-none");
    });
    //event per mettere lo stesso indirizzo a spedizione e fatturazione
    (_e = document.querySelector("#stessiIndirizzi")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
        var _a;
        (_a = document.querySelector(".fatturazione")) === null || _a === void 0 ? void 0 : _a.classList.toggle("d-none");
    });
    //event per proseguire al riepilogo
    (_f = document.querySelector("#nextToRiepilogo")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        (_a = document.querySelector("#billingAddress")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
        (_b = document.querySelector("#riepilogoOrdine")) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
        indirizzoDiSpedizione = new Address((_c = document.querySelector("#streetSpedizione")) === null || _c === void 0 ? void 0 : _c.value, (_d = document.querySelector("#citySpedizione")) === null || _d === void 0 ? void 0 : _d.value, (_e = document.querySelector("#stateSpedizione")) === null || _e === void 0 ? void 0 : _e.value, (_f = document.querySelector("#postalCodeSpedizione")) === null || _f === void 0 ? void 0 : _f.value);
        if (!((_g = document.querySelector("#stessiIndirizzi")) === null || _g === void 0 ? void 0 : _g.checked)) {
            indirizzoFatturazione = new Address((_h = document.querySelector("#streetFatturazione")) === null || _h === void 0 ? void 0 : _h.value, (_j = document.querySelector("#cityFatturazione")) === null || _j === void 0 ? void 0 : _j.value, (_k = document.querySelector("#stateFatturazione")) === null || _k === void 0 ? void 0 : _k.value, (_l = document.querySelector("#postalCodeFatturazione")) === null || _l === void 0 ? void 0 : _l.value);
        }
        else {
            indirizzoFatturazione = indirizzoDiSpedizione;
        }
        riepilogo();
    });
    function riepilogo() {
        var _a;
        let prezzoTotale = 0;
        for (let singOrdin of listaOrdini) {
            prezzoTotale += singOrdin.amount;
            let prodottoOrdinato = document.createElement("div");
            prodottoOrdinato.classList.add("border", "row");
            let nomeProdottoOrdine = document.createElement("div");
            nomeProdottoOrdine.classList.add("col-5");
            nomeProdottoOrdine.textContent = singOrdin.product.name;
            let prezzoTotaleProdottoOrdine = document.createElement("div");
            prezzoTotaleProdottoOrdine.classList.add("col-2");
            prezzoTotaleProdottoOrdine.textContent = (singOrdin.product.price * singOrdin.quantity).toString();
            let varianTotaleProdottoOrdine = document.createElement("div");
            varianTotaleProdottoOrdine.classList.add("col-3");
            varianTotaleProdottoOrdine.textContent = (_a = document.querySelector(`#variantSelect_${singOrdin.product.code}`)) === null || _a === void 0 ? void 0 : _a.value;
            ;
            let quantitaTotaleProdottoOrdine = document.createElement("div");
            quantitaTotaleProdottoOrdine.classList.add("col-2");
            quantitaTotaleProdottoOrdine.textContent = singOrdin.quantity.toString();
            prodottoOrdinato.appendChild(nomeProdottoOrdine);
            prodottoOrdinato.appendChild(prezzoTotaleProdottoOrdine);
            prodottoOrdinato.appendChild(varianTotaleProdottoOrdine);
            prodottoOrdinato.appendChild(quantitaTotaleProdottoOrdine);
            riepilogoOrdine === null || riepilogoOrdine === void 0 ? void 0 : riepilogoOrdine.appendChild(prodottoOrdinato);
        }
        ordine = new Order((contatoreDiOrdini += 1).toString(), new Date(Date.now()), prezzoTotale, listaOrdini);
        let spedizione = document.createElement("div");
        spedizione.classList.add("border", "row");
        let titoloSpedzione = document.createElement("h4");
        titoloSpedzione.textContent = "Spedizione";
        spedizione.appendChild(titoloSpedzione);
        let citta = document.createElement("span");
        citta.textContent = indirizzoDiSpedizione.city;
        spedizione.appendChild(citta);
        let postalCode = document.createElement("span");
        postalCode.textContent = indirizzoDiSpedizione.postalCode;
        spedizione.appendChild(postalCode);
        let state = document.createElement("span");
        state.textContent = indirizzoDiSpedizione.state;
        spedizione.appendChild(state);
        let street = document.createElement("span");
        street.textContent = indirizzoDiSpedizione.street;
        spedizione.appendChild(street);
        riepilogoOrdine === null || riepilogoOrdine === void 0 ? void 0 : riepilogoOrdine.appendChild(spedizione);
    }
}
