const space = document.getElementById("snake-game");
const snakeSpace = space.getContext("2d");

let snake = [{x: 300, y: 300}];

////////////////////
drawSpace();
stretchSnake();
////////////////////

function stretchSnake() {
    snake.forEach(snakePiece);
}

function snakePiece(piece) {  
    snakeSpace.fillStyle = "#66ff00";    
    snakeSpace.fillRect(piece.x, piece.y, 20, 20);
    
    snakeSpace.strokestyle = "#568203";
    snakeSpace.strokeRect(piece.x, piece.y, 20, 20);
}

function drawSpace() {
    snakeSpace.fillStyle = "#f2dc7d";    
    snakeSpace.fillRect(0, 0, space.width, space.height);

    snakeSpace.strokestyle = "#a08d39";
    snakeSpace.strokeRect(0, 0, space.width, space.height);
}