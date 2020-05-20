/** 
 * Selects canvas elements
 */  
const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
/** 
 * Declares canvas width & height
 */
cvs.width = 500;
cvs.height = 400;
/**
 * Declares game elements
 */
const racketOne = {
    x: 0,
    y: cvs.height/2 - 100/2,
    width: 20,
    height: 100, 
    color: '#fde74c',
    score: 0
};

const opponent = {
    x: cvs.width - 20,
    y: cvs.height/2 - 100/2,
    width: 20,
    height: 100, 
    color: '#7a00f3',
    score: 0
};

const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 15,
    speed: 5,
    velocityX: 5, 
    velocityY: 5,
    color: '#ea4d06'
};

const gameNet = {
    x: cvs.width/2 - 1,
    y: 0,
    width: 10, 
    height: 10,
    color: '#ff489f'
};

/** 
 * Draws a play-field
 */
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

/**
 * Draws a ball 
 */ 
function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
};

/**
 * Draws the game score
 */
function drawText(text, x, y, color) {
    ctx.font = '45px Inconsolata, monospace';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
};

/**
 * Draws Player 1 
 */ 
function drawRacketOne() {
    ctx.fillStyle = racketOne.color;
    ctx.fillRect(racketOne.x, racketOne.y, racketOne.width, racketOne.height);
};

/**
 * Draws Player 2 (Opponent)
 */
function drawOpponent() {
    ctx.fillStyle = opponent.color;
    ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
};

/**
 * Draws the game net 
 */
function drawGameNet() {
    for(let i = 0; i <= cvs.height; i+=15) {
        drawRect(gameNet.x, gameNet.y + i, gameNet.width, gameNet.height, gameNet.color);
    };
};

/**
 * Draws game elements - play-field, players, ball, net, score
 */ 
function render() {
    drawRect(0, 0, cvs.width, cvs.height, '#38cabd');

    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    drawText(racketOne.score, cvs.width/4, cvs.height/8, '#fdfffc');

    drawText(opponent.score, 3*cvs.width/4, cvs.height/8, '#583043');

    drawRacketOne();

    drawOpponent();

    drawGameNet();

};

/**
 * Initiates user controls 
 */
cvs.addEventListener('mousemove', controlMove);

/**
 * Controls player moves 
 */ 
function controlMove(e) {
    let rect = cvs.getBoundingClientRect();
    racketOne.y = e.clientY - rect.top - racketOne.height/2;

};

/**
 * Detects collision walls  
 */
function detectionWalls(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && 
    b.top < p.bottom;

};


/**
 * Updates player's position and score
 */
function update() {

/**
 * Initiates ball movement
 */
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

/**
 * Adds basic AI to control Player 2 (Opponent) movement
 */
    let opponentLevel = 0.1;
    opponent.y += (ball.y - (opponent.y + opponent.height/2)) * opponentLevel;

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    };

/**
 * Determines who is hitting the ball  
 */
    let player = (ball.x < cvs.width/2) ? racketOne : opponent;

    if(detectionWalls(ball, player)){
        let collidePoint = ball.y - (player.y + player.height/2);

        collidePoint = collidePoint/(player.height/2);

// CALCULATING ANGLE IN RADIAN
        let angleRad = collidePoint * Math.PI/4;

// DIRECTING THE BALL WHEN IT IS HIT
        let direction = (ball.x < cvs.width/2) ? 1 : -1;

// CHANGING VELOCITY X & Y 
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

// INCREASING THE SPEED OF THE BALL ONCE HIT BY PLAYER/OPPONENT
        ball.speed += 0.5;
    };
/**
 * Updates the score
 */ 
    if(ball.x - ball.radius < 0) {
        opponent.score++;
        resetBall();
    }else if(ball.x + ball.radius > cvs.width) {
        racketOne.score++;
        resetBall();
    };

};

/**
 * Resets the ball 
 */
function resetBall() {
        ball.x = cvs.width/2;
        ball.y = cvs.height/2;

        ball.speed = 5;
        ball.velocityX = -ball.velocityX;

};

/**
 * Initiates the game
 */
function gameBoard() {
    render();
    update();
};

const framePerSecond = 50;
setInterval(gameBoard, 1000/framePerSecond);

