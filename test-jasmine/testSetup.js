import { cart } from '../data/cart.js';

export const firstProductId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
export const secondProductId = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
let moduleRun = 0;

export function nextModuleUrl(path) {
  moduleRun += 1;
  return `${path}?jasmine=${moduleRun}`;
}

export function resetCart(items = []) {
  // FIX: cart is now an Object, not an array.
  // We save the new items to localStorage, then reload them into the cart object.
  localStorage.setItem('cart', JSON.stringify(items));
  cart.loadFromStorage();
}

export function createAmazonFixture() {
  document.querySelector('#jasmine-amazon-fixture')?.remove();
  document.body.insertAdjacentHTML('beforeend', `
    <main id="jasmine-amazon-fixture">
      <div class="product-display"></div>
      <div class="cartQuantity"></div>
    </main>
  `);
}

export function createCheckoutFixture() {
  document.querySelector('#jasmine-checkout-fixture')?.remove();
  document.body.insertAdjacentHTML('beforeend', `
    <section id="jasmine-checkout-fixture">
      <div class="checkout-header-middle-section">
      <a class="return-to-home-link"></a>
      </div>
      <div class="Summary"></div>
      <div class="payment-summary-row"><div></div><div></div></div>
      <div class="payment-summary-row"><div></div><div></div></div>
      <div class="payment-summary-row"><div></div><div></div></div>
      <div class="payment-summary-row"><div></div><div></div></div>
      <div class="payment-summary-row"><div></div><div></div></div>
    </section>
  `);
}
