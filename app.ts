//script
import { Product, OrderLineItem, Order, Address, Customer } from './classi.js';

var listaOrdini: OrderLineItem[] = [];
var ordine: Order;
var contatoreDiOrdini: number = 0;
var indirizzoFatturazione: Address;
var indirizzoDiSpedizione: Address;
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
  } else {
    console.error("Elemento 'productsList' o 'selectedProducts' non trovato.");
  }
});

function createProductCard(product: Product, selectedProductsDiv: HTMLElement): HTMLDivElement {
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
  card.classList.add("border","border-secondary",);

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      const quantity = +quantityInput.value;
      addToSelectedProducts(product, quantity, selectedProductsDiv);
    } else {
      removeFromSelectedProducts(product, selectedProductsDiv);
    }
  });

  return card;
}

function addToSelectedProducts(product: Product, quantity: number, selectedProductsDiv: HTMLElement): void {
  const productItem = document.createElement('div');
  productItem.classList.add('selected-product-item');

  const quantitySpan = document.createElement('span');
  quantitySpan.textContent = `${quantity}x`;

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

function removeFromSelectedProducts(product: Product, selectedProductsDiv: HTMLElement): void {
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

function removeProductFromSelected(product: Product, productItem: HTMLDivElement, selectedProductsDiv: HTMLElement): void {
  selectedProductsDiv.removeChild(productItem);
}

function getSelectedVariant(product: Product): string {
  const variantSelect = document.getElementById(`variantSelect_${product.code}`) as HTMLSelectElement;

  if (variantSelect && variantSelect.options.length > 0) {
    const selectedOption = variantSelect.options[variantSelect.selectedIndex];
    return selectedOption.value;
  }

  return '';
}



document.querySelector("#nextButton")?.addEventListener("click", () => {
  aperturaModalePadre(listaOrdini);
});
function aperturaModalePadre(listaProdotti: OrderLineItem[]) {

  modale?.classList.remove("d-none");

  backGrModale?.classList.add("modalEE");

  selectedProductsModal?.classList.remove("d-none");

  for (let prodottoSing of listaProdotti) {
    var rigaProdotto = document.createElement("div");

    var quantita = document.createElement("input");
    quantita.type = "number";
    quantita.value = prodottoSing.quantity.toString();
    quantita.min = "1";
    quantita.id = prodottoSing.product.name.replace(/\s/g, '') + "_inputDue_id";

    var nomeProdotto = document.createElement("span");
    nomeProdotto.textContent = prodottoSing.product.name;

    rigaProdotto.appendChild(nomeProdotto);
    rigaProdotto.appendChild(quantita);

    selectedProductsModal?.appendChild(rigaProdotto);
  }
}
//event per aggiornare le quantità dal modal
document.querySelector("#nextModalButton")?.addEventListener("click", () => {
  for (let singOrd of listaOrdini) {
    let stringaIDInput = "#" + singOrd.product.name.replace(/\s/g, '') + "_inputDue_id";
    let inputNuovo = document.querySelector(stringaIDInput);
    singOrd.quantity = inputNuovo?.value;
  }
  nextToBilling();
});
function nextToBilling() {
  selectedProductsModal?.classList.add("d-none");
  billingAddress?.classList.remove("d-none");
}
//event per tornare al body
document.querySelector("#backModalButton")?.addEventListener("click", () => {
  backGrModale?.classList.remove("modalEE");
  modale?.classList.add("d-none");
});


//event per mettere lo stesso indirizzo a spedizione e fatturazione
document.querySelector("#stessiIndirizzi")?.addEventListener("click", () => {
  document.querySelector(".fatturazione")?.classList.toggle("d-none");

});
//event per proseguire al riepilogo
document.querySelector("#nextToRiepilogo")?.addEventListener("click", () => {
  document.querySelector("#billingAddress")?.classList.add("d-none");
  document.querySelector("#riepilogoOrdine")?.classList.remove("d-none");

  indirizzoDiSpedizione = new Address(
    document.querySelector("#streetSpedizione")?.value,
    document.querySelector("#citySpedizione")?.value,
    document.querySelector("#stateSpedizione")?.value,
    document.querySelector("#postalCodeSpedizione")?.value
  )
  if (!document.querySelector("#stessiIndirizzi")?.checked) {
    indirizzoFatturazione = new Address(
      document.querySelector("#streetFatturazione")?.value,
      document.querySelector("#cityFatturazione")?.value,
      document.querySelector("#stateFatturazione")?.value,
      document.querySelector("#postalCodeFatturazione")?.value
    )
  } else {
    indirizzoFatturazione = indirizzoDiSpedizione;
  }
  riepilogo();
});
function riepilogo() {
  let prezzoTotale: number = 0;
  for (let singOrdin of listaOrdini) {
    prezzoTotale += singOrdin.amount;
    let prodottoOrdinato = document.createElement("div");
    prodottoOrdinato.classList.add("border", "row");

    let nomeProdottoOrdine = document.createElement("div");
    nomeProdottoOrdine.classList.add("col-6");
    nomeProdottoOrdine.textContent = singOrdin.product.name;

    let prezzoTotaleProdottoOrdine = document.createElement("div");
    prezzoTotaleProdottoOrdine.classList.add("col-2");
    prezzoTotaleProdottoOrdine.textContent = (singOrdin.product.price * singOrdin.quantity).toString();

    let varianTotaleProdottoOrdine = document.createElement("div");
    varianTotaleProdottoOrdine.classList.add("col-2");
    varianTotaleProdottoOrdine.textContent = "da fare";

    let quantitaTotaleProdottoOrdine = document.createElement("div");
    quantitaTotaleProdottoOrdine.classList.add("col-2");
    quantitaTotaleProdottoOrdine.textContent = singOrdin.quantity.toString();

    prodottoOrdinato.appendChild(nomeProdottoOrdine);
    prodottoOrdinato.appendChild(prezzoTotaleProdottoOrdine);
    prodottoOrdinato.appendChild(varianTotaleProdottoOrdine);
    prodottoOrdinato.appendChild(quantitaTotaleProdottoOrdine);

    riepilogoOrdine?.appendChild(prodottoOrdinato);
  }
  ordine = new Order((contatoreDiOrdini += 1).toString(),
    new Date(Date.now()),
    prezzoTotale,
    listaOrdini);



  let spedizione = document.createElement("div");
  spedizione.classList.add("border", "row");

  let titoloSpedzione=document.createElement("h4");
  titoloSpedzione.textContent="Spedizione";
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

  riepilogoOrdine?.appendChild(spedizione);
}
