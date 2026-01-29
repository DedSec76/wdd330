import { renderListWithTemplate, calculateTotal, setLocalStorage } from "./utils.mjs";

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
    constructor(dataSource, listElement) {
        this.dataSource = dataSource
        this.listElement = listElement
        this.divElement = document.querySelector(".cart-footer")
        this.totalElement = document.querySelector(".cart-total")
        this.formCheckout = document.querySelector("#checkout")
    }
    init() {
        const cart = this.dataSource || [];
        this.renderList(cart)
        
    }

    renderTotal(total) {
        this.totalElement.textContent = `Total: $${total.toFixed(2)}`
    }
    renderList(cart) {
        if (cart.length === 0) {
            this.listElement.innerHTML = `<p>The Cart is Empty</p>`
            this.renderTotal(0)
            return
        } 

        const total = calculateTotal(cart)
        this.renderTotal(total)
        this.divElement.classList.toggle("hide")
        this.divElement.classList.toggle("show")

        renderListWithTemplate(renderTemplate, this.listElement, cart)
        this.actionPay(cart, total)
    }
    actionPay(cart, total) {
        this.formCheckout.addEventListener("submit", e => {
            e.preventDefault()

            const params = new URLSearchParams({
                cart: JSON.stringify(cart)
            })
            const so_cart = params.toString()
            location.href = `/checkout/?${so_cart}&total=${total}`
        })
    }
}
