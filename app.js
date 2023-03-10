// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(
  ".grocery-container"
);
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";
// ****** EVENT LISTENERS **********

//submit form
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement("article");

    //add class
    element.classList.add("grocery-item");

    // add ID
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>`;

    const deletebtn = element.querySelector(".delete-btn");
    const editbtn = element.querySelector(".edit-btn");
    deletebtn.addEventListener("click", deleteItemFunction);
    editbtn.addEventListener("click", editItemFunction);
    //append child

    list.appendChild(element);

    //display alert
    displayAlert("item added to the list", "success");

    //show container
    container.classList.add("show-container");

    // add to local storage
    addToLocalStorage(id, value);

    //set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("item edited", "success");
    //editlocalStorage(editId, value)
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//clear all items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("list cleared", "danger");
  setBackToDefault();
  // localStorage.removeItem('list')
}
//delete function
function deleteItemFunction(e) {
  const element =
    e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  //remove from local storage
  // removeFromLocalStorage(id)
}
//edit function
function editItemFunction(e) {
  const element =
    e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement =
    e.currentTarget.parentElement.previousElementSibling;
  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = "element.dataset.id";
  submitBtn.textContent = "edit";
}
// edit;
//set backToDefault
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  console.log("added to local storage");
}
function removeFromLocalStorage(id) {
  console.log("item removed from local storage");
}

function editlocalStorage(id, value) {}

// localStorage.setItem(
//   "orange",
//   JSON.stringify(["item", "item2"])
// );
// const oranges = JSON.parse(localStorage.getItem("orange"));
// console.log(oranges);
// localStorage.removeItem("orange");
// ****** SETUP ITEMS **********
