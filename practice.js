// ----------- Grab Variables -------------

const menuContainer = document.querySelector("#menuContainer")
const drinkDisplay = document.querySelector("#drinkDisplay")
const cart = document.querySelector("#cart")
const customDrink = document.querySelector("#customDrink")
const allCoffeesUrl = "http://localhost:3000/coffee"
const customDrinkForm = document.querySelector("#customDrinkForm")
const body = document.querySelector("body")

// --------------- fetch request -----------

fetchDrinks()
function fetchDrinks() {
  return fetch(allCoffeesUrl)
    .then((response) => response.json())
    .then((drinkArray) => {
      drinkArray.forEach((drinkObj) => displayDrinks(drinkObj))
    })
}

//---------logic------>

function displayDrinks(drinkObj) {
  const drinkCard = document.createElement("div")
  drinkCard.className = "drinkCard"
  drinkCard.innerHTML = `
        <h2>${drinkObj.drink}</h2>
        <img src =${drinkObj.image}> 
        `
  if (!drinkObj.id || drinkObj.id > 5) {
    const customDrinkDeleteBtn = document.createElement("button")
    customDrinkDeleteBtn.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>`
    drinkCard.append(customDrinkDeleteBtn)
    customDrinkDeleteBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/coffee/${drinkObj.id}`, {
        method: "DELETE",
      })
      drinkCard.remove()
    })
  }
  drinkCard.addEventListener("click", () => createModalCard(drinkObj))
  menuContainer.append(drinkCard)
}

//-----------------------------------------

function createModalCard(drinkObj) {
  const modalCard = document.createElement("div")
  modalCard.className = "modalCard"
  modalCard.style.display = "grid"
  const coffeeName = document.createElement("p")
  const coffeePrice = document.createElement("p")
  const coffeeImage = document.createElement("img")
  const exitButton = document.createElement("button")

  coffeeName.className = "name"
  coffeePrice.className = "coffeePrice"

  coffeeName.textContent = drinkObj.drink
  coffeePrice.textContent = drinkObj.price
  coffeeImage.style.maxHeight = "200px"
  coffeeImage.src = drinkObj.image
  coffeeImage.className = "modalImage"

  exitButton.className = "closeModal"
  exitButton.innerHTML = `<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>`
  exitButton.addEventListener("click", () => {
    modalCard.style.display = "none"
    modalCard.remove()
  })

  modalCard.append(exitButton)
  modalCard.append(coffeeName)
  modalCard.append(coffeePrice)
  body.append(modalCard)

  createModalForm(modalCard)
  modalCard.append(coffeeImage)
}

//--------------------------------------------

function createModalForm(modalCard) {
  if (modalCard.id !== "customModalCard") {
    const modalForm = document.createElement("form")
    modalForm.innerHTML = `
            <label>Size</label>
            <select id="sizeSelector" name="size">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select> <br>

            <label>Flavors</label>
            <input name="flavor" placeholder = "What's your flavor" ></input> <br>
          <label>
            <input class = "modalFormSubmit" id = "submit" type="submit" value = "">
            <svg id = "cartIcon" stroke = "#008151" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z"/></svg>
            </input>
            </label>
            `

    modalForm.addEventListener("submit", addToCart)
    modalCard.append(modalForm)
  }
}

function addToCart(e) {
  const cartItem = document.createElement("p")
  let itemPrice = document.createElement("span")
  itemPrice.className = "itemPrice"
  let totalPrice = document.querySelector(".totalPrice")
  let totalPriceNum = parseFloat(totalPrice.textContent)

  if (e["type"] === "submit") {
    e.preventDefault()

    const { size, flavor } = e.target
    let coffeeChoiceObj = {
      size: size.value,
      flavor: flavor.value,
      price: e.target.parentNode.childNodes[2].textContent,
    }
    cartItem.innerHTML = `<br>1x ${coffeeChoiceObj.size} ${
      coffeeChoiceObj.flavor
    } ${
      e.target.parentNode.querySelector("p").textContent
    } $ <span class = "singlePrice">${coffeeChoiceObj.price}</span>`
    totalPriceNum += parseFloat(coffeeChoiceObj.price)
    totalPrice.textContent = totalPriceNum.toFixed(2)
  } else if (e["type"] === "click") {
    const customName = e.target.parentNode.childNodes[1].textContent

    itemPrice.textContent = e.target.parentNode.childNodes[2].textContent
    cartItem.innerHTML = `1x  ${customName} $ <span class = "singlePrice">${itemPrice.textContent} </span>`

    totalPriceNum += parseFloat(itemPrice.textContent)
    totalPrice.textContent = totalPriceNum
  }

  const deleteButton = document.createElement("button")

  e.target.parentNode.style.display = "none"

  deleteButton.textContent = "x"
  // `<svg class="cartDeleteButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="body_1" width="10" height="10">

  // <g transform="matrix(0.4166667 0 0 0.4166667 0 0)">
  //     <path d="M12 11.293L22.293 1L23 1.707L12.707 12L23 22.293L22.293 23L11.999999 12.707L1.7069988 23L0.9999988 22.293L11.292999 11.999999L0.99999905 1.7069988L1.7069991 0.9999988L11.999999 11.292999L12 11.293z" stroke="none" fill="#000000" fill-rule="nonzero" />
  // </g>
  // </svg>`
  deleteButton.addEventListener("click", (e) => {
    let singlePrice = e.target.parentNode.childNodes[2].textContent
    let singlePriceNum = parseFloat(singlePrice)
    let priceBeforeDeletionNum = parseFloat(totalPrice.textContent)
    let updatedTotal = priceBeforeDeletionNum - singlePriceNum
    totalPrice.textContent = updatedTotal
    cartItem.remove()
  })

  cartItem.append(deleteButton)
  document.querySelector(".cartItems").append(cartItem)
}
//when an item is added, grab the price and add it to the total cart price

customDrinkForm.addEventListener("submit", addToMenu)

function addToMenu(e) {
  e.preventDefault()

  let newDrinkObj = {
    drink: e.target.customDrink.value,
    price: "6.00",
    size: e.target.size.value,
    flavor: e.target.flavor.value,
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2016/04/latte-art-food-dye-mason-salisbury-6.jpg",
  }
  // --------POST REQUEST TO ADD NEW DRINKS TO MENU--------
  fetch(allCoffeesUrl, {
    method: "POST",
    body: JSON.stringify(newDrinkObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json())

  displayDrinks(newDrinkObj)
}

//-----------price calculator-------------

//Fetch Coffees✅
//render Images into menu container with names✅
//add click event to coffee cards that:✅
//render image, name, ✅
//exit button ✅

//render form to drink display ✅
//a form with editable size, flavor ✅
//also default values for coffee selected, size, flavor ✅
//price✅
//an add to cart button✅

//add to cart button will:✅
//add list item to cart container with:✅
//price that will update on bottom bar as drinks are added ✅
//name of drink✅
//delete button ✅

//--------//

//create a drink form with:✅
//default values for all inputs✅
//base drink✅
//flavor input✅
//size dropdown✅
//name input-will replace drink name when posted to db.json✅

//POST new custom drink✅
//Delete custom drink✅
//calculate price✅
//fix modalCard for new custom drink✅

//----TOMORROW----//
//fixing calculator✅
//one modal at a time
//one line at a time in cart✅
//keystrokes? for modal
//fix x in modal box✅
//style modal:blur, dropshadow
//fix modal card submit issue✅

//CLEANUP
//function breakup
//"your total is" after cartItem✅

// GREG QUESTIONS ------
// one modal at a time
