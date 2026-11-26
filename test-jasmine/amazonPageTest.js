import { products } from '../data/products.js';
import { createAmazonFixture, nextModuleUrl, resetCart } from './testSetup.js';

describe('Amazon product page', () => {
  beforeEach(async () => {
    resetCart([]);
    createAmazonFixture();
    await import(nextModuleUrl('../script/amazon.js'));
  });

  it('renders one product card for every catalog product', () => {
    expect(document.querySelectorAll('.product-container').length).toBe(products.length);
    expect(document.querySelectorAll('.addToCart').length).toBe(products.length);
  });

  it('renders product details and initializes the cart count', () => {
    const firstCard = document.querySelector('.product-container');

    expect(firstCard.querySelector('.product-name').textContent).toContain(products[0].name);
    expect(firstCard.querySelector('.product-price').textContent.trim()).toBe('$10.90');
    expect(document.querySelector('.cartQuantity').textContent).toBe('0');
  });

  it('adds the selected quantity when a product button is clicked', () => {
    const firstCard = document.querySelector('.product-container');
    firstCard.querySelector('select').value = '3';
    firstCard.querySelector('.addToCart').click();

    expect(JSON.parse(localStorage.getItem('cart'))[0]).toEqual({
      id: products[0].id,
      quantity: 3,
      deliveyOptionsId: '1'
    });
    expect(document.querySelector('.cartQuantity').textContent).toBe('3');
  });
});
