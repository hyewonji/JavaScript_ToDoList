const form = document.querySelector(".js-toDo"),
    input = form.querySelector("input"),
    toDoBoard = document.querySelector(".js-toDoList");

const toDos_LS = "toDos"

let toDos = [];
const onGoing = [];
const done = [];

function saveToDos() {
    localStorage.setItem(toDos_LS, JSON.stringify(toDos))
}

function saveOnGoing() {
    localStorage.setItem(onGoing_LS, JSON.stringify(OnGoing))
}

function delToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    console.log(li);
    toDoBoard.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    return li;
}

function onGoingToDos(event) {
    const tmp = delToDos(event);
    const btn = event.target;
    const li = btn.parentNode.querySelector("span");
    const span = li.innerText
    paintOnGoing(span);
    delToDos(event);
}

function paintOnGoing(text) {
    const li = document.createElement("li");
    const toDoList = document.createElement("span");
    const delBtn = document.createElement("button");
    const onGoingBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const newId = toDos.length + 1;
    toDoList.innerText = text;
    delBtn.innerText = "❌";
    onGoingBtn.innerText = "🔛";
    doneBtn.innerText = "⭕️"
    li.appendChild(toDoList);
    li.appendChild(delBtn);
    li.appendChild(onGoingBtn);
    li.appendChild(doneBtn);
    li.id = newId;
    toDoBoard.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    onGoing.push(toDoObj);
    saveOnGoing();
    delBtn.addEventListener("click", delToDos);
    onGoingBtn.addEventListener("click", onGoingToDos);
    doneBtn.addEventListener("click", doneToDos);
}

function doneToDos(event) {
    delToDos(event);
}

function paintToDo(text) {
    const li = document.createElement("li");
    const toDoList = document.createElement("span");
    const delBtn = document.createElement("button");
    const onGoingBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const newId = toDos.length + 1;
    toDoList.innerText = text;
    delBtn.innerText = "❌";
    onGoingBtn.innerText = "🔛";
    doneBtn.innerText = "⭕️"
    li.appendChild(toDoList);
    li.appendChild(delBtn);
    li.appendChild(onGoingBtn);
    li.appendChild(doneBtn);
    li.id = newId;
    toDoBoard.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
    delBtn.addEventListener("click", delToDos);
    onGoingBtn.addEventListener("click", onGoingToDos);
    doneBtn.addEventListener("click", doneToDos);
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