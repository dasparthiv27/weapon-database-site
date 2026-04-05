const BASE_URL =
window.location.hostname === "localhost" ||
window.location.hostname === "127.0.0.1"
? "http://localhost:3000"
: "http://192.168.20.4:3000";

// Get weapon id from URL
function getWeaponId() {
const params = new URLSearchParams(window.location.search);
return params.get("id");
}

// Load weapon from API
async function loadWeapon() {

const id = getWeaponId();
if (!id) return;

try {

const response = await fetch(`${BASE_URL}/weapons/${id}`);
const weapon = await response.json();

renderWeapon(weapon);

} catch (err) {

console.error("Failed to load weapon:", err);

}

}

// Render weapon
function renderWeapon(weapon) {

const container = document.getElementById("weapon-container");

if (!container) return;

if (!weapon) {
container.innerHTML = "Weapon not found";
return;
}

container.innerHTML = `

<div class="weaponCard">

<h1>${weapon.weapon_name}</h1>

<img
src="images/weapons/${weapon.image}"
loading="lazy"
onerror="this.onerror=null;this.src='images/weapons/default.png';"

>

<div class="weaponStats">

<p><b>Damage:</b> ${weapon.damage}</p>
<p><b>Fire Rate:</b> ${weapon.fire_rate}</p>
<p><b>Range:</b> ${weapon.range_value}</p>
<p><b>Accuracy:</b> ${weapon.accuracy}</p>
<p><b>Mobility:</b> ${weapon.mobility}</p>

<div class="statRow">
<span>Damage</span>
<div class="statBar">
<div class="bar" data-value="${weapon.damage}"></div>
</div>
</div>

<div class="statRow">
<span>Fire Rate</span>
<div class="statBar">
<div class="bar" data-value="${weapon.fire_rate}"></div>
</div>
</div>

<div class="statRow">
<span>Range</span>
<div class="statBar">
<div class="bar" data-value="${weapon.range_value}"></div>
</div>
</div>

<div class="statRow">
<span>Accuracy</span>
<div class="statBar">
<div class="bar" data-value="${weapon.accuracy}"></div>
</div>
</div>

<div class="statRow">
<span>Mobility</span>
<div class="statBar">
<div class="bar" data-value="${weapon.mobility}"></div>
</div>
</div>

<p><b>Magazine Size:</b> ${weapon.magazine_size}</p>
<p><b>Reload Time:</b> ${weapon.reload_time}s</p>
<p><b>Units Available:</b> ${weapon.units_available}</p>
<p><b>Category:</b> ${weapon.category_name}</p>

</div>

<h3>Attachments</h3>
<ul id="attachment-list"></ul>

</div>
`;

// Animate stat bars
setTimeout(() => {

const bars = document.querySelectorAll(".bar");

bars.forEach(bar => {

const value = bar.getAttribute("data-value");
bar.style.width = value + "%";

});

}, 200);

// Render attachments
const list = document.getElementById("attachment-list");

if (weapon.attachments) {

const attachments = weapon.attachments.split(",");

attachments.forEach(att => {

const li = document.createElement("li");
li.textContent = att.trim();
list.appendChild(li);

});

}

}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
loadWeapon();
});
