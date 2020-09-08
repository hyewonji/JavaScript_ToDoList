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
    countToDo();
}

function saveCounts() {
    localStorage.setItem(counts_LS, JSON.stringify(counts));
}

function countToDo() {
    var ele = document.getElementById('toDoList'),
        eleCount = ele.childElementCount;
    countTitle.innerText = `You did ${counts.length} / ${eleCount}`;
}

function delToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const id = li.id - 1;
    const i = li.querySelector("i");
    if (i.className == 'fas fa-check-circle') {
        const idx = counts.indexOf(id);
        counts.splice(idx, 1);
        saveCounts();
    }
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
    const id = li.id;
    const i = li.querySelector("i");
    const span = li.querySelector("span");
    const text = span.innerText;
    function isChecked(element) {
        if (element.text === text) {
            return true;
        }
    }
    const done = toDos.find(isChecked);
    if (done.check == 0) {
        done.check = 1;
        i.className = "fas fa-check-circle"
        counts.push(id);
    } else {
        alert('Canceled');
        done.check = 0;
        i.className = "far fa-circle";
        const idx = counts.indexOf(id);
        counts.splice(idx, 1);
    }
    saveToDos();
    saveCounts();
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
    checkBox.className = "fas fa-check-circle";
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
}

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
    const parsedCounts = JSON.parse(loadCounts);
    parsedCounts.forEach(function (count) {
        counts.push(count);
    });
    countTitle.innerText = `You did ${parsedCounts.length} / ${eleCount}`;
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
    form.addEventListener("submit", handleSubmit);
}

init();