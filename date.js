const today = document.querySelector(".js-clock"),
    dateTitle = today.querySelector(".realTimeDate");

function getDate() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const day = date.getDay() - 1;
    const day2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const day3 = day2[(day + 7) % 7];
    dateTitle.innerText = `${y}. ${m < 10 ? `0${m}` : m}. ${d < 10 ? `0${d}` : d} ${day3}
        `;
}

function init() {
    getDate();
    setInterval(getDate, 1000);
}

init()