const head = document.querySelector("head");

function createFavicon (){
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "https://www.flaticon.com/svg/vstatic/svg/3208/3208615.svg?token=exp=1614995696~hmac=9afa91fcadd4b9505c2ec9bcd8d0c655";
    head.appendChild(link);
}

function init(){
    createFavicon()
}

init()