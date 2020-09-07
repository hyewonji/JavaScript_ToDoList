function delToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const id = li.id - 1;
    const i = li.querySelector("i");
    /*const idx = counts.indexOf(id);
    counts.splice(idx, 1);
    saveCounts();*/
    toDoBoard.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos();
    countToDo();
}