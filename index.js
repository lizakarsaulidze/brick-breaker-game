let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

let playerWidth = 80;
let playerHeight = 10;
let playerVelocitX = 10;

let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColums = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocitX,
}


let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}


window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    context.fillStyle = "lightgreen"
    context.fillRect(player.x,player.y,player.width,player.height);


    requestAnimationFrame(update);
    document.addEventListener("keydown",movePlayer);

    createBlocks()
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0,0,board.width,board.height)

    context.fillStyle = "lightgreen"
    context.fillRect(player.x,player.y,player.width,player.height);

    context.fillStyle = "White";
    ball.x +=ball.velocityX;
    ball.y +=ball.velocityY;
    context.fillRect(ball.x,ball.y,ball.width,ball.height);

    if(ball.y <=0){
        ball.velocityY *= -1;
    }else if(ball.x <=0 || (ball.x + ball.width) >= boardWidth){
       ball.velocityX *= -1;
    }else if(ball.y + ball.height >= boardHeight){
    context.font = "20px sans-serif";
    context.fillText("game over: Press 'Space' to Restart", 80,400);
    gameOver = true;
    }

    if(topCollistion(ball,player) || bottomCollistion(ball,player)){
        ball.velocityY  *= -1;
    }else if(leftCollistion(ball,player) || rightCollision(ball,player)){
        ball.velocityX *= -1;
    }

}

function movePlayer(e){
    if(e.code == "ArrowLeft"){
        player.x -= player.velocityX;
    }else if(e.code == "ArrowRight"){
        player.x += player.velocityX;
    }
}


function outOfBounds(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth)
}

function movePlayer(e){
    if(e.code == "ArrowLeft"){
        // player.x -= player.velocityX;
        let nexpLayerX = player.x - player.velocityX;
        if(!outOfBounds(nexpLayerX)){
            player.x = nexpLayerX;
        }
    }else if(e.code == "ArrowRight"){
        // player.x += player.velocityX;
        let nexpLayerX = player.x + player.velocityX;
        if(!outOfBounds(nexpLayerX)){
            player.x = nexpLayerX;
        }
    }

    if(topCollistion(ball,player)|| bottomCollistion(ball,player)){
        ball.velocityY *= -1;
    }else if(leftCollistion(ball,player) || rightCollision(ball,player)){
        ball.velocityX *= -1;
    }
    context.fillStyle = "skyblue";
    for(let i =0; i < blockArray.length; i++){
        let block = blockArray[i];
        if(!block.break){
            if(topCollistion(ball,block) || bottomCollistion(ball,block)){
                block.break = true;
                ball.velocityY *- -1;
                blockCount -=1;
                score +=100;
            }else if(leftCollistion(ball,block) || rightCollision(ball,block)){
                block.break = true;
                ball.velocityX *= -1;
                blockCount -=1;
                score +=100;
            }
            context.fillRect(block.x,block.y,block.width,block.height);
        }
    }
    context.font = "200px sans-serif";
    context.fillText(score, 10,25);
}

        
function detectCollision(a,b){
     return a.x < b.x + b.width && 
     a.x + a.width > b.x &&
     a.y < b.y + b.height &&
     a.y + a.height > b.y;
}


function topCollistion(ball, block){
    return detectCollision(ball,block) && (ball.y + ball.height)>block.y
}

function bottomCollistion(ball,block){
    return detectCollision(ball,block) && (block.y + block.height)>= ball.y;
}

function leftCollistion(ball,block){
    return detectCollision(ball,block) && (ball.x + ball.width) >=  block.x;
}

function rightCollision(ball,block){
    return detectCollision(ball,block) && (block.x + block.width) >= ball.x;
}


function createBlocks(){
    blockArray = [];
    for(let c = 0; c < blockColums; c++){
        for(let r = 0;r<blockRows; r++){
            let block = {
                x : blockX + c* blockWidth + c*10,
                y : blockY + r* blockHeight + r*10,
                width : blockWidth,
                height : blockHeight,
                break : false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}   