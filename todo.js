const toDoForm = document.querySelector(".toDoForm");
const input = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");
const toDos_LS = "toDos";
let toDos = [];

const countTitle = document.querySelector(".count");
let counts = 0;

const btnContainer = document.querySelector(".js-btn");
const allChecked = btnContainer.querySelector(".allChecked");
const allUnChecked = btnContainer.querySelector(".allUnChecked");
const allDeleted = btnContainer.querySelector(".allDeleted");

function handleChange() {
    saveToDos();
    countToDos();
}

function saveToDos() {
    localStorage.setItem(toDos_LS, JSON.stringify(toDos));
}

function countToDos() {
    countTitle.innerText = `You did ${counts} / ${toDos.length}`;
}

function delToDos(event) {
    const text = event.target.parentNode.innerText
    if (confirm(`Want to remove "${text}"?`) === true) {
        const btn = event.target;
        const li = btn.parentNode;
        const id = li.id - 1;
        const checkI = li.querySelector("i");
        if (checkI.className === 'fas fa-check-circle') {
            counts -= 1;
        }
        li.style.transform = 'translateY(-30%)';
        li.style.opacity = '0';
        li.style.transition = 'all 0.5s'
        setTimeout(function(){
            toDoList.removeChild(li)
            const cleanToDos = toDos.filter(
                function (toDo) {
                    return toDo.id !== parseInt(li.id);
                });
            toDos = cleanToDos;
            handleChange();
        },450); 
    } else {
        return false;
    }
}

function doneToDos(event) {
    const chk = event.target;
    const li = chk.parentNode;
    const id = li.id ;
    const checkI = li.querySelector("i");
    const span = li.querySelector("span");
    toDos.map(function(item) {
        if(item.id === parseInt(id)){
            const isChecked = item.check;
            if (isChecked) {
                item.check = 0;
                checkI.className = "far fa-circle"
                span.classList.remove("checked")
                counts -= 1
            } else {
                item.check = 1;
                checkI.className = "fas fa-check-circle";
                span.classList.add("checked")
                counts += 1;
            }
            handleChange();
            
        }
    });
};

function paintToDo(text,check) {
    const li = document.createElement("li");
    const checkBox = document.createElement("i");
    const toDo = document.createElement("span");
    const delBtn = document.createElement("i");
    const newId = toDos.length + 1;
    checkBox.className = (check ? "fas fa-check-circle" : "far fa-circle");
    toDo.innerText = text;
    toDo.className = (check ? "checked" : null);
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
    handleChange();
    delBtn.addEventListener("click", delToDos);
    checkBox.addEventListener("click", doneToDos);
}

function deleteAll(){
    if(confirm("Are you sure to delete all of lists?") === true){
        const lis = toDoList.querySelectorAll("li");
        lis.forEach(li=>toDoList.removeChild(li));
        toDos = [];
        counts = 0;
        handleChange();
    } else {
        return false;
    }
}

function checkAll(e){
    if(toDos.length === 0){
        return
    }
    if(e.target.className === "all allChecked"){
        const lis = toDoList.querySelectorAll("i.fa-circle");
        toDos.forEach(todo => todo.check = 1);
        lis.forEach((li) => {
            const span = li.parentNode.querySelector("span");
            span.classList.add("checked")
            li.className = "fas fa-check-circle"
        });
        counts = toDos.length;
    } else {
        const lis = toDoList.querySelectorAll("i.fa-check-circle");
        toDos.forEach(todo => todo.check = 0);
        lis.forEach((li) => {
            const span = li.parentNode.querySelector("span");
            span.classList.remove("checked")
            li.className = "far fa-circle"
        });
        counts = 0;
    };
    handleChange();
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
    allChecked.addEventListener("click",checkAll);
    allUnChecked.addEventListener("click",checkAll);
    allDeleted.addEventListener("click",deleteAll)
}

init();