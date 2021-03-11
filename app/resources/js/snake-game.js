const space = document.getElementById("snake-game");
const snakeSpace = space.getContext("2d");

let snake = [{horizontal: 300, vertical: 300}];

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
    const head = {
        horizontal: snake[0].horizontal + 20,
        vertical: snake[0].vertical + 0
    };
    
    snake.unshift(head);
    snake.pop();
}