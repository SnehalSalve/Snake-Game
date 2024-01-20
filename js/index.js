//Game constats and variables

let inputDir = {x: 0, y: 0}; // intailzied position at 0
const foodsound = new Audio('foodsound.mp3'); //food sound
const gameOversound =new Audio('gameover.mp3'); //game over sound
const movesound = new Audio('movesound.mp3'); //move sound
const musicsound = new Audio('musicsound.mp3');
let speed = 5;
let lastPaintTime = 0; 
let score =0;
let snakeArr =[
    {x :13, y :15} //snak is an array
];
food ={x:6,y:7}; //food is object its partical

// Game functions

function main(ctime){
    musicsound.play();
    window.requestAnimationFrame(main); //it will call repeatly
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
    
function gameEngine(){
    //Part 1 : Updating the snake array
    if(isCollide(snakeArr)){
        gameOversound.play();
        musicsound.pause();
        let inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr =[{x :13, y :15}];
        musicsound.play();
        score =0;
    }
    //if you have eatan the food, increment the score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score +=1;
        if(score>hiscoreval){
            hiscoreval =score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML ="hiscore: " + hiscoreval;
        }
        scoreBox.innerHTML="Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a=2;
        let b=16;
        food ={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }

    //moving the snake
    for (let i =snakeArr.length-2; i >=0; i--) {
        
        snakeArr[i+1]={...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2 : Display the snake and food
    // Display the snake 

    board.innerHTML =""; // first clean board snake clear
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    // Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


}

// main logic starts here
// High score of game
    let hiscore = localStorage.getItem("hiscore");
    if(hiscore === null){
        hiscoreval =0;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
    }
    else{
        hiscoreval=JSON.parse(hiscore);
        hiscoreBox.innerHTML ="Hiscore: " + hiscore;
    }

    //Creating controls of the game
    window.requestAnimationFrame(main);
    window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; // start the game
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;                
        default:
            break;
    }
    });