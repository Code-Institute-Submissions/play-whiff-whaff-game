// SELECTING CANVAS ELEMENTS 
const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

// DECLARING CANVAS WIDTH & HEIGHT
cvs.width = 500;
cvs.height = 400;



// CREATING FUNCTION TO DRAW A PLAYFIELD USING DRAW METHOD
function drawPlayField(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

drawPlayField(0, 0, cvs.width, cvs.height, '#38cabd');

