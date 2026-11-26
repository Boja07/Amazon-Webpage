class Cart {
  #cartItems = [];
   
  constructor(localStorageKey) {
  this.localStorageKey = localStorageKey;
  }

  loadFromStorage() {
    this.#cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
      {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveyOptionsId: '1'
      },
      {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveyOptionsId: '2'
      }
    ];
  }

  saveLocalStorage() {
    // FIX 1: Use `this.cartItems` instead of the old `cart` array
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.#cartItems));
  }

  addQuantity(pId, quantity = 1) {
    const quantityToAdd = Number(quantity);
    let matchingItem;
    
    // FIX 2: Use `this.cartItems.forEach` 
    this.#cartItems.forEach((item) => {
      if (pId === item.id) {
        matchingItem = item;
      }
    });
      
    if (matchingItem) {
      matchingItem.quantity += quantityToAdd;
    } else {
      // FIX 3: Use `this.cartItems.push`
      this.#cartItems.push({
        id: pId,
        quantity: quantityToAdd,
        deliveyOptionsId: '1'
      });
    }
    
    // FIX 4: Use `this.saveLocalStorage()` to call another method in the class
    this.saveLocalStorage();
  }

  removeCartProduct(productId) {
    const newCart = [];

    // FIX 5: Use `this.cartItems.forEach`
    this.#cartItems.forEach((product) => {
      if (product.id !== productId) {
        newCart.push(product);
      }
    });

    // FIX 6: Use `this.cartItems = newCart`
    this.#cartItems = newCart;
    
    // FIX 7: Use `this.saveLocalStorage()`
    this.saveLocalStorage();
  }

  get cartItems(){
    return this.#cartItems;
  }
}

// 8. Create the actual object (instance) from our blueprint (class)
export const cart = new Cart('cart');

// 9. Load the initial data
cart.loadFromStorage();
