const allChecked = document.querySelector(".allChecked"),
    allUnChecked = document.querySelector(".allUnChecked"),
    allDeleted = document.querySelector(".allDeleted");

const toDoList = document.querySelector(".js-toDoList"),
    li = toDoList.querySelectorAll("li");
var count = toDoList.childElementCount;

function saveToDos() {
    localStorage.setItem(toDos_LS, JSON.stringify(toDos));
}

function countToDo() {
    console.log(counts);
    const listCount = toDoList.childElementCount;
    countTitle.innerText = `You did ${listCount} / ${listCount}`;
}

function checked() {
    const cleanToDos = toDos.filter(function (todo) {
        return todo.check !== 1
    });
    console.log(cleanToDos);
    cleanToDos.forEach(function (todo) {
        todo.check = 1;
    });
    li.forEach(function (list) {
        const i = list.querySelector("i");
        i.className = "fas fa-check-circle"
    });
    countToDo();
    saveToDos();
}

function init() {
    allChecked.addEventListener("click", checked);
}

init();