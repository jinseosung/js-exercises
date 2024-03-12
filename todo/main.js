"use strict";

const btnSubmit = document.querySelector(".btn-submit");
const btnReset = document.querySelector(".btn-reset");
const input = document.querySelector(".input");
const ul = document.querySelector(".lists");
const alertText = document.querySelector(".alert");

const TODOS_KEY = "todos";

let toDos = [];

const saveToDos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

const paintAlert = (action) => {
  switch (action) {
    case "delete":
      alertText.innerText = "Item Removed";
      alertText.style.backgroundColor = "red";
      break;
    case "reset":
      alertText.innerText = "Empty List";
      alertText.style.backgroundColor = "red";
      break;
    case "modify":
      alertText.innerText = "Value Changed";
      alertText.style.backgroundColor = "green";
      break;
    default:
      alertText.innerText = "Item Added To The List";
      alertText.style.backgroundColor = "green";
      break;
  }

  setTimeout(() => {
    alertText.innerText = "";
    alertText.style.backgroundColor = "transparent";
  }, 700);
};

const handleBtnSubmit = () => {
  btnSubmit.innerText = btnSubmit.innerText === "Submit" ? "Edit" : "Submit";
};

const deleteTodo = (e) => {
  e.preventDefault();
  const li = e.target.closest("li");
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  li.remove();
  paintAlert("delete");
  saveToDos();
};

const modifyTodo = (e) => {
  e.preventDefault();
  const li = e.target.closest("li");
  const span = li.querySelector(".todo");
  input.value = span.innerText;

  handleBtnSubmit();

  btnSubmit.removeEventListener("click", handleTodoSubmit);

  const handleModifySubmit = (e) => {
    e.preventDefault();
    const modifiedTodo = input.value;
    span.innerText = modifiedTodo;

    handleBtnSubmit();
    paintAlert("modify");
    input.value = "";

    toDos = toDos.map((todo) => {
      if (todo.id === parseInt(li.id)) {
        return {
          text: modifiedTodo,
          id: todo.id,
        };
      }
      return todo;
    });

    saveToDos();

    btnSubmit.addEventListener("click", handleTodoSubmit);

    btnSubmit.removeEventListener("click", handleModifySubmit);
  };

  btnSubmit.addEventListener("click", handleModifySubmit);
};

const paintTodo = (newTodoObj) => {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  li.classList.add("list");
  const span = document.createElement("span");
  span.classList.add("todo");
  span.innerText = newTodoObj.text;
  const btns = document.createElement("div");
  btns.classList.add("btns");
  const btnModify = document.createElement("button");
  btnModify.classList.add("btn", "btn-modify");
  btnModify.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn", "btn-delete");
  btnDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  btnDelete.addEventListener("click", deleteTodo);
  btnModify.addEventListener("click", modifyTodo);

  btns.appendChild(btnModify);
  btns.appendChild(btnDelete);
  li.appendChild(span);
  li.appendChild(btns);
  ul.appendChild(li);
};

const handleTodoSubmit = (e) => {
  e.preventDefault();
  const newTodo = input.value;
  if (newTodo === "" || toDos.find((todo) => todo.text === newTodo)) {
    return;
  }

  input.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  paintAlert("submit");
  saveToDos();
};

btnSubmit.addEventListener("click", handleTodoSubmit);
btnReset.addEventListener("click", (e) => {
  e.preventDefault();
  if (toDos.length <= 0) {
    return;
  }
  ul.innerHTML = "";
  toDos = [];
  saveToDos();
  paintAlert("reset");
});

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  toDos.forEach(paintTodo);
}
