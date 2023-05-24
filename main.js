let currentPage = document.querySelector("head > title").innerHTML;
let h = document.querySelector(".page h1");
let par = document.querySelector("body > .parent");
let goTop = document.createElement("div");
let fire = document.createElement("span");

goTop.classList.add("scroll-to-top");
fire.classList.add("fire");
document.body.id = "top";
document.querySelector(".content").append(goTop);
goTop.append(fire);
//scroll to top
// goTop.title = "Rise To The Summit";
goTop.addEventListener("click", function () {
    location.href = "#top";
    goTop.style.setProperty("bottom", "85vh");
    setTimeout(function () {
        goTop.style.setProperty("bottom", "40px");
    }, 1000);
});

//post like / task delete
let like;
const deleteIcon = document.querySelector(".icon-done");
const heartIcon = document.querySelector(".heart");

if (currentPage === "Dashboard") {
    deleteIcon.addEventListener("click", function () {
        document.querySelector(".done").remove();
    });
    heartIcon.addEventListener("click", function () {
        if (heartIcon.classList.contains("fa-regular")) {
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa", "c-red");
            like = true;
        } else {
            heartIcon.classList.remove("fa", "c-red");
            heartIcon.classList.add("fa-regular");
            like = false;
        }
        localStorage.setItem("like", like);
    });
}

//theme change
let darkModeOn = false;
let theme;
let meta = document.getElementById("meta");
let checkbox = document.querySelector(".toggle-checkbox");

if (currentPage === "Settings") {
    checkbox.onclick = function () {
        this.classList.toggle("dark");
        this.classList.contains("dark")
            ? (this.value = "dark")
            : (this.value = "light");
        theme = this.value;
        change();
        darkLight();
    };
}

function change() {
    meta.content = theme;
    if (meta.content === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    }
    localStorage.setItem("theme", theme);
}

const root = document.documentElement;
//light colors
let mainLight = getComputedStyle(root).getPropertyValue("--main-color");
let lightBlue = getComputedStyle(root).getPropertyValue("--blue-color");
let lightBlueAlt = getComputedStyle(root).getPropertyValue("--blue-alt-color");
let lightOrange = getComputedStyle(root).getPropertyValue("--orange-color");
let lightGreen = getComputedStyle(root).getPropertyValue("--green-color");
let lightRed = getComputedStyle(root).getPropertyValue("--red-color");
let lightWhite = getComputedStyle(root).getPropertyValue("--white-color");
//dark color
let mainDark = getComputedStyle(root).getPropertyValue("--main-color-dark");
let darkBlue = getComputedStyle(root).getPropertyValue("--blue-color-dark");
let darkBlueAlt = getComputedStyle(root).getPropertyValue(
    "--blue-alt-color-dark"
);
let darkOrange = getComputedStyle(root).getPropertyValue("--orange-color-dark");
let darkGreen = getComputedStyle(root).getPropertyValue("--green-color-dark");
let darkRed = getComputedStyle(root).getPropertyValue("--red-color-dark");
let darkWhite = getComputedStyle(root).getPropertyValue("--white-color-dark");

let rootName = [
    "--main-color",
    "--blue-color",
    "--blue-alt-color",
    "--orange-color",
    "--green-color",
    "--red-color",
    "--white-color",
];
//colors value
let lightArr = [
    mainLight,
    lightBlue,
    lightBlueAlt,
    lightOrange,
    lightGreen,
    lightRed,
    lightWhite,
];
let darkArr = [
    mainDark,
    darkBlue,
    darkBlueAlt,
    darkOrange,
    darkGreen,
    darkRed,
    darkWhite,
];

