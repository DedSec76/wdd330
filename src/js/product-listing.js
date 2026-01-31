import ExternalServices from "./ExternalServices.mjs"
import ProductList from "./ProductList.mjs"
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter()

const dataSource = new ExternalServices();
const productListElement = document.querySelector(".product-list")

const category = getParam("category")

const list = new ProductList(category, dataSource, productListElement)
list.init()