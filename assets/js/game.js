// SELECTING CANVAS ELEMENTS 
const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

// DECLARING CANVAS WIDTH & HEIGHT
cvs.width = 500;
cvs.height = 400;


// CREATING FUNCTION TO DRAW A PLAYFIELD USING DRAW METHOD
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

drawRect(0, 0, cvs.width, cvs.height, '#38cabd');


// CREATING FUNCTION TO DRAW A BALL 
function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
};

drawCircle(100, 100, 50, '#ea4d06');


// CREATING FUNCTION TO DRAW A SCORE 
function drawText(text, x, y, color) {
    ctx.font = '45px Inconsolata, monospace';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
};

drawText('Hello', 300, 200, '#fdfffc');