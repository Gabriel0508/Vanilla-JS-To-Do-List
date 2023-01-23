"use strict";

const addNewItem = () => {
  const newItem = document.getElementById("new-item");
  const items = document.getElementById("items-list");
  const error = document.getElementById("error-text");
  const itemsToggle = document.getElementById("toggle-items");
  const countItems = document.getElementsByClassName("todo-count");
  const KEY_ENTER = 13;

  newItem.addEventListener("keypress", (event) => {
    //event.preventDefault();
    const itemText = newItem.value;
    const liItemsElement = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");

    if (event.keyCode === KEY_ENTER) {
      if (itemText === "") {
        newItem.classList.add("input-error");
        error.style.display = "flex";
        error.innerHTML = "Add a item that needs to be done!";
        return;
      } else {
        newItem.classList.remove("input-error");
        error.style.display = "none";
      
      //  countItems.style.display = "flex";
      }

      const itemElement = document.createTextNode(itemText);
      liItemsElement.appendChild(itemElement);
      liItemsElement.appendChild(deleteBtn);
      liItemsElement.classList.add("todo-items");
      liItemsElement.classList.add("li-item");
      items.prepend(liItemsElement);
      newItem.value = "";
    }

    //Toggle the todos items
    itemsToggle.addEventListener("click", () => {
      if (items.contains(liItemsElement)) {
        items.classList.toggle("toggle-all");
      }
      return;
    });

    //Delete a todos item
    deleteBtn.addEventListener("click", () => {
      liItemsElement.remove();
    });

    //Count the todos items
    window.addEventListener("load", () => {
      countItems.innerText = liItemsElement.lang;
      console.log(countItems);
    });
  });
};

addNewItem();
