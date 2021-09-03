// runs the ready function when file loads
addEventListener(`load`, (e) => {
    ready();
});

// Import modules
import {Player} from './modules/entities/player.js';
import {ParallaxBG} from './modules/entities/parallax_bg.js';

const p_bg_01 = new Image();
p_bg_01.src = 'src/images/p_bg_01.png';

// Canvas dimensions
let WIDTH = 900;
let HEIGHT = 600;
let CANVAS_WIDTH = 900;
let CANVAS_HEIGHT = 600;

// setup canvas variables
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasPosition = canvas.getBoundingClientRect();

// global font variables
const customFont = 'Orbitron'; // Verdana
ctx.font = `70px ${customFont}`;

// Entity variables
globalThis.entities = [];
globalThis.lasers = [];
globalThis.players = [];
globalThis.bgs = [];


window.addEventListener('resize', function(){
    // runs resizeWindow function to make sure canvas match window size
    resizeWindow();
});


// Extra resize window function
function resizeWindow(){

    // canvas.style.left = `180px`;

    // gets the window inner size
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    // scales canvas based on a certain ratio
    // 16 / 9 = Widescreen
    // 1 / 1 = Box
    // let ratio = 16 / 9;
    // if (CANVAS_HEIGHT < CANVAS_WIDTH / ratio){
    //     CANVAS_WIDTH = CANVAS_HEIGHT * ratio;
    // } else {
    //     CANVAS_HEIGHT = CANVAS_WIDTH / ratio;
    // }

    // sets the canvas actual size
    canvas.height = HEIGHT;
    canvas.width = WIDTH;

    // sets canvas style size
    canvas.style.height = `${CANVAS_HEIGHT}px`;
    canvas.style.width = `${CANVAS_WIDTH}px`;
    
    // console.log(window.innerHeight - canvas.width);

    // if (canvas.width <= CANVAS_WIDTH/3.16445) canvas.style.left = `${canvas.width/5 - window.innerHeight / canvas.width}px`;
    // else canvas.style.left = `0px`;

    // gets the canvas bounding area
    canvasPosition = canvas.getBoundingClientRect();

    // runs the contextManager function to render sharp pixels or smooth
    // false = sharp pixels
    contextManager(ctx, false);
}


function contextManager(ctx, sharp){
    // Graphic sharpness (true:Smooth / false:Sharp)
    ctx.mozImageSmoothingEnabled = sharp;
    ctx.msImageSmoothingEnabled = sharp;
    ctx.imageSmoothingEnabled = sharp;
}


window.addEventListener('keydown', (e) => {
    if (players[0]) {
        // Left / Right Pressed
        if (e.key === `a` || e.key === `ArrowLeft`) players[0].dir.x = -1;
        if (e.key === `d` || e.key === `ArrowRight`) players[0].dir.x = 1;

        // Up / Down Pressed
        if (e.key === `w` || e.key === `ArrowUp`) players[0].dir.y = -1;
        if (e.key === `s` || e.key === `ArrowDown`) players[0].dir.y = 1;
        
        // Shoot Pressed
        if (e.key === ` `) players[0].shooting = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (players[0]) {
        // Left Released
        if (players[0].dir.x < 0){
            if (e.key === `a` || e.key === `ArrowLeft`) players[0].dir.x = 0;
        }

        // Right Released
        if (players[0].dir.x > 0){
            if (e.key === `d` || e.key === `ArrowRight`) players[0].dir.x = 0;
        }

        // Up Released
        if (players[0].dir.y < 0){
            if (e.key === `w` || e.key === `ArrowUp`) players[0].dir.y = 0;
        }

        // Down Released
        if (players[0].dir.y > 0){
            if (e.key === `s` || e.key === `ArrowDown`) players[0].dir.y = 0;
        }

        // Shoot Released
        if (e.key === ` `) players[0].shooting = false;
    }
});


function ready(){
    // makes sure the canvas matches the window on start
    resizeWindow();

    // bgs[0] && bgs[1]
    bgs.push(new ParallaxBG(p_bg_01, p_bg_01.src, 900, 206));
    bgs.push(new ParallaxBG(p_bg_01, p_bg_01.src, 900, 206));
    
    // Adds player to players list
    players.push(new Player(canvas.width*.5, canvas.height-40));

    // runs the draw function
    draw();
}

function draw(){
    // clears the canvas every frame 
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Dirt terrain
    ctx.fillStyle = "rgb(155,125,100)";
    ctx.fillRect(0, canvas.height-64,canvas.width,64);

    // bgs drawing
    if (players[0] && bgs[0] && bgs[1]){
        // Background
        bgs[0].move(-600 + -players[0].pos.x/35, 415 + -players[0].pos.y/30, 900, 140);

        // Foreground
        bgs[1].move(-300 + -players[0].pos.x/5, 380 + -players[0].pos.y/8, 900, 306);
    }

    // draws entities in lists
    [...bgs].forEach(ob => ob.draw(ctx));
    [...lasers].forEach(ob => ob.draw(ctx));
    [...players].forEach(ob => ob.draw(ctx));

    // runs the update function
    update();
}


// Update game loop
function update(){

    // loops back to the draw function again after every frame
    requestAnimationFrame(draw);
}


// Collision check between 2 objects / positions
function collision(first,second){
    if (!(
        first.x > second.x + second.width  ||
        first.x + first.width < second.x   ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    )) {
        return true;
    };
};


