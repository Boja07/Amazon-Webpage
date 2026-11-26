import { cart } from '../data/cart.js';
import { firstProductId, resetCart, secondProductId } from './testSetup.js';

describe('cart', () => {
  beforeEach(() => {
    resetCart([]);
  });

  it('adds a new product with the default quantity and delivery option', () => {
    // FIX: Use cart.addQuantity() instead of addQuantity()
    cart.addQuantity(firstProductId);

    // FIX: Use cart.cartItems instead of cart directly
    expect(cart.cartItems).toEqual([{ id: firstProductId, quantity: 1, deliveyOptionsId: '1' }]);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart.cartItems);
  });

  it('adds numeric quantities to an existing product', () => {
    resetCart([{ id: firstProductId, quantity: 2, deliveyOptionsId: '2' }]);

    cart.addQuantity(firstProductId, '3');

    expect(cart.cartItems[0].quantity).toBe(5);
    expect(cart.cartItems[0].deliveyOptionsId).toBe('2');
  });

  it('keeps separate products separate', () => {
    cart.addQuantity(firstProductId, 2);
    cart.addQuantity(secondProductId, 4);

    // FIX: Use cart.cartItems.length and cart.cartItems.map
    expect(cart.cartItems.length).toBe(2);
    expect(cart.cartItems.map((item) => item.quantity)).toEqual([2, 4]);
  });

  it('removes only matching products and persists the result', () => {
    resetCart([
      { id: firstProductId, quantity: 2, deliveyOptionsId: '1' },
      { id: secondProductId, quantity: 1, deliveyOptionsId: '2' }
    ]);

    // FIX: Use cart.removeCartProduct() instead of removeCartProduct()
    cart.removeCartProduct(firstProductId);

    expect(cart.cartItems).toEqual([{ id: secondProductId, quantity: 1, deliveyOptionsId: '2' }]);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart.cartItems);
  });
});
