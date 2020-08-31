const form = document.querySelector(".js-toDo"),
    input = form.querySelector("input"),
    toDoBoard = document.querySelector(".js-toDoList");
const checkBox = document.querySelector("checkBox");

const toDos_LS = "toDos";

let toDos = [];

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
    const li = chk.parentNode;
    const id = li.id - 1
    console.log(id);
    if (toDos[id].check == 0) {
        alert('Completed');
        toDos[id].check = 1;
        saveToDos();

    } else {
        alert('cenceled');
        toDos[id].check = 0;
        saveToDos();
    }
};


function paintToDo(text) {
    const li = document.createElement("li");
    const checkBox = document.createElement("i");
    const toDoList = document.createElement("span");
    const delBtn = document.createElement("i");
    const newId = toDos.length + 1;
    checkBox.className = "far fa-circle";
    toDoList.innerText = text;
    delBtn.className = "far fa-trash-alt"
    li.appendChild(checkBox);
    li.appendChild(toDoList);
    li.appendChild(delBtn);
    li.id = newId;
    toDoBoard.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
        check: 0
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
        });
    }
}


function init() {
    loadToDos()
    form.addEventListener("submit", handleSubmit)
}

init()