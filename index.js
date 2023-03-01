const DOM = {
    nameInput: null,
    priceInput: null,
    categoryInput: null,
    pictureInput: null,
}

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function init() {
    DOM.nameInput = document.querySelector("#productNameId");
    DOM.priceInput = document.querySelector("#priceId");
    DOM.categoryInput = document.querySelector("#categoryId");
    DOM.pictureInput = document.querySelector("#linkToPicture");
    DOM.ordersTableBody = document.querySelector("#ordersTable tbody");

    const addNewProductButton = document.querySelector("#addButton");
    addNewProductButton.addEventListener("click", addNewProductFn);

    const clearTableButton = document.querySelector("#clearTable");
    clearTableButton.addEventListener("click", deleteAll);

    draw(orders)
}

function addNewProductFn() {
    if (DOM.nameInput.value === "") {
        return alert("Please enter Product name!")
    } else if (DOM.priceInput.value === "") {
        return alert("Please enter Product price!")
    } else if (DOM.categoryInput.value === "") {
        return alert("Please choose a Category!")
    } else if (DOM.pictureInput.value === "") {
        return alert("Please enter a link to a picture!")
    }

    orders.push(new Order(DOM.nameInput.value, DOM.priceInput.value, DOM.categoryInput.value, DOM.pictureInput.value));
    localStorage.setItem("orders", JSON.stringify(orders));
    draw(orders);
    clearForm();
}

function clearForm() {
    DOM.nameInput.value = "";
    DOM.priceInput.value = "";
    DOM.categoryInput.value = "";
    DOM.pictureInput.value = "";
}

function clearTableFn() {
    DOM.ordersTableBody.innerHTML = "";
}

function deleteAll() {
    orders.splice(0)
    window.localStorage.setItem("orders", JSON.stringify(orders))
    draw(orders)
}

function addImage(imageLink, td) {
    const img = document.createElement("img");
    img.src = imageLink
    img.height = 50
    img.width = 80
    td.append(img)
}

function draw(ordersArray) {
    if (Array.isArray(ordersArray) === false) return
    clearTableFn()

    for (let index = 0; index < ordersArray.length; index++) {
        const currentProduct = ordersArray[index];

        const tableRow = document.createElement("tr")

        const tdProductName = document.createElement("td")
        tdProductName.innerText = currentProduct.name;

        const tdPrice = document.createElement("td")
        tdPrice.innerText = currentProduct.price;

        const tdCategory = document.createElement("td")
        tdCategory.innerText = currentProduct.category;

        const tdpicture = document.createElement("td")
        addImage(currentProduct.picture, tdpicture)
        
        const tdAction = document.createElement("td")

        const buttonDelete = document.createElement("button")
        buttonDelete.classList.add("btn", "btn-danger", "bi", "bi-trash")
        tdAction.append(buttonDelete)
        buttonDelete.addEventListener("click", function () {
            const indexToDelete = orders.findIndex(function (pr) {
                orders.splice(index, 1);
                draw(orders)
            });

            localStorage.setItem("orders", JSON.stringify(orders));
        })

        tableRow.append(tdProductName, tdPrice, tdCategory, tdpicture, tdAction);
        DOM.ordersTableBody.append(tableRow)
    }
}
init();