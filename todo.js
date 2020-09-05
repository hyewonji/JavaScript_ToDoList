const form = document.querySelector(".js-toDo"),
    input = form.querySelector("input"),
    toDoBoard = document.querySelector(".js-toDoList");
const toDos_LS = "toDos";
let toDos = [];

const countTitle = document.querySelector(".count");
const counts_LS = "counts";
let counts = [];

function saveToDos() {
    localStorage.setItem(toDos_LS, JSON.stringify(toDos));
}

function saveCounts() {
    localStorage.setItem(counts_LS, JSON.stringify(counts));
}

function countToDo() {
    var ele = document.getElementById('toDoList'),
        eleCount = ele.childElementCount;

    //if (parsedCouns !== null) {
    countTitle.innerText = `You did ${counts.length} / ${eleCount}`;
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
    countToDo();
}

function doneToDos(event) {
    const chk = event.target;
    const li = chk.parentNode;
    const id = li.id - 1;
    const i = li.querySelector("i");
    if (toDos[id].check == 0) {
        toDos[id].check = 1;
        i.className = "far fa-check-circle"
        saveToDos();
        counts.push(id);
        saveCounts();
    } else {
        alert('Canceled');
        toDos[id].check = 0;;
        i.className = "far fa-circle";
        saveToDos();
        const idx = counts.indexOf(id);
        counts.splice(idx, 1);
        saveCounts();
    }
    countToDo();
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

function paintToDoChecked(text) {
    const li = document.createElement("li");
    const checkBox = document.createElement("i");
    const toDoList = document.createElement("span");
    const delBtn = document.createElement("i");
    const newId = toDos.length + 1;
    checkBox.className = "far fa-check-circle";
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
        check: 1
    };
    toDos.push(toDoObj);
    saveToDos();
    delBtn.addEventListener("click", delToDos);
    checkBox.addEventListener("click", doneToDos);
    //paintCounts();
}

/*function paintCounts() {
    var ele2 = document.getElementById('toDoList'),
        eleCount2 = ele2.childElementCount;
    console.log(eleCount2);
    console.log(counts);
    //if (parsedCouns !== null) {
    countTitle.innerText = `You did ${counts.length} / ${eleCount}`;
}*/

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue);
    countToDo();
    input.value = "";
}

function loadCounts() {
    var ele = document.getElementById('toDoList'),
        eleCount = ele.childElementCount;
    const loadCounts = localStorage.getItem(counts_LS);
    const parsedCouns = JSON.parse(loadCounts);
    parsedCouns.forEach(function count(count) {
        counts.push(count);
    })
    //if (parsedCouns !== null) {
    countTitle.innerText = `You did ${parsedCouns.length} / ${eleCount}`;
}

function loadToDos() {
    const loadToDos = localStorage.getItem(toDos_LS);
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function (toDo) {
            if (toDo.check == 1) {
                paintToDoChecked(toDo.text);
            } else {
                paintToDo(toDo.text);
            }
        });
        loadCounts();
    }
}

function init() {
    loadToDos();
    saveCounts();
    form.addEventListener("submit", handleSubmit);
}

init();