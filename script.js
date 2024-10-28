console.log("Tic-Toc-Toe!");

const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const resultBtn=document.querySelector('.btn');

let currentPlayer;
let gameGrid;
const WinPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initialize game
function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });

    resultBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();


// access box and adding event listener
//index --which box has been clicked

    boxes.forEach((box,index)=>{
        box.addEventListener("click",()=>{
            handleClick(index);
        })
    })



    function swapTurn()
    {
        if(currentPlayer==="X")
        {
            currentPlayer="O";
        }
        else
        {
            currentPlayer="X";
        }

        //update on UI to see current player
        gameInfo.innerText=`Current Player -${currentPlayer}`;
    }
    
    function checkGameOver() {
        let answer = "";
    
        WinPositions.forEach((position) => {
            //all 3 boxes should be non-empty and exactly same in value
            if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
                && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
    
                    //check if winner is X
                    if(gameGrid[position[0]] === "X") 
                        answer = "X";
                    else {
                        answer = "O";
                    } 
                        
    
                    //disable pointer events
                    boxes.forEach((box) => {
                        box.style.pointerEvents = "none";
                    })
    
                    //now we know X/O is a winner
                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");
                }
        });
    
        //it means we have a winner
        if(answer !== "" ) {
            gameInfo.innerText = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return;
        }
    
        //We know, NO Winner Found, let's check whether there is tie
        let fillCount = 0;
        gameGrid.forEach((box) => {
            if(box !== "" )
                fillCount++;
        });
    
        //board is Filled, game is TIE
        if(fillCount === 9) {
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }
        resultBtn.classList.add("active");
    }
    
    function handleClick(index)
    {
        if(gameGrid[index]==="")
        {
              boxes[index].innerText=currentPlayer;
              gameGrid[index]=currentPlayer;
            //   
               boxes[index].style.pointerEvents="none";
             //swap
             swapTurn(); 
            //   check winner
            checkGameOver();
        }

    }

    resultBtn.addEventListener("click",initGame);