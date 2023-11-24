//script
import { Product } from './classi.js';
import { OrderLineItem } from './classi.js';
import { Order } from './classi.js';

var listaOrdini: OrderLineItem[] = [];

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

  card.appendChild(checkbox);
  card.appendChild(productName);
  card.appendChild(variantSelect);
  card.appendChild(quantityInput);

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
  
  var modale = document.querySelector("#myModal");
  modale?.classList.remove("d-none");

  let backGrModale  = document.querySelector(".background-Modale");
  backGrModale?.classList.add("modalEE");
  
  var selectedProductsModal = document.querySelector("#selectedProductsModal");
  selectedProductsModal?.classList.remove("d-none");

  for (let prodottoSing of listaProdotti) {
    var rigaProdotto = document.createElement("div");

    var quantita = document.createElement("input");
    quantita.type = "number";
    quantita.value = prodottoSing.quantity.toString();
    quantita.min = "1";

    var nomeProdotto = document.createElement("span");
    nomeProdotto.textContent = prodottoSing.product.name;

    rigaProdotto.appendChild(nomeProdotto);
    rigaProdotto.appendChild(quantita);

    selectedProductsModal?.appendChild(rigaProdotto);
    console.log(prodottoSing);
  }



}

