"use strict";

const addNewItem = () => {
  const newItem = document.getElementById("new-item");
  const items = document.getElementById("items-list");
  const KEY_ENTER = 13;

  newItem.addEventListener("keypress", (event) => {
    //event.preventDefault();
    const itemText = newItem.value;

    if (event.keyCode === KEY_ENTER) {
      if (itemText === "") {
        alert("BUUUHHHH");
      }
      const itemElement = document.createElement("light");
      itemElement.appendChild(document.createTextNode(itemText));

      const liItemElement = document.createElement("li");
      liItemElement.appendChild(itemElement);
      liItemElement.classList.add("todo-items");
      liItemElement.style.marginTop = ".5rem";
      liItemElement.style.border = ".1rem solid red";
      items.appendChild(liItemElement);
    }
  });
};

addNewItem();
