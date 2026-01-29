import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()

const navForm = document.querySelector(".nav-bar__form");
const inputForm = document.querySelector(".nav-bar__form__input")

if(navForm && inputForm) {

navForm.addEventListener("submit", e => {
    e.preventDefault()

    const text = inputForm.value.trim().toLowerCase();

    if(!text) {
        alert("Fill in the field to Search")
        return
    }
    window.location.href = `/product_listing/?category=${encodeURIComponent(text)}`
})

}
