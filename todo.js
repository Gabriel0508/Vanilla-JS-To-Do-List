"use strict";

const addNewItem = () => {
  const newItem = document.getElementById("new-item");
  const items = document.getElementById("items-list");
  const error = document.getElementById("error-text");
  const itemsToggle = document.getElementById("toggle-items");
  const countItems = document.getElementById("count-items");
  const completedItems = document.getElementById("completed-items");
  const KEY_ENTER = 13;

  newItem.addEventListener("keypress", (event) => {
    //event.preventDefault();

    //item value
    const itemText = newItem.value;

    //create the item text
    const itemElement = document.createTextNode(itemText);

    //created the li element of ul list
    const liItemsElement = document.createElement("li");

    //create the deleteBtn in li element
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");

    //create the div in li element
    const divItem = document.createElement("div");
    divItem.style.display = "flex";
    divItem.style.alignItems = "center";

    //create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "item-checked";
    checkbox.style.marginRight = "0.3rem";

    //check the enter key
    if (event.keyCode === KEY_ENTER) {
      if (itemText === "") {
        newItem.classList.add("input-error");
        error.style.display = "flex";
        error.innerHTML = "Kindly Enter Task Name!!!";
        return;
      } else {
        //TODO: use onchange event
        newItem.classList.remove("input-error");
        error.style.display = "none";
      }

      //create the item content
      divItem.appendChild(checkbox);
      divItem.appendChild(itemElement);
      liItemsElement.appendChild(divItem);
      liItemsElement.appendChild(deleteBtn);
      liItemsElement.classList.add("todo-items");
      liItemsElement.classList.add("li-item");
      items.prepend(liItemsElement);

      //reset the input value
      newItem.value = "";
    }

    let i = 0;
    let itemCount = 0;

    /**
     * Check if the checkbox is checked or not
     */
    checkbox.addEventListener("click", () => {
      if (checkbox.checked === true) {
        liItemsElement.style.textDecoration = "line-through";
        liItemsElement.style.color = "#777";
        completedItems.style.display = "flex";
        completedItems.innerHTML = "Clear completed items";
        while (items.getElementsByTagName("li")[i--]) {
          itemCount--;
        }
        //countItems.innerHTML = itemCount + " item left";
      } else {
        liItemsElement.style.textDecoration = "none";
        liItemsElement.style.color = "#30525B";
        completedItems.style.display = "none";
        completedItems.innerHTML = "";
      }
    });

    /**
     * Check the li elements in the ul list
     */
    if (items.getElementsByTagName("li").length > 0) {
      while (items.getElementsByTagName("li")[i++]) {
        itemCount++;
      }
      countItems.innerHTML = itemCount + " item left";
    }

    /**
     * Delete a todos item
     */
    deleteBtn.addEventListener("click", () => {
      liItemsElement.remove();
      countItems.innerHTML =
        items.getElementsByTagName("li").length + " item left";
    });

    /**
     * Delete completed items
     */
    completedItems.addEventListener("click", (item) => {//TODO: refatore because doesn't work
      let children = items.childNodes;
      for (let i = 0; i < children.length; i++) {
        if (children[i].firstChild.checked) {
          items.removeChild(children[i--]);
        }
      }
    });

    /**
     * Toggle all todos items
     */
    itemsToggle.addEventListener("click", () => {
      items.classList.toggle("d-none");
      //TODO: use another approach (doesn't work correctly)
      if (items.classList.contains("d-none")) {
        itemsToggle.innerHTML = '<i class="fas fa-angle-double-up"></i>';
      } else {
        itemsToggle.innerHTML = '<i class="fas fa-angle-double-down"></i>';
      }
    });
  });
};

addNewItem();
