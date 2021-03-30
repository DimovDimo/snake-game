const snakeLength = document.getElementById("snake-length");
const snakeMaxLength = document.getElementById("snake-max-length");
const snakePercentageMaxLength = document.getElementById("snake-percentage-max-length");
// TODO: win isGameOver snakeLength = snakeMaxLength

const space = document.getElementById("snake-game");
const snakeSpace = space.getContext("2d");

const maxPosition = 2;

const size = 203;

const UP = 38;
const W = 87;

const DOWN = 40;
const S = 83;

const LEFT = 37;
const A = 65;

const RIGHT = 39;
const D = 68;

let snake = [{ horizontal: 0, vertical: 0 }];

let horizontal = size;
let vertical = 0;

let mealHorizontal = 0;
let mealVertical = 0;

let isNewRoad = false;

document.addEventListener("keydown", control);

engine();
meal();

function control(keydown) {
    if (isNewRoad) {
        return;
    }

    isNewRoad = true;
    let key = keydown.keyCode;
    keyControl(key);
}

function keyControl(key) {
    newRoad(key, UP, 0, -size, vertical, size);
    newRoad(key, W, 0, -size, vertical, size);
    newRoad(key, DOWN, 0, size, vertical, -size);
    newRoad(key, S, 0, size, vertical, -size);
    newRoad(key, LEFT, -size, 0, horizontal, size);
    newRoad(key, A, -size, 0, horizontal, size);
    newRoad(key, RIGHT, size, 0, horizontal, -size);
    newRoad(key, D, size, 0, horizontal, -size);
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

function engine() {
    if (isGameOver()) {
        return;
    }

    setTimeout(update, 2000);
}

function isGameOver() {
    return touchSides() || touchTail() || isWin();
}

function touchSides() {
    let touchCeiling = 0 > snake[0].vertical;
    let touchLeft = 0 > snake[0].horizontal;

    let touchRight = space.height < snake[0].vertical + size;
    let touchFloor = space.width < snake[0].horizontal + size;

    return touchCeiling || touchLeft || touchRight || touchFloor;
}

function touchTail() {
    for (let i = 1; i < snake.length; i++) {
        if (comparePieces(snake[0], snake[i])) {
            return true;
        }
    }

    return false;
}

function comparePieces(firstPiece, secondPiece) {
    let verticalPieces = (firstPiece.vertical === secondPiece.vertical);
    let horizontalPieces = (firstPiece.horizontal === secondPiece.horizontal);

    return verticalPieces && horizontalPieces;
}

function isWin() {
    return snake.length === getMaxLength();
}

function update() {
    isNewRoad = false;
    drawSpace();
    motion();
    paintingMeal();
    stretchSnake();
    printResults();
    engine();
}

function drawSpace() {
    snakeSpace.fillStyle = "#f2dc7d";
    snakeSpace.fillRect(0, 0, space.width, space.height);

    snakeSpace.strokestyle = "#a08d39";
    snakeSpace.strokeRect(0, 0, space.width, space.height);
}

function motion() {
    let piece = newPiece();
    addPiece(piece);
    crawling(piece);
}

function newPiece() {
    return {
        horizontal: snake[0].horizontal + horizontal,
        vertical: snake[0].vertical + vertical
    };
}

function addPiece(piece) {
    snake.unshift(piece);
}

function crawling(piece) {
    if (isMeal(piece)) {
        meal();
    } else {
        snake.pop();
    }
}

function isMeal(piece) {
    let isVertical = (piece.vertical === mealVertical);
    let isHorizontal = (piece.horizontal === mealHorizontal);

    return isVertical && isHorizontal;
}

function meal() {
    newMeal();
    eat();
}

function newMeal() {
    if (isWin()) {
        nullifyMeal();
    } else {
        generateMeal();
    }
}

function nullifyMeal() {
    mealHorizontal = -size;
    mealVertical = -size;
}

function generateMeal() {
    mealHorizontal = getMealPosition(space.width);
    mealVertical = getMealPosition(space.height);
    snakeConditionAction(isMeal, newMeal);
}

function getMealPosition(spaceDimension) {
    return newRandomMeal(0, getMaxPosition(spaceDimension));
}

function newRandomMeal(min, max) {
    let intervalSize = max - min;
    let newRandom = min + Math.random() * intervalSize;

    return size * Math.round(newRandom / size);
}

function getMaxPosition(spaceDimension) {
    return spaceDimension - (maxPosition * size);
}

function snakeConditionAction(condition, action) {
    snake.forEach(function conditionAction(piece) {
        if (condition(piece)) {
            action();
        }
    });
}

function eat() {
    snakeConditionAction(isMeal, meal);
}

function paintingMeal() {
    snakeSpace.fillStyle = "#ff0800";
    snakeSpace.fillRect(mealHorizontal, mealVertical, size, size);

    snakeSpace.strokestyle = "#660000";
    snakeSpace.strokeRect(mealHorizontal, mealVertical, size, size);
}

function stretchSnake() {
    snake.forEach(snakePiece);
}

function snakePiece(piece) {
    snakeSpace.fillStyle = "#66ff00";
    snakeSpace.fillRect(piece.horizontal, piece.vertical, size, size);

    snakeSpace.strokestyle = "#568203";
    snakeSpace.strokeRect(piece.horizontal, piece.vertical, size, size);
}

function printResults() {
    printLength();
    let maxLength = printMaxLength();
    printPercentage(maxLength);
}

function printLength() {
    snakeLength.innerText = snake.length;
}

function printMaxLength() {
    let maxLength = getMaxLength();
    snakeMaxLength.innerText = maxLength;

    return maxLength;
}

function getMaxLength() {
    let spaceHeight = Math.floor(space.height / size);
    let spaceWidth = Math.floor(space.width / size);

    return spaceHeight * spaceWidth;
}

function printPercentage(maxLength) {
    let percentage = getPercentage(maxLength);
    snakePercentageMaxLength.innerText = (percentage).toFixed(2);
}

function getPercentage(maxLength) {
    return (snake.length / maxLength) * 100;
}