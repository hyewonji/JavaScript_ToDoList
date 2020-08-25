const form = document.querySelector(".js-toDo"),
    input = form.querySelector("input"),
    toDoBoard = document.querySelector(".js-Board");

const toDos = [];
const onGoing = [];
const done = [];



function paintToDo(text) {
    const li = document.createElement("li");
    const toDoList = document.createElement("span");
    const delBtn = document.createElement("button");
    const onGoingBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    toDoList.innerText = text;
    delBtn.innerText = "❌";
    onGoingBtn.innerText = "🔛";
    doneBtn.innerText = "⭕️"
    li.appendChild(toDoList);
    li.appendChild(delBtn);
    li.appendChild(onGoingBtn);
    li.appendChild(doneBtn);
    toDoBoard.appendChild(li);
    const toDoObj = {
        text: text,
        id: toDos.length + 1
    };
    toDos.push(toDoObj);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue);
    input.value = "";
}

function loadToDos() {

}

function init() {
    loadToDos()
    form.addEventListener("submit", handleSubmit)
}

init()