"use strict";

const addNewItem = () => {
  const newItem = document.getElementById("new-item");
  const items = document.getElementById("items-list");
  const error = document.getElementById("error-text");
  const itemsToggle = document.getElementById("toggle-items");
  const countItems = document.getElementById("count-items");
  const KEY_ENTER = 13;

  newItem.addEventListener("keypress", (event) => {
    //event.preventDefault();
    const itemText = newItem.value;
    const liItemsElement = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");

    if (event.keyCode === KEY_ENTER) {
      if (itemText === "") {
        newItem.classList.add("input-error");
        error.style.display = "flex";
        error.innerHTML = "Kindly Enter Task Name!!!";
        return;
      } else {//TODO: use onchange event
        newItem.classList.remove("input-error");
        error.style.display = "none";
      }

      const itemElement = document.createTextNode(itemText);
      liItemsElement.appendChild(itemElement);
      liItemsElement.appendChild(deleteBtn);
      liItemsElement.classList.add("todo-items");
      liItemsElement.classList.add("li-item");
      items.prepend(liItemsElement);
      newItem.value = "";
    }

    if (items.getElementsByTagName("li").length > 0) {
      countItems.style.display = "flex";
      countItems.innerHTML = items.getElementsByTagName("li").length + " item left";
    } else {
      countItems.style.display = "none";
    }

    //Delete a todos item
    deleteBtn.addEventListener("click", () => {
      liItemsElement.remove();
      countItems.innerHTML = items.getElementsByTagName("li").length + " item left";
    });

    //Toggle the todos items
    itemsToggle.addEventListener("click", () => {//TODO: another approach
      if (items.getElementsByTagName('li').length > 0) {
        itemsToggle.innerHTML = '<i class="fas fa-angle-double-up"></i>';
        items.classList.toggle("toggle-all");
      }
    });

    //Count the todos items
    // window.addEventListener("load", () => {
    //   itemsToggle.innerHTML = '<i class="fas fa-angle-double-up"></i>';
    // });
  });
};

addNewItem();
