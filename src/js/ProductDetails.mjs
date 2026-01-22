import { getLocalStorage, setLocalStorage } from "./utils.mjs"

const section = document.querySelector(".product-detail")
const template = document.querySelector(".tproduct-detail")

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId
        this.product = {}
        this.dataSource = dataSource
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId)
        this.renderProductDetails(this.product)
        
        document.addEventListener("click", e => {
            if (e.target.classList.contains("addToCart")){
                this.addProductToCart(this)
            }
        })
       
    }

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails(product) {
        const clone = template.content.cloneNode(true)
        const [brand, nameP, img, discount, price, color, descri, btn] = clone.querySelectorAll("h3, h2, img, p, p, p, p, button")

        brand.textContent = product.Brand.Name
        nameP.textContent = product.Name
        img.src = product.Images.PrimaryLarge
        img.alt = product.Name

        if(product.SuggestedRetailPrice > product.FinalPrice) {
            const suggest = document.createElement('span')
            const dis = product.SuggestedRetailPrice - product.FinalPrice

            suggest.classList.add("product-card__price__suggest")
            suggest.textContent = `$${product.SuggestedRetailPrice}`

            discount.appendChild(suggest)

            discount.append(` - $${Math.round(dis * 100) / 100}`)
        }

        price.textContent = `$${product.FinalPrice}`
        color.textContent = product.Colors[0].ColorName
        descri.innerHTML = `${product.DescriptionHtmlSimple}`
        btn.textContent = "Add to Cart"
        btn.classList.add("addToCart")
        btn.dataset.id = product.Id

        section.appendChild(clone)
    }
}






