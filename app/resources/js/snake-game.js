const space = document.getElementById("snake-game");
const snakeSpace = space.getContext("2d");

let snake = [{x: 300, y: 300}];

////////////////////
stretchSnake();
////////////////////

function stretchSnake() {
    snake.forEach(snakePiece);
}

function snakePiece(piece) {  
    snakeSpace.fillStyle = "#66FF00";    
    snakeSpace.fillRect(piece.x, piece.y, 20, 20);
    
    snakeSpace.strokestyle = "#568203";
    snakeSpace.strokeRect(piece.x, piece.y, 20, 20);
}