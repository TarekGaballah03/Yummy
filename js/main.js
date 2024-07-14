const BASE_URL = "https://www.themealdb.com";
let rowData = document.getElementById("rowData");
let submitBtn;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

for(let i=0;i<18;i++){
    getdefaultSection();
    }
function OpenNav(){
    $(".nav-tab").animate({ width:'100%'},500);
    $(".menu").removeClass("fa-bars").addClass("fa-x");
    showListAnimation();
}
function CloseNav(){
    $(".nav-tab").animate({ width:'0'},500)
    $(".menu").removeClass("fa-x").addClass("fa-bars");
    hideListAnimation();
}
function showListAnimation() {
    $(".links .list-unstyled li").each(function(index) {
      $(this).css({
        position: "relative",top: "20px",opacity: "0"}).animate({ top: "0",opacity: "1"
      }, 500, "swing", function() {
        if (index === $(".links .list-unstyled li").length - 1) {
        }
      });
    });
  }
  function hideListAnimation() {
    $(".links .list-unstyled li").each(function(index) {
      $(this).css({
        position: "relative",
        top: "0",
        opacity: "1"
      }).animate({
        top: "20px",
        opacity: "0"
      }, 500, "swing", function() {
        if (index === $(".links .list-unstyled li").length - 1) {
        }
      });
    });
  }
  
async function getdefaultSection() {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/random.php`);
    let data = await response.json();
    displaydefaultSection(data.meals);
    $(".inner-loading-screen").fadeOut(300);
}
    
function displaydefaultSection(arr) {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
        string += `
         <div class="col-md-3 gy-2 ">
            <div  class="meal position-relative overflow-hidden rounded-2 pointer">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex flex-column align-items-center justify-content-center text-black  p-2">
                    <h3 class="text-center">${arr[i].strMeal}</h3>
                    <button onclick="getMealDetails(${arr[i].idMeal})" class="btn btn bg-success ps-3 pe-3">More Details:</button>

                </div>
            </div>
    </div>
            `;
        }
        rowData.innerHTML += string;
}
async function getCategories() {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/categories.php`);
    let data = await response.json();
    displayCategories(data.categories);
    $(".inner-loading-screen").fadeOut(300);
}

function displayCategories(arr) {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
        string += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100 " src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,18).join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
    }
    rowData.innerHTML = string;
}
async function getMealDetails(mealID) {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    CloseNav();
    let respone = await fetch(`${BASE_URL}/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await respone.json();
    displayMealDetails(data.meals[0]);
    $(".inner-loading-screen").fadeOut(300);
}
function displayMealDetails(meal) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")

    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let string = `
    <div class="col-md-4 col-6"">
                <img class="w-100 rounded-3 pt-2" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-center">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 col-6">
                <h2 class="text-danger">Instructions:</h2>
                <p>${meal.strInstructions}</p>
                <h3 class="text-danger">Area :<span class="text-light fs-5 fw-bolder"> ${meal.strArea} </span></h3>
                <h3 class="text-danger">Category :<span class="fw-bolder text-light fs-5"> ${meal.strCategory} </span></h3>
                <h3 class="text-danger">Recipes :</h3>
                <ul class="list-unstyled d-flex  flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex  flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-outline-success pe-3 ps-3 rounded-3">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-outline-danger pe-3 ps-3 rounded-3">Youtube</a>
            </div>`

    rowData.innerHTML = string;
}
async function getCategoryMeals() {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
function displayMeals(arr) {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
        string += `
        <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex flex-column justify-content-center  align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                        <button onclick="getMealDetails('${arr[i].idMeal}')" class="btn btn bg-success ps-3 pe-3">More Details:</button>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = string;
}
async function getArea() {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    let respone = await fetch(`${BASE_URL}/api/json/v1/1/list.php?a=list`);
    let data = await respone.json();
    displayArea(data.meals)
    $(".inner-loading-screen").fadeOut(300);
}
function displayArea(arr) {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
        string += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = string;
}
async function getIngredients() {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    let respone = await fetch(`${BASE_URL}/api/json/v1/1/list.php?i=list`);
    let data = await respone.json();
    displayIngredients(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
function displayIngredients(arr) {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
        string += `
       <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = string;
}
async function getCategoryMeals(category) {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
async function getAreaMeals(area) {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
async function getIngredientsMeals(ingredients) {
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";
    searchContainer.innerHTML="";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/filter.php?i=${ingredients}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    CloseNav();
    rowData.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let data= await response.json();
    data.meals ? displayMeals(data.meals) : displayMeals([])
}

async function searchByFLetter(term) {
    CloseNav();
    term == "" ? term = "a" : "";
    let response = await fetch(`${BASE_URL}/api/json/v1/1/search.php?f=${term}`)
    let data= await response.json();
    data.meals ? displayMeals(data.meals) : displayMeals([])
}
function showContacts() {
    searchContainer.innerHTML="";
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
    $("#submitBtn").click(function(){
        $("#box").removeClass("d-none").addClass("d-flex");
           reset();
       });
    $("#close").click(function(){
        $("#box").removeClass("d-flex").addClass("d-none");
        submitBtn.setAttribute("disabled", true);
       });
}
function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled");

    } else {
        submitBtn.setAttribute("disabled", true);
    }
    
}
function reset() {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    ageInput.value = "";
    passwordInput.value = "";
    repasswordInput.value = "";
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

$(".menu").on("click", function() {
    if ($(this).hasClass("fa-bars")) {
        OpenNav();
    }
    else{
        CloseNav();
    }
});

$(".search").click(function(){
    showSearchInputs();
    CloseNav();
});
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
$(".contact").click(function(){
    showContacts();
    CloseNav();
});

