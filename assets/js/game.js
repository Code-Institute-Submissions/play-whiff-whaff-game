// SELECTING CANVAS ELEMENTS 
const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

// DECLARING CANVAS WIDTH & HEIGHT
cvs.width = 500;
cvs.height = 400;


// DECLARING ARGUMENTS TO DRAW PLAYER1 
const racketOne = {
    x: 0,
    y: cvs.height/2 - 100/2,
    width: 20,
    height: 100, 
    color: '#fde74c',
    score: 0
};

// DECLARING ARGUMENTS TO DRAW OPPONENT
const opponent = {
    x: cvs.width - 20,
    y: cvs.height/2 - 100/2,
    width: 20,
    height: 100, 
    color: '#7a00f3',
    score: 0
};

// DECLARING ARGUMENTS TO DRAW A BALL 
const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 15,
    speed: 5,
    velocityX: 5, 
    velocityY: 5,
    color: '#ea4d06'
};

// DECLARING ARGUMENTS TO DRAW A NET
const gameNet = {
    x: cvs.width/2 - 1,
    y: 0,
    width: 10, 
    height: 10,
    color: '#ff489f'
};

// CREATING FUNCTION TO DRAW A PLAYFIELD USING DRAW METHOD
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

// CREATING FUNCTION TO DRAW A BALL 
function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
};

// CREATING FUNCTION TO DRAW A SCORE 
function drawText(text, x, y, color) {
    ctx.font = '45px Inconsolata, monospace';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
};

// CREATING FUNCTION TO DRAW A PLAYER1
function drawRacketOne() {
    ctx.fillStyle = racketOne.color;
    ctx.fillRect(racketOne.x, racketOne.y, racketOne.width, racketOne.height);
};

// CREATING FUNCTION TO DRAW THE OPPONENT
function drawOpponent() {
    ctx.fillStyle = opponent.color;
    ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
};

// CREATING FUNCTION TO DRAW THE NET 
function drawGameNet() {
    for(let i = 0; i <= cvs.height; i+=15) {
        drawRect(gameNet.x, gameNet.y + i, gameNet.width, gameNet.height, gameNet.color);
    };
};

// CREATING FUNCTION TO RENDER OTHER FUNCTIONS
function render() {
    drawRect(0, 0, cvs.width, cvs.height, '#38cabd');

    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    drawText(racketOne.score, cvs.width/4, cvs.height/8, '#fdfffc');

    drawText(opponent.score, 3*cvs.width/4, cvs.height/8, '#583043');

    drawRacketOne();

    drawOpponent();

    drawGameNet();

};

// INITIATING USER CONTROLS BY ADDING EVENT LISTENER 
cvs.addEventListener('mousemove', controlMove);

// CREATING FUNCTION TO CONTROL THE PLAYER MOVES 
function controlMove(e) {

// DECLARING VARIABLE RECT TO GET TO TOP OF THE CANVAS
    let rect = cvs.getBoundingClientRect();
    racketOne.y = e.clientY - rect.top - racketOne.height/2;
};

// CREATING COLLISION DETECTION FUNCTION
function detectionWalls(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;

};

// CREATING FUNCTION WHICH WILL UPDATE POSITION/MOVEMENT & SCORE 
function update() {

// INITIATING BALL MOVEMENT
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if(ball.y + ball.radius > cvs.height || ball.y < ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    };

// ADDING VARIABLE TO DETERMINE WHO HITS THE BALL 
    let player = (ball.x < cvs.width/2) ? racketOne : opponent;

    if(detectionWalls(ball, player)){

    };
};



// CREATING FUNCTION WHICH WILL CALL RENDER AND UPDATE FUNCTIONS 
function gameBoard () {
    render();
    update();
};

const framePerSecond = 50;
setInterval(gameBoard, 1000/framePerSecond)



