import {Product} from './classi.js';

document.addEventListener('DOMContentLoaded', () => {

  const product1 = new Product('1', 'Prodotto 1', ['Variante A', 'Variante B'], 'Descrizione prodotto 1', 10, 'Retailer 1');
  const product2 = new Product('2', 'Prodotto 2', ['Variante X', 'Variante Y'], 'Descrizione prodotto 2', 20, 'Retailer 2');
  const product3 = new Product('3', 'Prodotto 3', ['Variante P', 'Variante Q'], 'Descrizione prodotto 3', 15, 'Retailer 3');

  const productsListDiv = document.getElementById('productsList');

  if (productsListDiv) {
    [product1, product2, product3].forEach(product => {
      const productCard = createProductCard(product);
      productsListDiv.appendChild(productCard);
    });
  } else {
    console.error("Elemento 'productsList' non trovato.");
  }
});

function createProductCard(product: Product): HTMLDivElement {
  const card = document.createElement('div');
  card.classList.add('product-card');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const productName = document.createElement('span');
  productName.textContent = product.name;

  const variantSelect = document.createElement('select');
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
      addToSelectedProducts(product);
    } else {
      removeFromSelectedProducts(product);
    }
  });

  return card;
}

function addToSelectedProducts(product: Product): void {
  const selectedProductsDiv = document.getElementById('selectedProducts');

  if (selectedProductsDiv) {
    const productItem = document.createElement('div');
    productItem.textContent = product.name;
    selectedProductsDiv.appendChild(productItem);
  } else {
    console.error("Elemento 'selectedProducts' non trovato.");
  }
}

function removeFromSelectedProducts(product: Product): void {
  const selectedProductsDiv = document.getElementById('selectedProducts');

  if (selectedProductsDiv) {
    const productItems = selectedProductsDiv.getElementsByTagName('div');

    for (const item of productItems) {
      if (item.textContent === product.name) {
        selectedProductsDiv.removeChild(item);
        break;
      }
    }
  } else {
    console.error("Elemento 'selectedProducts' non trovato.");
  }
}
