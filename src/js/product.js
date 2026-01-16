import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam('product')
const dataSource = new ProductData("tents");

const tents = new ProductDetails(productId, dataSource)
tents.renderProductDetails(dataSource.findProductById(productId))

// add to cart button event handler
async function addToCartHandler(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    tents.addProductToCart(product);
}

// add listener to Add to Cart button
document.addEventListener("click", e => {
  if (e.target.classList.contains("addToCart")) {
    addToCartHandler(e)
  }
});

