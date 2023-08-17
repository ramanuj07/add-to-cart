import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-01-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addButton.addEventListener("click", function() {
    let inputValue = inputField.value
    
    push(shoppingListInDB, inputValue)
    
    clearInput()
})

onValue(shoppingListInDB, function(snapshot) {    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        shoppingList.innerHTML = ""
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            appendItemToShoppingList(currentItem)
        } 
    } else {
        shoppingList.innerHTML = "No items in the list yet"
    }
})

function clearInput() {
    inputField.value = ""
}

function appendItemToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newElement = document.createElement("li")
    
    newElement.textContent = itemValue
    
    newElement.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingList.append(newElement)
}