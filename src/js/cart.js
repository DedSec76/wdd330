import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const so_cart = getLocalStorage("so-cart");
const list = document.querySelector(".product-list");

const shopCart = new ShoppingCart(so_cart, list);
shopCart.init();
