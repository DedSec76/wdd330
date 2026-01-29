import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter()

const order = new CheckoutProcess("so-cart", ".checkout__summary")
order.init()

// Add event listeners to fire calculateOrderTotal when the user
// changes the zip code
document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateTotal.bind(order))

// Listening for click on the button
const form = document.querySelector(".checkout__form")

document
    .querySelector("#checkoutSubmit")
    .addEventListener("click", e => {
        e.preventDefault()

        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }
        order.checkout()
    })
