const hoverSound = new Audio("sounds/hover.mp3");
const clickSound = new Audio("sounds/click.mp3");
const bgMusic = new Audio("sounds/bg-music.mp3");

bgMusic.preload = "auto";
bgMusic.loop = true;
bgMusic.volume = 0.1;

let musicStarted = false;

function startBackgroundMusic() {
if (musicStarted) {
return;
}

const playPromise = bgMusic.play();

if (playPromise && typeof playPromise.then === "function") {
playPromise
.then(() => {
musicStarted = true;
})
.catch(() => {
musicStarted = false;
});
return;
}

musicStarted = true;
}

document.addEventListener("pointerdown", startBackgroundMusic);
document.addEventListener("keydown", startBackgroundMusic);

/* hover sound for ALL buttons including dynamic ones */

document.addEventListener("mouseover", (e) => {

if(e.target.matches("button, a")){

hoverSound.currentTime = 0;
hoverSound.play().catch(()=>{});

}

});

document.addEventListener("click", (e) => {

if(e.target.matches("button, a")){

clickSound.currentTime = 0;
clickSound.play().catch(()=>{});

}

});
