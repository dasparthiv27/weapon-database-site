// Welcome animation
setTimeout(() => {

const welcome = document.getElementById("welcomeText");
const menu = document.getElementById("menu");

if (welcome) welcome.style.display = "none";

if (menu) {
menu.classList.remove("hidden");
menu.style.opacity = "1";
}

}, 4000);

// LOAD WEAPON CATEGORIES
async function loadCategories() {

try {

const response = await fetch("http://localhost:3000/categories");
const categories = await response.json();

const container = document.getElementById("categories");

if (!container) return;

container.innerHTML = "";

categories.forEach(cat => {

const btn = document.createElement("button");

btn.textContent = cat.category_name;

btn.addEventListener("click", () => {
loadWeapons(cat.category_id);
});

container.appendChild(btn);

});

} catch (err) {

console.error("Failed to load categories:", err);

}

}

// LOAD WEAPONS FROM CATEGORY
async function loadWeapons(categoryId) {

try {

const response = await fetch(`http://localhost:3000/categories/${categoryId}`);
const weapons = await response.json();

const container = document.getElementById("weapons");

if (!container) return;

container.innerHTML = "";

weapons.forEach(w => {

const card = document.createElement("div");
card.classList.add("weaponCard");

card.innerHTML = `

<h2>${w.weapon_name}</h2>

<img
src="images/weapons/${w.image}"
loading="lazy"
onerror="this.onerror=null;this.src='images/weapons/default.png';"

>

<div class="weaponStats">

<p><b>Damage:</b> ${w.damage}</p>
<p><b>Fire Rate:</b> ${w.fire_rate}</p>
<p><b>Range:</b> ${w.range_value}</p>
<p><b>Accuracy:</b> ${w.accuracy}</p>
<p><b>Mobility:</b> ${w.mobility}</p>
<p><b>Magazine Size:</b> ${w.magazine_size}</p>
<p><b>Reload Time:</b> ${w.reload_time}s</p>
<p><b>Units Available:</b> ${w.units_available}</p>

</div>
`;

card.addEventListener("click", () => {
window.location.href = `weapon.html?id=${w.weapon_id}`;
});

container.appendChild(card);

});

} catch (err) {

console.error("Failed to load weapons:", err);

}

}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
loadCategories();
});