function darkLight() {
    rootName.forEach(function (name, i) {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
            document
                .querySelector(".sidebar")
                .style.setProperty("background-color", "#a1a1a1bf");
            root.style.setProperty(name, darkArr[i]);
            document.querySelectorAll(".bg-eee").forEach((ele) => {
                ele.style.backgroundColor = "#3f444a";
            });
        } else {
            document.querySelectorAll(".bg-eee").forEach((ele) => {
                ele.style.backgroundColor = "#eee";
            });
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            document
                .querySelector(".sidebar")
                .style.setProperty("background-color", "white");
            root.style.setProperty(name, lightArr[i]);
        }
    });
}
window.addEventListener("load", () => {
    meta.content = localStorage.getItem("theme");
    theme = localStorage.getItem("theme");

    setTimeout(() => {
        h.classList.add("hover");
    }, 10);
    if (currentPage === "Settings") {
        if (meta.content === "dark") {
            checkbox.setAttribute("checked", "");
            checkbox.classList.add("dark");
        } else {
            checkbox.removeAttribute("checked");
            checkbox.classList.remove("dark");
        }
    }
    if (currentPage === "Dashboard") {
        if (localStorage.getItem("like") === "true") {
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa", "c-red");
        } else {
            heartIcon.classList.remove("fa", "c-red");
            heartIcon.classList.add("fa-regular");
        }
    }
});

window.addEventListener("load", function () {
    click = localStorage.getItem("notiClick");
    if (localStorage.getItem("notiClick") === "true") {
        notification.classList.add("clicked");
    } else {
        notification.classList.remove("clicked");
    }
    setTimeout(() => {
        notification.classList.remove("clicked");
        localStorage.setItem("notiClick", false);
    }, 10000);
    darkLight();
    showPreloader();
    setTimeout(() => {
        hidePreloader();
    }, 200);
});

//loader intro
function showPreloader() {
    par.style.display = "flex";
}
function hidePreloader() {
    par.style.display = "none";
}
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        goTop.classList.add("active");
    } else {
        goTop.classList.remove("active");
    }
});

//notification
let notification = document.querySelector(".notification");
let not = document.createElement("div");
let headNoti = document.createElement("h3");
let notiHolder = document.createElement("div");
let closeNoti = document.createElement("span");
let click = false;
let spanNoti = document.createElement("span");

notiHolder.classList.add("notification-content");
closeNoti.innerText = "Close";
closeNoti.classList.add("close", "bg-blue", "c-white");
headNoti.innerText = "Notifications";
not.classList.add("notification-div");
spanNoti.innerText = "Hey Boii, You Have No New Notification";

not.append(headNoti);
not.append(closeNoti);
document.body.prepend(not);
notiHolder.append(spanNoti);
not.append(notiHolder);

notification.addEventListener("click", (e) => {
    click = true;
    not.classList.add("active");
    if (click) {
        notification.classList.add("clicked");
    } else {
        notification.classList.remove("clicked");
    }
    localStorage.setItem("notiClick", click);
});
closeNoti.addEventListener("click", () => {
    setTimeout(() => {
        notification.classList.remove("clicked");
        localStorage.setItem("notiClick", false);
    }, 10000);
    not.classList.remove("active");
});

//time
let divTime = document.createElement("div");
let spanTime = document.createElement("span");
let spanMonth = document.createElement("span");
let spanDay = document.createElement("span");

spanTime.id = "span-date";
spanDay.id = "span-day";
spanMonth.id = "span-month";

divTime.id = "current-date";
divTime.append(spanTime);
divTime.append(spanMonth);
divTime.append(spanDay);

document.querySelector(".sidebar").append(divTime);
const currentDateElement = document.getElementById("span-date");

// function updateCurrentDate() {
//     const currentDAte = new Date();
//     // const options = { weekday: "long", year: "numeric", day: "numeric" };
//     // const formattedDate = currentDAte.toLocaleTimeString("en-US", options);
//     const formattedTime = currentDAte.toLocaleTimeString("en-US");
//     // const formattedDateTime = `${formattedDate} - ${formattedTime}`;
// }

const shortMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const shortDayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function updateTime() {
    const currentTime = new Date();
    const monthName = shortMonthNames[currentTime.getMonth()];
    const dayName = shortDayNames[currentTime.getDay()];

    spanDay.textContent = dayName;
    spanMonth.textContent = monthName;

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    if (hours > "12") {
        hours -= 12;
    } else if (hours.toString().length == 1) {
        hours = `0${hours}`;
    }
    if (seconds.toString().length == 1) {
        seconds = `0${seconds}`;
    } else {
        seconds = seconds;
    }
    if (minutes.toString().length == 1) {
        minutes = `0${minutes}`;
    } else {
        minutes = minutes;
    }
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    currentDateElement.textContent = formattedTime;
}
updateTime();
setInterval(updateTime, 1000);
