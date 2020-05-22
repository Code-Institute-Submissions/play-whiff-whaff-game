/** 
 * Selects canvas elements
 */  
const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
/**
 * Opens and closes the game
 */

const startButton = document.getElementById('openGame');
const closeButton = document.getElementById('closeGame')
startButton.onclick = function() {
    cvs.style.display = 'block';
};
closeButton.onclick = function() {
    cvs.style.display = 'none';
};

/** 
 * Declares canvas width & height
 */
cvs.width = 600;
cvs.height = 300;
/**
 * Declares game elements
 */
const ping = {
    x: 0,
    y: cvs.height/2 - 100/2,
    width: 20,
    height: 100, 
    color: '#fde74c',
    score: 0
};
const pong = {
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
let drawRect = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};
/**
 * Draws a ball 
 */ 
let drawCircle = (x, y, r, color) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
};
/**
 * Draws the game score
 */
let drawText = (text, x, y, color) => {
    ctx.font = '45px Inconsolata, monospace';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
};
/**
 * Draws Player 1 
 */ 
let drawPlayerOne = () => {
    ctx.fillStyle = ping.color;
    ctx.fillRect(ping.x, ping.y, ping.width, ping.height);
};
/**
 * Draws Player 2 (pong)
 */
let drawPlayerTwo = () => {
    ctx.fillStyle = pong.color;
    ctx.fillRect(pong.x, pong.y, pong.width, pong.height);
};
/**
 * Draws the game net 
 */
let drawGameNet = () => {
    for(let i = 0; i <= cvs.height; i+=15) {
        drawRect(gameNet.x, gameNet.y + i, gameNet.width, gameNet.height, gameNet.color);
    };
};
/**
 * Draws game elements - play-field, players, ball, net, score
 */ 
let callIn = () => {
    drawRect(0, 0, cvs.width, cvs.height, '#38cabd');
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawText(ping.score, cvs.width/4, cvs.height/8, '#fdfffc');
    drawText(pong.score, 3*cvs.width/4, cvs.height/8,'#641220');
    drawPlayerOne();
    drawPlayerTwo();
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
    ping.y = e.clientY - rect.top - ping.height/2;
};
/**
 * Detects collision walls  
 */
let detectionWalls = (b, p) => {
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
 * Updates player's position/score/ball's speed & resets the ball.
 */
let update = () => {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    let pongLevel = 0.1;
    pong.y += (ball.y - (pong.y + pong.height/2)) * pongLevel;

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    };

    let player = (ball.x < cvs.width/2) ? ping : pong;

    if(detectionWalls(ball, player)){
        let collidePoint = ball.y - (player.y + player.height/2);
        collidePoint = collidePoint/(player.height/2);
        let angleRad = collidePoint * Math.PI/4;
        let direction = (ball.x < cvs.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.5;
    };

    if(ball.x - ball.radius < 0) {
        pong.score++;
        resetBall();
          
    }else if(ball.x + ball.radius > cvs.width) {
        ping.score++;
        resetBall();
    };
};



/**
 * Resets the ball.
 */
let resetBall = () => {
        ball.x = cvs.width/2;
        ball.y = cvs.height/2;
        ball.speed = 5;
        ball.velocityX = -ball.velocityX;
};

/**
 * Initiates the game.
 */
let playGame = () => {
    callIn();
    update();
};
const framePerSecond = 50;
setInterval(playGame, 1000/framePerSecond);








