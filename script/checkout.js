import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
import dayjs from "./dayjs.js";
import { deliveyOptions } from "../data/deliveyOptions.js";

const cartSummaryContainer = document.querySelector(".Summary");
const paymentSummaryRows = document.querySelectorAll(".payment-summary-row");

export function formatMoney(cents) {
  return `$${Math.round((cents / 100)).toFixed(2)}`;
}

function getProductById(productId) {
  return products.find((product) => product.id === productId) || null;
}

// We can remove saveCart() because we now have cart.saveLocalStorage() !

function getShippingOptionForItem(cartItem) {
  const selectedId = String(cartItem.deliveyOptionsId || deliveyOptions[0].id);
  return deliveyOptions.find((option) => option.id === selectedId) || deliveyOptions[0];
}

function renderHeaderCount() {
  const totalItems = cart.cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const headerLink = document.querySelector(".checkout-header-middle-section .return-to-home-link");

  if (headerLink) {
    headerLink.textContent = `${totalItems} item${totalItems === 1 ? "" : "s"}`;
  }
}

function renderPaymentSummary() {
  const itemCount = cart.cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const subtotalCents = cart.cartItems.reduce((sum, cartItem) => {
    const product = getProductById(cartItem.id);
    if (!product) return sum;
    return sum + product.priceCents * Number(cartItem.quantity || 0);
  }, 0);

  const shippingCents = cart.cartItems.reduce((sum, cartItem) => {
    const shippingOption = getShippingOptionForItem(cartItem);
    return sum + shippingOption.priceCents * Number(cartItem.quantity || 0);
  }, 0);

  const totalBeforeTaxCents = subtotalCents + shippingCents;
  const estimatedTaxCents = Math.round(totalBeforeTaxCents * 0.1);
  const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;

  const itemRow = paymentSummaryRows[0];
  const shippingRow = paymentSummaryRows[1];
  const subtotalRow = paymentSummaryRows[2];
  const taxRow = paymentSummaryRows[3];
  const totalRow = paymentSummaryRows[4];

  if (itemRow) {
    itemRow.firstElementChild.textContent = `Items (${itemCount}):`;
    itemRow.lastElementChild.textContent = formatMoney(subtotalCents);
  }

  if (shippingRow) {
    shippingRow.lastElementChild.textContent = formatMoney(shippingCents);
  }

  if (subtotalRow) {
    subtotalRow.lastElementChild.textContent = formatMoney(totalBeforeTaxCents);
  }

  if (taxRow) {
    taxRow.lastElementChild.textContent = formatMoney(estimatedTaxCents);
  }

  if (totalRow) {
    totalRow.lastElementChild.textContent = formatMoney(orderTotalCents);
  }
}

function renderCheckout() {
  if (!cartSummaryContainer) return;

  const validCartItems = cart.cartItems.filter((cartItem) => getProductById(cartItem.id));

  if (validCartItems.length === 0) {
    cartSummaryContainer.innerHTML = `
      <div class="empty-cart-message">
        Your cart is empty. Add items to continue.
      </div>
    `;
    renderHeaderCount();
    renderPaymentSummary();
    return;
  }

  const checkoutHtml = validCartItems
    .map((cartItem) => {
      const product = getProductById(cartItem.id);
      const selectedDeliveryId = String(cartItem.deliveyOptionsId || deliveyOptions[0].id);

      const deliveryOptionsHtml = deliveyOptions
        .map((deliveryOption) => {
          const deliveryDate = dayjs().add(deliveryOption.deliveryDays, "day").format("dddd, MMMM D");
          const priceText =
            deliveryOption.priceCents === 0
              ? "FREE Shipping"
              : `${formatMoney(deliveryOption.priceCents)} - Shipping`;

          return `
            <label class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${product.id}"
                value="${deliveryOption.id}"
                ${selectedDeliveryId === deliveryOption.id ? "checked" : ""}
                data-product-id="${product.id}"
              >
              <div>
                <div class="delivery-option-date">${deliveryDate}</div>
                <div class="delivery-option-price">${priceText}</div>
              </div>
            </label>
          `;
        })
        .join("");

      return `
        <div class="cart-item-container-${product.id}">
          <div class="delivery-date">
            Delivery date: ${dayjs().add(getShippingOptionForItem(cartItem).deliveryDays, "day").format("dddd, MMMM D")}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}" alt="${product.name}">

            <div class="cart-item-details">
              <div class="product-name">${product.name}</div>
              <div class="product-price">${formatMoney(product.priceCents)}</div>

              <div class="product-quantity">
                <span>
                  Quantity:
                  <select class="quantity-select" data-product-id="${product.id}">
                    ${Array.from({ length: 10 }, (_, index) => {
                      const value = index + 1;
                      return `<option value="${value}" ${Number(cartItem.quantity) === value ? "selected" : ""}>${value}</option>`;
                    }).join("")}
                  </select>
                </span>
                <span class="delete-quantity-link link-primary deleteButton" data-deleteProductId="${product.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              ${deliveryOptionsHtml}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  cartSummaryContainer.innerHTML = checkoutHtml;

  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.deleteproductid;
      cart.removeCartProduct(productId);
      renderCheckout();
    });
  });

  document.querySelectorAll(".quantity-select").forEach((select) => {
    select.addEventListener("change", (event) => {
      const productId = event.target.dataset.productid;
      const matchingCartItem = cart.cartItems.find((item) => item.id === productId);

      if (!matchingCartItem) return;

      matchingCartItem.quantity = Number(event.target.value);
      cart.saveLocalStorage();
      renderCheckout();
    });
  });

  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const productId = event.target.dataset.productId;
      const selectedOptionId = event.target.value;
      const matchingCartItem = cart.cartItems.find((item) => item.id === productId);

      if (!matchingCartItem) return;

      matchingCartItem.deliveyOptionsId = selectedOptionId;
      cart.saveLocalStorage();
      renderCheckout();
    });
  });

  renderHeaderCount();
  renderPaymentSummary();
}

renderCheckout();
