const grid = document.getElementById('grid');
let btn = document.getElementById("btn");
let music = new Audio('./music/music.mp3');
let gameOver = new Audio('./music/gameover.mp3');
let ting = new Audio('./music/ting.mp3');
const gridSize = 20;
const totalCells = gridSize * gridSize;
const cells = [];
let snake = [42,41]; // Snake's starting position
let direction = 1; // Moving right by default
let food = Math.floor(Math.random() * totalCells); // Random food position
let score = 0;
let intervalTime = 200;
let interval;

// Create the grid dynamically
for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
    cells.push(cell);
}

// Initialize game
function startGame() {
    snake.forEach(index => cells[index].classList.add('snake'));
    cells[food].classList.add('food');
    interval = setInterval(move, intervalTime);
}
// Move the snake
function move() {
    const head = snake[0];

    let newHead;
    if (direction === 1 && (head % gridSize !== gridSize - 1)) newHead = head + 1; // Right
    else if (direction === -1 && (head % gridSize !== 0)) newHead = head - 1; // Left
    else if (direction === -gridSize && head - gridSize >= 0) newHead = head - gridSize; // Up
    else if (direction === gridSize && head + gridSize < totalCells) newHead = head + gridSize; // Down
    else {
        music.pause();
        gameOver.play();
        alert("Game Over! Your score: " + score);
        clearInterval(interval);
        location.reload();
        return;
    }
    

    if (snake.includes(newHead)) {
        music.pause();
        gameOver.play();
        alert("Game Over! Your score: " + score);
        clearInterval(interval);
        location.reload();
        return;
    }

    snake.unshift(newHead);

    if(newHead == food){
        ting.play();
        score++;
        cells[food].classList.remove('food');
        food = Math.floor(Math.random() * totalCells);
        cells[food].classList.add('food');
    }else{
        const tails = snake.pop();
        cells[tails].classList.remove('snake');
    }
    cells[newHead].classList.add('snake');
}

// controls the snake with arraow keys
document.addEventListener('keydown',(e)=>{
    if(e.key === "ArrowRight" && direction != -1){
        direction = 1;
    };
    if(e.key === "ArrowLeft" && direction != 1){
        direction = -1;
    };
    if(e.key === "ArrowUp" && direction != gridSize){
        direction = -gridSize;
    }if(e.key === "ArrowDown" && direction != -gridSize){
        direction = gridSize;
    }
})
btn.addEventListener('click',function(){
    startGame();
    music.play();
});
