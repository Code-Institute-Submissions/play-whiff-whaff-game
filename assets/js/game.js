const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
cvs.width = 600;
cvs.height = 300;
const startButton = document.getElementById('openGame');
const closeButton = document.getElementById('closeGame');
/**
 * Declares game elements: Player 1(ping), Player 2(pong), game ball and game net.
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
 * Draws the playfield where the game of Ping-Pong takes place.
 */
const drawPlayField = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};
/**
 * Draws the game ball.
 */
const drawBall = (x, y, r, color) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
};
/**
 * Draws the score.
 */
const drawScore = (text, x, y, color) => {
    ctx.font = '45px Inconsolata, monospace';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
};
/**
 * Draws Player 1 (ping).
 */
const drawPlayerOne = () => {
    ctx.fillStyle = ping.color;
    ctx.fillRect(ping.x, ping.y, ping.width, ping.height);
};
/**
 * Draws Player 2 (pong).
 */
const drawPlayerTwo = () => {
    ctx.fillStyle = pong.color;
    ctx.fillRect(pong.x, pong.y, pong.width, pong.height);
};
/**
 * Draws the game net.
 */
const drawGameNet = () => {
    for(let i = 0; i <= cvs.height; i+=15) {
        drawPlayField(gameNet.x, gameNet.y + i, gameNet.width, gameNet.height, gameNet.color);
    }
};
/**
 * Creates all game elements - play-field, players, ball, net, score.
 */ 
const drawGameElements = () => {
    drawPlayField(0, 0, cvs.width, cvs.height, '#38cabd');
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    drawScore(ping.score, cvs.width/4, cvs.height/8, '#fdfffc');
    drawScore(pong.score, 3*cvs.width/4, cvs.height/8,'#641220');
    drawPlayerOne();
    drawPlayerTwo();
    drawGameNet();
};
/**
 * Initiates player moves 
 */
cvs.addEventListener('mousemove', controlMove);
/**
 * Controls player moves 
 */ 
function controlMove(e) {
    let rect = cvs.getBoundingClientRect();
    ping.y = e.clientY - rect.top - ping.height/2;
}
/**
 * The ball bounces back when hits the playfield walls  
 */
const detectionWalls = (b, p) => {
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
const updateGameElements = () => {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    let pongLevel = 0.1;
    pong.y += (ball.y - (pong.y + pong.height/2)) * pongLevel;

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < cvs.width/2) ? ping : pong;

    if(detectionWalls(ball, player)){
        let collidePoint = ball.y - (player.y + player.height/2);
        collidePoint = collidePoint/(player.height/2);
        let angleRad = collidePoint * Math.PI/4;
        let direction = (ball.x < cvs.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.5;
    }

    if(ball.x - ball.radius < 0) {
        pong.score++;
        resetBall();
          
    }else if(ball.x + ball.radius > cvs.width) {
        ping.score++;
        resetBall();
    }
};
/**
 * Resets the ball.
 */
const resetBall = () => {
        ball.x = cvs.width/2;
        ball.y = cvs.height/2;
        ball.speed = 5;
        ball.velocityX = -ball.velocityX;
};
/**
 * Opens the playfield where the game of Ping-Pong takes place.
 */
startButton.onclick = function() {
    cvs.style.display = 'block';
};

/**
 * Closes the playfield and returns the user to intro page.
 */
    closeButton.onclick = function() {
    cvs.style.display = 'none';
}; 
/**
 * Starts the game.
 */
const playGame = () => {
    drawGameElements();
    updateGameElements();
};
const framePerSecond = 50;
setInterval(playGame, 1000/framePerSecond);