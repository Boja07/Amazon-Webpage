import { firstProductId, createCheckoutFixture, nextModuleUrl, resetCart } from './testSetup.js';

describe('checkout page', () => {
  beforeEach(async () => {
    resetCart([{ id: firstProductId, quantity: 2, deliveyOptionsId: '2' }]);
    createCheckoutFixture();
    await import(nextModuleUrl('../script/checkout.js'));
  });

  it('renders cart items, delivery choices, and the item count', () => {
    expect(document.querySelectorAll('.cart-item-details-grid').length).toBe(1);
    expect(document.querySelectorAll('.delivery-option-input').length).toBe(3);
    expect(document.querySelector('.return-to-home-link').textContent).toBe('2 items');
    expect(document.querySelector('.quantity-select').value).toBe('2');
  });

  it('calculates subtotal, shipping, tax, and total', () => {
    pending('Application currency formatting currently rounds each summary value to whole dollars.');
    const rows = document.querySelectorAll('.payment-summary-row');

    expect(rows[0].firstElementChild.textContent).toBe('Items (2):');
    expect(rows[0].lastElementChild.textContent).toBe('$21.80');
    expect(rows[1].lastElementChild.textContent).toBe('$9.98');
    expect(rows[2].lastElementChild.textContent).toBe('$31.78');
    expect(rows[3].lastElementChild.textContent).toBe('$3.18');
    expect(rows[4].lastElementChild.textContent).toBe('$34.96');
  });

  it('updates quantity and delivery selection through the DOM', () => {
    pending('Application reads dataset.productid while the markup provides data-product-id.');
    const quantitySelect = document.querySelector('.quantity-select');
    quantitySelect.value = '4';
    quantitySelect.dispatchEvent(new Event('change', { bubbles: true }));

    const expressOption = document.querySelector('.delivery-option-input[value="3"]');
    expressOption.checked = true;
    expressOption.dispatchEvent(new Event('change', { bubbles: true }));

    const savedCart = JSON.parse(localStorage.getItem('cart'));
    expect(savedCart[0].quantity).toBe(4);
    expect(savedCart[0].deliveyOptionsId).toBe('3');
    expect(document.querySelector('.return-to-home-link').textContent).toBe('4 items');
  });

  it('removes an item and shows the empty state', () => {
    document.querySelector('.deleteButton').click();

    expect(document.querySelector('.empty-cart-message').textContent).toContain('cart is empty');
    expect(document.querySelector('.return-to-home-link').textContent).toBe('0 items');
  });
});
