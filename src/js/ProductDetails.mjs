import { getLocalStorage, setLocalStorage } from "./utils.mjs"

const section = document.querySelector(".product-detail")
const template = document.querySelector(".tproduct-detail")

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId
        this.product = {}
        this.dataSource = dataSource
    }

    addProductToCart(product) {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }

    async renderProductDetails(productId) {
        const product = await productId

        const clone = template.content.cloneNode(true)
        const [brand, nameP, img, price, color, descri, btn] = clone.querySelectorAll("h3, h2, img, p, p, p, button")

        brand.textContent = product.Brand.Name
        nameP.textContent = product.Name
        img.src = product.Image
        img.alt = product.Name

        price.textContent = `$ ${product.ListPrice}`
        color.textContent = product.Colors[0].ColorName
        descri.innerHTML = `${product.DescriptionHtmlSimple}`
        btn.textContent = "Add to Cart"
        btn.classList.add("addToCart")
        btn.dataset.id = product.Id

        section.appendChild(clone)
    }
}






