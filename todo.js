const toDoForm = document.querySelector(".toDoForm"),
    input = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toDoList");
const toDos_LS = "toDos";
let toDos = [];

const countTitle = document.querySelector(".count");
let counts = 0;

function saveToDos() {
    localStorage.setItem(toDos_LS, JSON.stringify(toDos));
}

function countToDos() {
    countTitle.innerText = `You did ${counts} / ${toDos.length}`;
}

function delToDos(event) {
    console.log(event.target.parentNode)
    const text = event.target.parentNode.innerText
    if (confirm(`Want to remove "${text}"?`) === true) {
        const btn = event.target;
        const li = btn.parentNode;
        const id = li.id - 1;
        const checkI = li.querySelector("i");
        if (checkI.className === 'fas fa-check-circle') {
            counts -= 1;
        }
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function (toDo) {
            return toDo.id !== parseInt(li.id);
        })
        toDos = cleanToDos;
        saveToDos();
        countToDos();
    } else {
        return false;
    }
}

function doneToDos(event) {
    const chk = event.target;
    const li = chk.parentNode;
    const id = li.id-1 ;
    const isChecked = toDos[id].check;
    console.log(id,isChecked,toDos)
    const checkI = li.querySelector("i");
    const span = li.querySelector("span");
    if (isChecked) {
        toDos[id].check = 0;
        console.log(toDos)
        checkI.className = "far fa-circle"
        counts -= 1
    } else {
        toDos[id].check = 1;
        console.log(toDos)
        checkI.className = "fas fa-check-circle";
        counts += 1;
    }
    saveToDos();
    countToDos();
};

function paintToDo(text,check) {
    const li = document.createElement("li");
    const checkBox = document.createElement("i");
    const toDo = document.createElement("span");
    const delBtn = document.createElement("i");
    const newId = toDos.length + 1;
    checkBox.className = (check ? "fa-check-circle" : "far fa-circle");
    toDo.innerText = text;
    delBtn.className = "far fa-trash-alt"
    li.appendChild(checkBox);
    li.appendChild(toDo);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
        check: (check ? 1 : 0)
    };
    toDos.push(toDoObj);
    saveToDos();
    countToDos();
    delBtn.addEventListener("click", delToDos);
    checkBox.addEventListener("click", doneToDos);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue,0);
    input.value = "";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(toDos_LS);
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        const ToDosNum = parsedToDos.length;
        parsedToDos.forEach(function (toDo) {
            const text = toDo.text;
            const check = toDo.check;
            paintToDo(text,check);
            if(check){
                counts += 1
            };
        });
    }
}

function init() {
    loadToDos();
    countToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();