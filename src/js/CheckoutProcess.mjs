import ExternalServices from "./ExternalServices.mjs"
import { getLocalStorage, getParam, formDataToJSON, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs"

const services = new ExternalServices()

const subtotal_price = getParam("total")

function packageItems(items) {
    const cartItems = items.map(item => {
        let id = item.Id
        let name = item.Name
        let price = item.FinalPrice
        let quantity = 1

        return {id, name, price, quantity}
    })
    return cartItems
}

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
        this.calculateSubtotal()
    }

    calculateSubtotal() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal");
        
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items");

        itemNumElement.innerText = this.list.length;
        summaryElement.innerText = `$${this.itemTotal}`
    }
    calculateTotal() {
        // Calculate tax
        this.tax = this.itemTotal * .06

        // Calculate shipping
        // For first item $10, each additional item $2
        this.shipping = 10 + (this.list.length - 1) * 2
        
        // Calculate order total
        this.orderTotal =  this.itemTotal + this.tax + this.shipping

        // display thge totals.
        this.displayOrderTotals()
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"]
        const json = formDataToJSON(formElement)
        
        json.orderDate = new Date().toISOString()
        json.items = packageItems(this.list)
        json.orderTotal = this.orderTotal.toFixed(2)
        json.shipping = this.shipping
        json.tax = this.tax.toFixed(2)
        
        try {
            const responde = await services.checkout(json)
            console.log(responde)
            setLocalStorage("so-cart", [])
            location.assign("/checkout/success.html")
            
        } catch (err) {
            removeAllAlerts()
            for(const [key, value] of Object.entries(err.message)) {
                let alert = (key, value)
                alertMessage(alert, "fail")
            }
        }
    }
}

