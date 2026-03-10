setTimeout(() => {

const welcome = document.getElementById("welcomeText");
const menu = document.getElementById("menu");

/* hide welcome text */

if (welcome) {
welcome.style.display = "none";
}

/* show menu */

if (menu) {
menu.classList.remove("hidden");
menu.style.opacity = "1";
}

}, 4000);
