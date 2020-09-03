const clock = document.querySelector(".js-clock"),
    clockTitle = clock.querySelector(".realTimeClock");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    clockTitle.innerText = `${
        hours >= 22 ? `${hours - 12}` : hours > 12 ? `0${hours - 12}` : hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes} ${
        hours > 12 ? `PM` : `AM`}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();