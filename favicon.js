const head = document.querySelector("head");

function createFavicon (){
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "https://static.thenounproject.com/png/1081963-200.png";
    head.appendChild(link);
}

function init(){
    createFavicon()
}

init()