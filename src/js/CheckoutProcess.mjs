import { getLocalStorage, getParam } from "./utils.mjs"

const subtotal_price = getParam("total")

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key
        this.outputSelector = outputSelector
        this.list = []
        this.itemTotal = parseFloat(subtotal_price)
        this.shipping = parseFloat(0)
        this.tax = parseFloat(0)
        this.orderTotal = parseFloat(0)
    }
    init() {
        this.list = getLocalStorage(this.key) || []

        this.showSummary()
    }
    showSummary() {
        const form = document.querySelector(".checkout__form")

        form.addEventListener("submit", e => { 
            e.preventDefault()
            if (!form.checkValidity()) {
                form.reportValidity()
            }
        })
        form.addEventListener("input", e => {
            if (!e.target.matches("input")) return

            if (form.checkValidity()) {
                this.calculateSubtotal()
            }  
        })
    }

    calculateSubtotal() {
        this.outputSelector.innerHTML = `
                                        <p>Subtotal: $${this.itemTotal.toFixed(2)}</p>
                                        <p>Number of Items: ${this.list.length}</p>
                                                
                                        `
        this.calculateTotal()          
    }
    calculateTotal() {
        // Calculate tax
        this.tax = this.itemTotal * .06

        // Calculate shipping
        // For first item $10, each additional item $2
        for (let i = 0; i < this.list.length; i++) {
            if(this.list[i] == this.list[0]) {
                this.shipping += 10
            } else {
                this.shipping += 2
            }
        }
        
        // Calculate order total
        this.orderTotal =  this.itemTotal + this.tax + this.shipping

        // display thge totals.
        this.displayOrderTotals()
    }
    displayOrderTotals() {
        
        this.outputSelector.innerHTML += `
                                        <p>Tax: $${this.tax.toFixed(2)}</p>
                                        <p>Shipping Amounts: $${this.shipping.toFixed(2)}</p>
                                        <p>Total to Pay: $${this.orderTotal.toFixed(2)}</p>
                                        `
    }
}