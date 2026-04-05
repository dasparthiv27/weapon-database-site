const BASE_URL =
window.location.hostname === "localhost" ||
window.location.hostname === "127.0.0.1"
? "http://localhost:3000"
: "http://192.168.20.4:3000";

async function searchWeapon() {

const input = document.getElementById("weaponInput").value.trim().toLowerCase();
const resultDiv = document.getElementById("result");

resultDiv.innerHTML = "";

if (!input) {
resultDiv.innerHTML = "<p>Please enter a weapon name</p>";
return;
}

try {

const response = await fetch(`${BASE_URL}/weapons`);
const data = await response.json();

/* find weapon */

const weapon = data.find(w => w.weapon_name.toLowerCase() === input);

if (!weapon) {

resultDiv.innerHTML = "<p>Weapon not found</p>";
return;

}

const card = document.createElement("div");
card.classList.add("weaponCard");

card.innerHTML = `

<h2>${weapon.weapon_name}</h2>

<img
src="images/weapons/${weapon.image}"
onerror="this.src='images/weapons/default.png'"

>

<p class="stock">Units Available: ${weapon.units_available}</p>

<p class="tapHint">Touch to see specs</p>

`;

card.addEventListener("click", () => {
window.location.href = `weapon.html?id=${weapon.weapon_id}`;
});

resultDiv.appendChild(card);

/* auto scroll */

setTimeout(() => {

card.scrollIntoView({
behavior: "smooth",
block: "center"
});

}, 100);

} catch (error) {

console.error(error);
resultDiv.innerHTML = "<p>Error connecting to server</p>";

}

}

/* ENTER KEY SUPPORT */

document.addEventListener("DOMContentLoaded", () => {

const inputField = document.getElementById("weaponInput");

if (!inputField) return;

inputField.addEventListener("keydown", (event) => {

if (event.key === "Enter") {
searchWeapon();
}

});

});

/* LIVE SEARCH SUGGESTIONS */

document.addEventListener("DOMContentLoaded", () => {

const input = document.getElementById("weaponInput");
const suggestionBox = document.getElementById("suggestions");

if (!input) return;

input.addEventListener("input", async function () {

const query = this.value.toLowerCase();

if (query.length === 0) {
suggestionBox.innerHTML = "";
return;
}

const response = await fetch(`${BASE_URL}/weapons`);
const data = await response.json();

const names = [...new Set(data.map(w => w.weapon_name))];

const filtered = names.filter(name =>
name.toLowerCase().includes(query)
);

suggestionBox.innerHTML = "";

filtered.forEach(name => {

const div = document.createElement("div");

div.classList.add("suggestion-item");
div.textContent = name;

div.onclick = () => {

input.value = name;
suggestionBox.innerHTML = "";

};

suggestionBox.appendChild(div);

});

});

});
