const form = document.querySelector(".js-toDo"),
    input = form.querySelector("input"),
    toDoBoard = document.querySelector(".js-toDoList");

const toDos_LS = "toDos";
const done_LS = "Done";

let toDos = [];
let done = [];

function saveToDos() {
    localStorage.setItem(toDos_LS, JSON.stringify(toDos));
}

function delToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoBoard.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos();
}

function doneToDos(event) {
    const chk = event.target;
    console.log(chk);
    const span = chk.parentNode.querySelector("span");
    const text = span.innerText;
    if (chk) {
        alert('Well Done!');
    }
}

function paintToDo(text) {
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const toDoList = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    toDoList.innerText = text;
    delBtn.innerText = "❌";
    li.appendChild(checkBox);
    li.appendChild(toDoList);
    li.appendChild(delBtn);
    li.id = newId;
    toDoBoard.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
    delBtn.addEventListener("click", delToDos);
    checkBox.addEventListener("click", doneToDos);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue);
    input.value = "";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(toDos_LS);
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos()
    form.addEventListener("submit", handleSubmit)
}

init()