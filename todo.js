"use strict";
const KEY_ENTER = 13;

const todoComponent = () => {
  const todoComponents = document.querySelectorAll("[data-todo-app]");

  /**
   * Method to generate a unique id for each li element
   */
  const getId = (() => {
    let counter = 1;
    return () => {
      counter++;
      return counter;
    };
  })();

  const todoModule = {
    todos: [],

    /**
     * Method to add a new todo element
     * @param {string} title
     */
    addTodo(title) {
      const newTodo = {
        id: getId(),
        title: title,
        done: false,
      };
      this.todos.push(newTodo);
      this.emit("add", newTodo);
    },

    /**
     * Method to remove all completed todos elements
     */
    removeCompletedTodos() {
      for (const todo of this.todos) {
        if (todo.done) {
          this.removeTodo(todo.id);
        }
      }
    },

    /**
     * Method to remove a single todo element
     * @param {number} id
     */
    removeTodo(id) {
      for (const index in this.todos) {
        const todo = this.todos[index];
        if (todo.id === id) {
          this.todos.splice(index, 1);
          this.emit("remove", todo);
        }
      }
    },

    /**
     * Method to set a todo element as done
     * @param {number} id
     */
    completeTodo(id) {
      for (const todo of this.todos) {
        if (todo.id === id && todo.done === false) {
          todo.done = true;
          this.emit("changeTodo", todo);
        }
      }
    },
    /**
     * Method to set a todo element as not done
     * @param {number} id
     */
    unCompleteTodo(id) {
      for (const todo of this.todos) {
        if (todo.id === id && todo.done === true) {
          todo.done = false;
          this.emit("changeTodo", todo);
        }
      }
    },

    /**
     * Method to count the todos elements
     * @returns {number}
     */
    getTodoCount() {
      let todoCount = 0;
      for (const todo of this.todos) {
        if (todo.done === false) {
          todoCount++;
        }
      }
      return todoCount;
    },

    events: {},
    /**
     * Triggers an event. This function may be passed
     * any number of params, these will be passed 1:1 to the event
     * listener event listeners
     * @param {string} eventName
     * @param {*=} params
     */
    emit(eventName, param) {
      if (eventName in this.events) {
        for (const f of this.events[eventName]) {
          f(param);
        }
      }
    },

    /**
     * Registers an event listener for the event eventName
     * @param {string} eventName
     * @param {Function} cb
     */
    on(eventName, cb) {
      if (!(eventName in this.events)) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(cb);
    },
  };

  todoComponents.forEach((element) => {
    const newTodoElement = element.querySelector("[data-todo-new]");
    const todoList = element.querySelector("[data-todo-list]");
    const footer = element.querySelector("[data-todo-footer]");
    const todoCount = element.querySelector("[data-todo-count]");
    const clearCompleted = element.querySelector("[data-todo-completed]");

    /**
     * Delete all completed todos elements
     */
    clearCompleted.addEventListener("click", (e) => {
      todoModule.removeCompletedTodos();
    });

    /**
     * Add new todo
     */
    newTodoElement.addEventListener("keypress", (e) => {
      if (e.keyCode === KEY_ENTER && newTodoElement.value !== "") {
        const todoTitle = newTodoElement.value;
        if (todoTitle !== "") {
          todoModule.addTodo(todoTitle);
          newTodoElement.value = "";
        }
      }
    });

    /**
     * Show the new todo element in the list
     */
    todoModule.on("add", (todo) => {
      const newInputCheckbox = document.createElement("input");
      newInputCheckbox.type = "checkbox";
      newInputCheckbox.classList.add("toggle");

      newInputCheckbox.addEventListener("change", (e) => {
        const checkboxChecked = newInputCheckbox.checked;
        if (checkboxChecked) {
          todoModule.completeTodo(todo.id);
        } else {
          todoModule.unCompleteTodo(todo.id);
        }
      });

      const newLabelElement = document.createElement("label");
      newLabelElement.appendChild(
        document.createTextNode(newTodoElement.value)
      );

      const newButtonElement = document.createElement("button");
      newButtonElement.classList.add("destroy");

      newButtonElement.addEventListener("click", (e) => {
        todoModule.removeTodo(todo.id);
      });

      const newDivElement = document.createElement("div");
      newDivElement.classList.add("view");
      newDivElement.appendChild(newInputCheckbox);
      newDivElement.appendChild(newLabelElement);
      newDivElement.appendChild(newButtonElement);

      const newLiElement = document.createElement("li");
      newLiElement.setAttribute("data-id", todo.id);
      newLiElement.appendChild(newDivElement);

      todoList.prepend(newLiElement);
    });

    todoModule.on("remove", (todo) => {
      const liElement = todoList.querySelector("li[data-id='" + todo.id + "']");
      liElement.remove();
    });

    todoModule.on("changeTodo", (todo) => {
      const liElement = todoList.querySelector("li[data-id='" + todo.id + "']");
      if (todo.done) {
        liElement.classList.add("completed");
      } else {
        liElement.classList.remove("completed");
      }
    });

    const refreshFooter = () => {
      todoCount.innerText = todoModule.getTodoCount();
    };
    todoModule.on("add", refreshFooter);
    todoModule.on("remove", refreshFooter);
    todoModule.on("changeTodo", refreshFooter);
  });
};

todoComponent();
