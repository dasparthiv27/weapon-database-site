const hoverSound = new Audio("sounds/hover.mp3");
const clickSound = new Audio("sounds/click.mp3");
const bgMusic = new Audio("sounds/bg-music.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.08;

let musicStarted = false;

document.addEventListener("click", () => {

if(!musicStarted){
bgMusic.play().catch(()=>{});
musicStarted = true;
}

});

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