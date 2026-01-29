// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = location.search
  const urlParams = new URLSearchParams(queryString)
  const product = urlParams.get(param)

  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position='afterbegin', clear=false) {
  const htmlStrings = list.map(item => {
      const isDiscounted = item.FinalPrice < item.SuggestedRetailPrice
      const porcentage = Math.round(((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100)

      const discount = isDiscounted ? porcentage : 0;

    return templateFn(item, isDiscounted, discount)
  })

  if (clear) {
    parentElement.innerHTML("");
  }
  
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''))
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template

  if(callback) {
    callback(data)
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path)
  const template = await res.text()
  return template
}  

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html")
  const headerElement = document.querySelector("#main-header")

  const footerTemplate = await loadTemplate("../partials/footer.html")
  const footerElement = document.querySelector("#main-footer")

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)

  updateCartBadge()
}

export function updateCartBadge() {
  const badge = qs(".quantity")
  if(!badge) return

  const cart = getLocalStorage("so-cart") || []
  badge.textContent = cart.length
}

export function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.FinalPrice, 0)
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function alertMessage(message, type, scroll=true) {
  // Create element to hold the alert
  const alert = document.createElement("div")

  // Add a class to style the alert
  alert.classList.add("alert")

  if(type) {
    alert.classList.toggle(type)
  }
  
  alert.innerHTML += ` `
  // set the contents. You should have a message 
  // and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p>
                     <p>X</p>
                     `
  // Add a listener to the alert to see 
  // if they clicked on the X.
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
    if(e.target.textContent == "X") {
      main.removeChild(this)
    }
  })

  // Add the alert to the top of main
  const main = document.querySelector('main')
  main.prepend(alert)
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll) {
    window.scrollTo(0,0)
  }
  setTimeout(function () {
    main.removeChild(alert);
  }, 3000)
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach(alert => document.querySelector("main").removeChild(alert))
}
