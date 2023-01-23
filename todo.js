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
    const liItemsElement = document.createElement("li");

    if (event.keyCode === KEY_ENTER) {
      if (itemText === "") {
        newItem.classList.add("input-error");
        error.style.display = "flex";
        return;
      } else {
        newItem.classList.remove("input-error");
        error.style.display = "none";
      }

      const itemElement = document.createTextNode(itemText);
      liItemsElement.appendChild(itemElement);
      //liItemsElement.classList.add("fa-solid-fa-xmark")
      liItemsElement.classList.add("todo-items");
      liItemsElement.classList.add("li-item");
      items.prepend(liItemsElement);
      newItem.value = "";
    }

    itemsToggle.addEventListener("click", () => {
        if (items !== "") {
          itemsToggle.classList.add("fa-angle-double-up");
          itemsToggle.classList.remove("fa-angle-double-down");
          items.classList.toggle("toggle-all");
        } else {
          itemsToggle.classList.remove("fa-angle-double-up");
          itemsToggle.classList.add("fa-angle-double-down");
        }
    });
  });
};
addNewItem();
