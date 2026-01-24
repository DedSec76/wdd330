import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs"
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter()

const dataSource = new ProductData();
const productListElement = document.querySelector(".product-list")

const category = getParam("category")

const list = new ProductList(category, dataSource, productListElement)

list.init()