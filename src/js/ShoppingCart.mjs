import { renderListWithTemplate } from "./utils.mjs";

// ShoppingCart.mjs
function renderTemplate (item, isDiscounted, discount) {
    return `<li class="cart-card divider">
                <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
                    <img src="${item.Images.PrimaryMedium}"
                     alt="${item.Name}" />
                </a>
                <a href="/product_pages/?product=${item.Id}">
                    <h2 class="card__name">${item.Name}</h2>
                </a>
                <p class="cart-card__color">${item.Colors[0].ColorName}</p>
                <p class="cart-card__quantity">qty: 1</p>

                ${isDiscounted ? `<span class="discount-badge">-${discount}%</span>` : ""}
                ${isDiscounted ? `<p class="cart-card__price__suggest">$${item.SuggestedRetailPrice}</p>` : ""}
                
                <p class="cart-card__price">$${item.FinalPrice}</p>
            </li>`
}

export default class ShoppingCart {
    constructor(category, dataSource, listElement) {
        this.category = category
        this.dataSource = dataSource
        this.listElement = listElement
    }
    init() {
        const cart = this.dataSource || [];
        this.renderList(cart)
    }
    renderList(cart) {
        renderListWithTemplate(renderTemplate, this.listElement, cart)

        if (cart.length == 0) {
            document.querySelector(".product-list").innerHTML = `<p>The Cart is Empty</p>`
        }
    }
}
