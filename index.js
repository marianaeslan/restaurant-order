import { menuArray } from "./data.js"

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
                <button class="add-cart">+</button>
            </div>
            `
        });
    }
    return foodHtml
}

function renderFood() {
    document.getElementById("food-options").innerHTML = getFood(menuArray)
}

renderFood()