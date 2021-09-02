addEventListener(`load`, (e) => {
    ready();
});

import {Player} from './modules/entities/player.js';

// Canvas dimensions
let WIDTH = 900;
let HEIGHT = 600;
let CANVAS_WIDTH = 900;
let CANVAS_HEIGHT = 600;

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasPosition = canvas.getBoundingClientRect();

const customFont = 'Orbitron'; // Verdana
ctx.font = `70px ${customFont}`;

// Variables
globalThis.entities = [];
globalThis.lasers = [];
globalThis.players = [];


window.addEventListener('resize', function(){
    resizeWindow();
});


// Extra resize window function
function resizeWindow(){
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    let ratio = 16 / 9;
    if (CANVAS_HEIGHT < CANVAS_WIDTH / ratio){
        CANVAS_WIDTH = CANVAS_HEIGHT * ratio;
    } else {
        CANVAS_HEIGHT = CANVAS_WIDTH / ratio;
    }

    canvas.height = HEIGHT;
    canvas.width = WIDTH;

    canvas.style.height = `${CANVAS_HEIGHT}px`;
    canvas.style.width = `${CANVAS_WIDTH}px`;

    canvasPosition = canvas.getBoundingClientRect();

    contextManager(ctx);
}


function contextManager(ctx){
    // Graphic sharpness
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
}


window.addEventListener('keydown', (e) => {
    if (players[0]) {
        // Left / Right
        if (e.key === `a` || e.key === `ArrowLeft`) players[0].dir.x = -1;
        if (e.key === `d` || e.key === `ArrowRight`) players[0].dir.x = 1;

        // Up / Down
        if (e.key === `w` || e.key === `ArrowUp`) players[0].dir.y = -1;
        if (e.key === `s` || e.key === `ArrowDown`) players[0].dir.y = 1;

        if (e.key === ` `) players[0].shooting = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (players[0]) {
        // Left
        if (players[0].dir.x < 0){
            if (e.key === `a` || e.key === `ArrowLeft`) players[0].dir.x = 0;
        }

        // Right
        if (players[0].dir.x > 0){
            if (e.key === `d` || e.key === `ArrowRight`) players[0].dir.x = 0;
        }

        // Up
        if (players[0].dir.y < 0){
            if (e.key === `w` || e.key === `ArrowUp`) players[0].dir.y = 0;
        }

        // Down
        if (players[0].dir.y > 0){
            if (e.key === `s` || e.key === `ArrowDown`) players[0].dir.y = 0;
        }

        // Shoot
        if (e.key === ` `) players[0].shooting = false;
    }
});


function ready(){
    console.log("Start");
    resizeWindow();
    players.push(new Player(canvas.width*.5, canvas.height-40));

    draw();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    [...lasers].forEach(ob => ob.draw(ctx));
    [...players].forEach(ob => ob.draw(ctx));

    update();
}


// Update game loop
function update(){
    requestAnimationFrame(draw);
}


// Grid collision
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


