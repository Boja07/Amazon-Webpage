import { cart } from '../data/cart.js';
import { products,load } from '../data/products.js';

function renderProductGrid(){
      let productsHtml='';
      products.forEach((value)=>{
          productsHtml+=`
              <div class="product-container">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${value.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                      ${value.name}
                </div>

                <div class="product-rating-container">
                  <img class="product-rating-stars"
                    src="${value.getStarsUrl()}">
                  <div class="product-rating-count link-primary">
                      ${value.rating.count}
                  </div>
                </div>

                <div class="product-price">
                  ${value.getPrice()}
                </div>

                <div class="product-quantity-container">
                  <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div class="product-spacer">  ${value.extraInfoHTML()}</div>

                <div class="added-to-cart">
                  <img src="images/icons/checkmark.png">
                  Added
                </div>

                <button class="add-to-cart-button button-primary addToCart" data-productname="${value.id}">
                  Add to Cart
                </button>
              </div>`
      });
    document.querySelector('.product-display').innerHTML=productsHtml;

    const buttons = document.querySelectorAll('.addToCart');

    function updateQuantity(){
      // FIX: Access the inner array using `cart.cartItems`
      const totalQuantity = cart.cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
      document.querySelector('.cartQuantity').textContent = totalQuantity;
    }
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const pId = button.dataset.productname;
            const productContainer = button.closest('.product-container');
            const quantity = productContainer.querySelector('select').value;
            // FIX: Call the method ON the cart object
            cart.addQuantity(pId, quantity);
            updateQuantity();       
        });

    }); 
}
load(renderProductGrid);
