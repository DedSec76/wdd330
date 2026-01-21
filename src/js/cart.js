import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter()

const list = document.querySelector(".product-list")
const shopCart = new ShoppingCart("tents", getLocalStorage("so-cart"), list)
shopCart.init()
