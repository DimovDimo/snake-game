const space = document.getElementById("snake-game");
const snakeSpace = space.getContext("2d");

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

let snake = [{ horizontal: 300, vertical: 300 }];

let horizontal = 20;
let vertical = 0;

let isNewRoad = false;

document.addEventListener("keydown", control);

engine();

function engine() {
    setTimeout(update, 500);
}

function update() {
    isNewRoad = false;
    drawSpace();
    motion();
    stretchSnake();
    engine();
}

function control(keydown) {    
    if (isNewRoad) {
        return;
    }

    isNewRoad = true;
    let key = keydown.keyCode;
    newRoad(key, UP, 0, -20, vertical, 20);
    newRoad(key, DOWN, 0, 20, vertical, -20);
    newRoad(key, LEFT, -20, 0, horizontal, 20);
    newRoad(key, RIGHT, 20, 0, horizontal, -20);
}

function newRoad(key, keyCode, roadHorizontal, roadVertical, move, speed) {
    let isChanging = isChangingRoad(move, speed, key, keyCode);
    if (isChanging) {
        horizontal = roadHorizontal;
        vertical = roadVertical;
    }
}

function isChangingRoad(move, speed, key, keyCode) {
    let notBack = !(move === speed);
    let isKey = (key === keyCode);

    return notBack && isKey;
}

function stretchSnake() {
    snake.forEach(snakePiece);
}

function snakePiece(piece) {
    snakeSpace.fillStyle = "#66ff00";
    snakeSpace.fillRect(piece.horizontal, piece.vertical, 20, 20);

    snakeSpace.strokestyle = "#568203";
    snakeSpace.strokeRect(piece.horizontal, piece.vertical, 20, 20);
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