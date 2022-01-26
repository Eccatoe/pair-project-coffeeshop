// ----------- Grab Variables -------------
const menuContainer = document.querySelector("#menuContainer")
const drinkDisplay = document.querySelector("#drinkDisplay")
const cart = document.querySelector("#cart")
const customDrink = document.querySelector("#customDrink")
const url = "http://localhost:3000/coffee"

// --------------- fetch request -----------
fetchDrinks()
function fetchDrinks() {
  return fetch(url)
    .then((response) => response.json())
    .then((drinkArray) => displayDrinks(drinkArray))
}
// make a card for each coffee and append to menu?
function displayDrinks(drinkArray) {
  drinkArray.forEach((drinkObj) => {
    const drinkCard = document.createElement("div")
    drinkCard.className = "drinkCard"
    drinkCard.innerHTML = `
        <h2>${drinkObj.drink}</h2>
        <img src =${drinkObj.image} > 
        `

    drinkCard.addEventListener("click", () => {
      const modalCard = document.createElement("div")
      modalCard.className = "modalCard"

      const coffeeName = document.createElement("p")
      const coffeePrice = document.createElement("p")
      const coffeeImage = document.createElement("img")
      const exitButton = document.createElement("button")
      exitButton.className = "close-modal"
      exitButton.textContent = "x"
      exitButton.addEventListener("click", () => {
        modalCard.style.display = "none"
      })

      const modalForm = document.createElement("form")
      modalForm.innerHTML = `
            <label>Size</label>
            <select id="sizeSelector" name="size">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select> <br>

            <label>Flavors</label>
            <input name="flavor" placeholder = "What's your flavor" ></input>
            <input id = "submit" type="submit" value="Add to cart" />
            `

      modalForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const deleteButton = document.createElement("button")
        const cartItem = document.createElement("span")
        modalCard.style.display = "none"
        // document.style.classList.add("overlay")

        deleteButton.innerHTML = `<ion-icon name="close-outline"></ion-icon>`
        deleteButton.addEventListener("click", (e) => {
          cartItem.remove()
        })

        let coffeeChoiceObj = {
          size: e.target.size.value,
          flavor: e.target.flavor.value,
        }

        cartItem.textContent = `1x ${coffeeChoiceObj.size} ${coffeeChoiceObj.flavor} ${drinkObj.drink}`
        cartItem.append(deleteButton)
        cart.append(cartItem)
      })

      coffeeName.textContent = drinkObj.drink
      coffeePrice.textContent = drinkObj.price
      coffeeImage.style.maxHeight = "200px"
      coffeeImage.src = drinkObj.image
      modalCard.style.display = "block"

      modalCard.append(exitButton)
      modalCard.append(coffeeName)
      modalCard.append(coffeeImage)
      modalCard.append(coffeePrice)
      modalCard.append(modalForm)
      menuContainer.append(modalCard)
    })
    menuContainer.append(drinkCard)
  })
}
// ----------------- custom drink form ------------
customDrinkForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const deleteButton = document.createElement("button")
  const cartItem = document.createElement("span")
  const customDrinkImage = document.createElement("img")
  customDrinkImage.src =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.insider.com%2Fbest-latte-art-2018-10&psig=AOvVaw1BQdjTtbyduymWwhcRPUrD&ust=1643232089331000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKifyurqzfUCFQAAAAAdAAAAABAD"

  deleteButton.innerHTML = `<ion-icon name="close-outline"></ion-icon>`
  deleteButton.addEventListener("click", (e) => {
    cartItem.remove()
  })
  menuContainer.append()
})

// function render

//-----------event listeners-------------

//Fetch Coffees✅
//render Images into menu container with names✅
//add click event to coffee cards that:✅
//render image, name, ✅
//exit button ✅

//----TOMORROW----//

//render form to drink display ✅
//a form with editable size, flavor ✅
//also default values for coffee selected, size, flavor ✅
//price✅
//an add to cart button✅

//add to cart button will:✅
//add list item to cart container with:✅
//price that will update on bottom bar as drinks are added
//name of drink✅
//delete button ✅

//--------//

//create a drink form with:
//default values for all inputs
//base drink
//flavor input
//size dropdown
//name input-will replace drink name when posted to db.json

//STRETCH
//populate nav bar with filter option for coffee/tea
//add comment section (reviews for shop)
//add star rating?
//change CSS featues based on selected flavor
//reflect price when flavors and size are changed
// key functions for closing modal and/or entering form (enter keyboard to submit form)
//add amount dropdown to order form

//CLEANUP
//line break in cart
//function breakup
//"your total is" after cartItem
