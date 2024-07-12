
const BASE_URL = "https://www.themealdb.com";
let rowData = document.getElementById("rowData");

function OpenNav(){
    $(".nav-tab").animate({ width:'100%'},500)
    $(".menu").removeClass("fa-bars");
    $(".menu").addClass("fa-x");

}
function CloseNav(){
    $(".nav-tab").animate({ width:'0'},500)
    $(".menu").removeClass("fa-x");
    $(".menu").addClass("fa-bars");

}

async function getCategories() {
    rowData.innerHTML = "";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/categories.php`);
    let data = await response.json();
    displayCategories(data.categories);
}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100 " src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
    }

    rowData.innerHTML = cartoona
}
async function getCategoryMeals() {
    rowData.innerHTML = "";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
 

}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
function displayMeals(arr) {
    
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
async function getArea() {
    rowData.innerHTML = "";
    let respone = await fetch(`${BASE_URL}/api/json/v1/1/list.php?a=list`);
    let data = await respone.json();
    displayArea(data.meals)
}


function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
async function getIngredients() {
    rowData.innerHTML = "";
    let respone = await fetch(`${BASE_URL}/api/json/v1/1/list.php?i=list`);
    let data = await respone.json();
    displayIngredients(data.meals.slice(0, 20));
}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
       <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
$(".categories").click(function(){
    getCategories();
    CloseNav();
});
$(".area").click(function(){
    getArea();
    CloseNav();
});
$(".Ingredients").click(function(){
    getIngredients();
    CloseNav();
});
$(".menu").on("click", function() {
    if ($(this).hasClass("fa-bars")) {
        OpenNav();
    }
    else{
        CloseNav();
    }
});
