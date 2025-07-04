import { menuArray } from "./data.js"

let cart = []
const paymentForm = document.getElementById('payment-form')
const userName = document.getElementById('input-name')

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const modalPayment = document.getElementById('payment-modal')
    modalPayment.style.display = 'none'
    document.getElementById('your-order').classList.add('hide')
    document.getElementById('order-confirmation').classList.remove('hide')
    document.getElementById('c-message').innerHTML = `<p>Thanks, ${userName.value}! Your order is on its way!</p>`
})

function openModal() {
    const modalPayment = document.getElementById('payment-modal')
    const orderBtn = document.getElementById('order-btn')
    orderBtn.addEventListener('click', function(){
        modalPayment.style.display = "flex"
    })
}

function closeModal() {
    const modalPayment = document.getElementById('payment-modal')
    const closeModalBtn = document.getElementById('close-modal-btn')
    closeModalBtn.addEventListener('click', function(){
        modalPayment.style.display = "none"
    })
}

document.addEventListener('click', function(e) {
    if (e.target.dataset.add){
        const foodId = parseInt(e.target.dataset.add)
        const foodItem = menuArray.filter((food) => {
            return food.id === foodId
        })[0]
        document.getElementById('your-order').classList.remove('hide')
        const existingCartItem = cart.find(item => item.foodItem.id === foodId)
        if (existingCartItem){
            existingCartItem.quantity++
        } else {
            cart.push({
                foodItem: foodItem,
                quantity: 1
            })
        }  
    } else if (e.target.dataset.remove){
        const foodId = parseInt(e.target.dataset.remove)
        const foodItem = menuArray.filter((food) => {
            return food.id === foodId
        })[0]

        const existingCartItem = cart.find(item => item.foodItem.id === foodId)
        if (existingCartItem){
            existingCartItem.quantity--
            if (existingCartItem.quantity === 0) {
                cart = cart.filter(item => item.foodItem.id !== foodId)
            }
        } 
    }
    renderFood()
})

function calcTotalPrice(cartArr) {
    let totalPrice = 0
    cartArr.forEach((item) => {
        totalPrice += item.foodItem.price * item.quantity
    })
    return totalPrice
}

function getCart(cartArr) {
    let cartHtml = ''
    let price = document.getElementById("total-price")
    price = calcTotalPrice(cartArr)
    
    cartArr.forEach((item) => {
        cartHtml += `
        <div class="order-wrap" id="order-wrap">
            <div class="order-item">
                <div class="order-title">
                    <p class="item-name">${item.foodItem.name}</p>
                    <a class="remove-item" data-remove=${item.foodItem.id}>remove</a>
                </div>
                <div class="order-specs">
                    <p class="item-price quant-order">x ${item.quantity}</p>
                    <p class="item-price">$ ${item.foodItem.price}</p>
                </div>
            </div>
        
        `
    })
    cartHtml += `
    <div class="total-order">
        <p class="item-name">Total price:</p>
        <p class="item-price" id="total-price">$${price}</p>
    </div> 
    `
    return cartHtml
}

function getFood(foodArr) {
    let foodHtml = ``
    if (foodArr.length > 0) {
        foodArr.forEach(function(food) {
            foodHtml += `
            <div class="order-option">
                <div class="option-details">
                    <p class="big-emoji">${food.emoji}</p>
                    <div class="option-info">
                        <h2 class="item-name">${food.name}</h2>
                        <p class="item-details">${food.ingredients.join(', ')}</p>
                        <p class="item-price">$${food.price}</p>
                    </div>
                </div>
                <button class="add-cart" data-add=${food.id}>+</button>
            </div>
            `
        });
    }
    return foodHtml
}

function renderFood() {
    document.getElementById("food-options").innerHTML = getFood(menuArray)
    document.getElementById("order-wrap").innerHTML = getCart(cart)
}

renderFood()
openModal()
closeModal()
