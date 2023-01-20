"use strict";

const addNewItem = () => {
  const newItem = document.getElementById("new-item");
  const items = document.getElementById("items-list");
  const error = document.getElementById("error-text");
  const itemsToggle = document.getElementById("toggle-items");
  const KEY_ENTER = 13;

  newItem.addEventListener("keypress", (event) => {
    //event.preventDefault();
    const itemText = newItem.value;
    
    if (event.keyCode === KEY_ENTER) {
      if (itemText === "") {
        newItem.classList.add("input-error");
        error.style.display = "flex";
        return;
      }

      const itemElement = document.createElement("strong");
      itemElement.appendChild(document.createTextNode(itemText));

      const liItemElement = document.createElement("li");
      liItemElement.appendChild(itemElement);
      //liItemElement.classList.add("fa-xmark")
      liItemElement.classList.add("todo-items");
      liItemElement.classList.add("li-item");
      items.prepend(liItemElement);

      newItem.value = ""; 
    }
  });

  itemsToggle.addEventListener("click", () => {
    /**
     * TODO: toggle just when the list contains min. one li item
     */
    if (items !== 0) {
      itemsToggle.classList.add("fa-angle-double-up")
      itemsToggle.classList.remove("fa-angle-double-down")
      items.classList.toggle("toggle-all");
    }
  })

  //TODO: remove the error message on adding char in input
  newItem.addEventListener("change", (event) => {
    newItem.classList.remove("input-error");
    error.style.display = "none";
  })
};

addNewItem();
