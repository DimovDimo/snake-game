const space = document.getElementById("snake-game");
const snakeSpace = space.getContext("2d");

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

let snake = [{ horizontal: 300, vertical: 300 }];

let horizontal = 20;
let vertical = 0;

document.addEventListener("keydown", control);

engine();

function engine() {
    setTimeout(update, 500);
}

function update() {
    drawSpace();
    motion();
    stretchSnake();
    engine();
}

function control(keydown) {
    let key = keydown.keyCode;
    //TODO    
}

function stretchSnake() {
    snake.forEach(snakePiece);
}

function snakePiece(piece) {
    snakeSpace.fillStyle = "#66ff00";
    snakeSpace.fillRect(piece.horizontal, piece.vertical, horizontal, horizontal);

    snakeSpace.strokestyle = "#568203";
    snakeSpace.strokeRect(piece.horizontal, piece.vertical, horizontal, horizontal);
}

function drawSpace() {
    snakeSpace.fillStyle = "#f2dc7d";
    snakeSpace.fillRect(0, 0, space.width, space.height);

    snakeSpace.strokestyle = "#a08d39";
    snakeSpace.strokeRect(0, 0, space.width, space.height);
}

function motion() {
    const piece = {
        horizontal: snake[0].horizontal + horizontal,
        vertical: snake[0].vertical + vertical
    };

    snake.unshift(piece);
    snake.pop();
}