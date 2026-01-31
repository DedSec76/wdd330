import { renderListWithTemplate, renderWithTemplate } from './utils.mjs'

// ProductList.mjs
function productCardTemplate(product, isDiscounted, discount) {
    return `<li class="product-card">
                <button class="quickview">👁️</button>
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
        this.renderModal(list)
    }
    
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    renderModal(list) {
        const modal = document.querySelector(".modal")
        const quickview = document.querySelectorAll(".quickview")

        quickview.forEach((btn, i) => {
            btn.addEventListener("click", async () => {
                const product = await this.dataSource.findProductById(list[i].Id);
                
                modal.innerHTML= `<div class="modal__content">
                                    <h2>${product.Name}</h2>
                                    <img src=${product.Images.PrimaryLarge}
                                    alt="Image of ${product.Name}" />
                                    <p class="product-card__price">$${product.FinalPrice}</p>
                                    <p>${product.Colors[0].ColorName}</p>
                                    <p>${product.DescriptionHtmlSimple}</p>
                                    <button 
                                    popovertarget="details"
                                    popovertargetaction="toggle">Close</button>
                                 </div>
                                `
                modal.showPopover()
            })
        });
    }
}
