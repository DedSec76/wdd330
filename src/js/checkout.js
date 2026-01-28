import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter()

const elementSummary = document.querySelector(".summary")
const checkoutProcess = new CheckoutProcess("so-cart", elementSummary)
checkoutProcess.init()