import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs"

const product_list = document.querySelector(".product-list")

const dataSource = new ProductData("tents");

const productList = new ProductList("tents", dataSource, product_list)
productList.init()

