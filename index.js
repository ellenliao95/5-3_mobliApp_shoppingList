import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

/*store dataBace address (web: Firebase)
real world dataBace, When get the app like everyone can use it.*/
const appSettings = {
    databaseURL: "https://realtime-database-ec3a8-default-rtdb.firebaseio.com/"}
// connect dataBace & show items on the dataBase 
const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const soppingListInDB = ref(dataBase, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

// input and output items, when click btn empty inputBox and output item oon the browser
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(soppingListInDB, inputValue)

    clearInputValue()
})
// Run each array
onValue(soppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
    
        for(let i = 0; i < itemsArray.length; i++){
            let currantItem = itemsArray[i] // call ID & value
            let currantItemId = currantItem[0] // call ID
            let currantItemValue = currantItem[1] // call Value
    
            appendItemToSippingList(currantItem)
        }
    }else{
        shoppingList.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl(){
    shoppingList.innerHTML = ''
}

// empty inputBox
function clearInputValue(){
    inputFieldEl.value = ''
}

// output item on the browser
function appendItemToSippingList(item){
    let itemID = item[0]
    let itemValue = item[1]

    // following 3 code line are 替代 innerHTML
    let newEl = document.createElement("li")
    newEl.textContent = itemValue  // will show item or ID on the browser
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfStoryInDB = ref(dataBase,`shoppingList/${itemID}`)
        remove(exactLocationOfStoryInDB)
    })
    shoppingList.append(newEl)
}

