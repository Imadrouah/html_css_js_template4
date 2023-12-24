let currentPage = document.querySelector("head > title").innerHTML,
    h = document.querySelector(".page h1"),
    par = document.querySelector("body > .parent"),
    goTop = document.createElement("div"),
    fire = document.createElement("span"),
    sidebar = document.querySelector(".sidebar"),
    like,
    menu = document.querySelector(".menu");

let meta = document.getElementById("meta"),
    checkbox = document.querySelector(".toggle-checkbox"),
    darkModeOn = false,
    theme;

let divTime = document.createElement("div"),
    spanTime = document.createElement("span"),
    spanMonth = document.createElement("span"),
    spanDay = document.createElement("span");

const deleteIcon = document.querySelector(".icon-done"),
    heartIcon = document.querySelector(".heart");

const root = document.documentElement;

//light colors
let mainLight = getComputedStyle(root).getPropertyValue("--main-color"),
    lightBlue = getComputedStyle(root).getPropertyValue("--blue-color"),
    lightBlueAlt = getComputedStyle(root).getPropertyValue("--blue-alt-color"),
    lightOrange = getComputedStyle(root).getPropertyValue("--orange-color"),
    lightGreen = getComputedStyle(root).getPropertyValue("--green-color"),
    lightRed = getComputedStyle(root).getPropertyValue("--red-color"),
    lightWhite = getComputedStyle(root).getPropertyValue("--white-color");
//dark color
let mainDark = getComputedStyle(root).getPropertyValue("--main-color-dark"),
    darkBlue = getComputedStyle(root).getPropertyValue("--blue-color-dark"),
    darkBlueAlt = getComputedStyle(root).getPropertyValue(
        "--blue-alt-color-dark"
    ),
    darkOrange = getComputedStyle(root).getPropertyValue("--orange-color-dark"),
    darkGreen = getComputedStyle(root).getPropertyValue("--green-color-dark"),
    darkRed = getComputedStyle(root).getPropertyValue("--red-color-dark"),
    darkWhite = getComputedStyle(root).getPropertyValue("--white-color-dark");

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
    ],
    darkArr = [
        mainDark,
        darkBlue,
        darkBlueAlt,
        darkOrange,
        darkGreen,
        darkRed,
        darkWhite,
    ];

let notification = document.querySelector(".notification"),
    not = document.createElement("div"),
    headNoti = document.createElement("h3"),
    notiHolder = document.createElement("div"),
    closeNoti = document.createElement("span"),
    click = false,
    spanNoti = document.createElement("span"),
    divContent = document.querySelector(".post-content"),
    Author = document.querySelector(".author"),
    postTime = document.querySelector(".post-time"),
    api = "https://api.quotable.io/random";

// window load
window.addEventListener("load", () => {
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            postTime.innerHTML = data.dateAdded;
            Author.innerText = data.author;
            divContent.innerText = data.content;
        })
        .catch(() => alert("error fetching"));

    setTimeout(() => {
        h.classList.add("hover");
    }, 10);
    meta.content = localStorage.getItem("theme");
    theme = localStorage.getItem("theme");
    if (currentPage === "Settings") {
        if (meta.content === "dark") {
            checkbox.setAttribute("checked", "");
            checkbox.classList.add("dark");
        } else {
            checkbox.removeAttribute("checked");
            checkbox.classList.remove("dark");
        }
    }
    darkLight();
});

//notification status
if (localStorage.getItem("notiClick")) {
    click = localStorage.getItem("notiClick");
    if (localStorage.getItem("notiClick") === "true") {
        notification.classList.add("clicked");
    } else {
        notification.classList.remove("clicked");
    }
    setTimeout(() => {
        notification.classList.remove("clicked");
        localStorage.setItem("notiClick", false);
    }, 20000);
}

//saving post like
if (localStorage.getItem("like")) {
    if (currentPage === "Dashboard") {
        if (localStorage.getItem("like") === "true") {
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa", "c-red");
        } else {
            heartIcon.classList.remove("fa", "c-red");
            heartIcon.classList.add("fa-regular");
        }
    }
}
//scroll to top
goTop.classList.add("scroll-to-top");
fire.classList.add("fire");
document.querySelector(".content").append(goTop);
goTop.append(fire);

window.addEventListener("scroll", () => {
    if (window.scrollY >= 600) {
        goTop.classList.add("active");
    } else {
        goTop.classList.remove("active");
    }
});

goTop.addEventListener("click", function () {
    window.scrollTo({ left: 0, top: 0 });
    goTop.style.setProperty("bottom", "85vh");
    setTimeout(function () {
        goTop.style.setProperty("bottom", "40px");
    }, 1000);
});

//post like / task delete

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

function darkLight() {
    rootName.forEach(function (name, i) {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
            document
                .querySelector(".sidebar")
                .style.setProperty("background-color", "#a1a1a1a6");
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

//notification

notiHolder.classList.add("notification-content");
closeNoti.innerText = "Close";
closeNoti.classList.add("close", "bg-blue", "c-white");
headNoti.innerText = "Notifications";
not.classList.add("notification-div");
spanNoti.innerText = "You Have No New Notification";

not.append(headNoti);
notiHolder.append(spanNoti);
not.append(notiHolder);
not.append(closeNoti);
document.body.prepend(not);

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
    not.classList.remove("active");
});

//time

spanTime.id = "span-date";
spanDay.id = "span-day";
spanMonth.id = "span-month";

divTime.id = "current-date";
divTime.append(spanTime);
divTime.append(spanMonth);
divTime.append(spanDay);

sidebar.append(divTime);

const currentDateElement = document.getElementById("span-date");

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
    ],
    shortDayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
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
        if (hours == 0) {
            hours = 12;
        } else {
            hours = `0${hours}`;
        }
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

//open side bar on mobile

menu.addEventListener("click", () => {
    menu.classList.toggle("active");
    if (menu.classList.contains("active")) {
        sidebar.classList.add("open-side");
    } else {
        sidebar.classList.remove("open-side");
    }
});
window.addEventListener("scroll", () => {
    menu.classList.remove("active");
    sidebar.classList.remove("open-side");
});

//new features on 5/27

function search() {
    let search = document
        .querySelector(".search > input")
        .value.toLocaleLowerCase();
    let elements = document.querySelectorAll(".page .content *");
    let results = [];

    if (search != "") {
        for (let i = 0; i < elements.length; i++) {
            let walker = document.createTreeWalker(
                elements[i],
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            while (walker.nextNode()) {
                let node = walker.currentNode;
                let nodeContent = node.textContent.toLocaleLowerCase();
                if (nodeContent.indexOf(search) !== -1) {
                    let span = document.createElement("span");
                    span.classList.add("highlight");
                    results.push(span);
                    let highlightedText = nodeContent.replace(
                        new RegExp(search, "gi"),
                        (match) => `<span class="highlight">${match}</span>`
                    );
                    span.innerHTML = highlightedText;
                    node.parentNode.replaceChild(span, node);
                }
            }
        }
        results[0].scrollIntoView();
    }
}
document.querySelector(".search > input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        document.querySelector(".fa-search").click();
    }
});
