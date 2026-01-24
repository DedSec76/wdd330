import { renderListWithTemplate } from './utils.mjs'

// ProductList.mjs
function productCardTemplate(product, isDiscounted, discount) {
    return `<li class="product-card">
                <a href="/product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}"
                    alt="Image of ${product.Name}"/>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>

                ${isDiscounted ? `<span class="discount-badge">-${discount}%</span>` : ""}
                ${isDiscounted ? `<p class="product-card__price__suggest">$${product.SuggestedRetailPrice}</p>` : ""}
                
                <p class="product-card__price">$${product.ListPrice}</p>
                </a>
            </li>`
}

export default class ProductList {

    constructor (categoria, dataSource, listElement) {
        this.categoria = categoria
        this.dataSource = dataSource
        this.listElement = listElement
    }

    async init() {
        const list = await this.dataSource.getData(this.categoria);
        document.querySelector(".title").textContent = this.categoria

        if (!list || list.length === 0) {
            this.listElement.innerHTML = "<p>No results were found</p>"
            return;
        }
        this.renderList(list)
    }
    
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
