import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map(item => { 
    const isDiscounted = item.FinalPrice < item.SuggestedRetailPrice;
    
    const discount = isDiscounted 
    ? Math.round(((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100)  
    : 0;

    return cartItemTemplate(item, isDiscounted, discount)
  });

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  if (cartItems.length == 0) {
    document.querySelector(".product-list").innerHTML = `<p>The Cart is Empty</p>`
  }  
}

function cartItemTemplate(item, isDiscounted, discount) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>

  ${isDiscounted ? `<span class="discount-badge">-${discount}%</span>` : ""}
  ${isDiscounted ? `<p class="cart-card__price__suggest">$${item.SuggestedRetailPrice}</p>` : ""}
  
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
