const countTitle = document.querySelector(".count");
const tod

const counts = [];

function countToDoList() {
    var ele = document.getElementById('toDoList'),
        eleCount = ele.childElementCount;
    const loadToDos = localStorage.getItem(toDos_LS);
    console.log(loadToDos);
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function (toDo) {
            var i = 1;
            if (toDo.check == 1) {
                counts.push(i);
            }
        });
        console.log(counts.length);
    }
    countTitle.innerText = `You did  / ${eleCount}`;
}

function init() {
    checkBox.addEbentListner("click", countToDoList);
}

init();