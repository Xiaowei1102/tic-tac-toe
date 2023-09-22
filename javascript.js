const gameBoard = (() => {
    const rows = 3;
    const columns = 3; 
    const arr = Array(rows).fill().map(() => Array(columns).fill(" "));
    
    return {
        arr,
    }
})();

function player(name) {
    if (name === "circle") token = "O";
    if (name === "cross") token = "X";
    return {name, token};
};

const gameControll = (() => {
    const players = [player("circle"), player("cross")];
    let isPlayerChosen = false;
    let curPlayer ;
    function switchPlayer() {
        //can not do "curPlayer === players[0]" because obviously these two objects are created differently
        if (curPlayer.token === players[0].token) {
            curPlayer = players[1];
        } else {
            curPlayer = players[0];
        }
    }
    const getCurPlayer = () => {
        return curPlayer;
    };
    //check game winning status
    function checkWinning () {
        let winner = "";
        const array = gameBoard.arr;
        for (let i = 0; i < 3; i++) {
            if(array[i][0] === array[i][1] && array[i][1] === array[i][2] && array[i][0] != " ") {
                winner = `Player ${array[i][0]} wins!`;
                return winner;
            }
        }
        for (let j = 0; j< 3; j++) {
            if(array[0][j] === array[1][j] && array[1][j] === array[2][j] && array[0][j] != " ") {
                winner = `Player ${array[0][j]} wins!`;
                return winner;
            }
        }
        if ((array[0][0] === array[1][1] && array[1][1] === array[2][2] && array[1][1] != " ") || (array[0][2] === array[1][1] && array[1][1] === array[2][0] && array[1][1] != " ")) {
            winner = `Player ${array[1][1]} wins!`
            return winner;
        }
        //if there are still places to be filled, then the game is still ongoing until all grids are filled
        
        for (let i = 0; i < 3; i++) {
            
            for (let j = 0; j < 3; j++) {
                if (array[i][j] === " ") {
                    winner = "TBD";
                    return winner;
                }
            }
        }
        return winner === "" ? "Draw game!" : winner;
    }

    return {
        /**
         * @param {{ name: any; token: any; }} value
         */
        set curPlayer(value) {
            curPlayer = value;
        },
        get curPlayer() {
            return curPlayer;
        },
        /**
         * @param {boolean} value
         */
        set isPlayerChosen(value) {
            isPlayerChosen = value;
        },
        get isPlayerChosen() {
            return isPlayerChosen;
        } ,
        getCurPlayer, switchPlayer, checkWinning}
})();
//need to build funciton to allow players to add signs;
//two ways: 
//1.change the content of div directly
//2.change the array content and then display the board
//probably choose 2 bcz later you need to use array to determine who wins the game (but maybe performance is not the best, but since there is only 9 elements, so not that bad?)
//Either way, you have to identify the element once it is clicked.
function game() {
    //if the choice between X and O are made...
    const choices = document.querySelectorAll(".playerchoice > button");
    choices.forEach(choice => {
        choice.addEventListener("click", (e) => {
            if (e.target.className === "O") {
                gameControll.curPlayer = player("circle");
            } else {
                gameControll.curPlayer = player("cross");
                
            }
            choices[0].disabled = true;
            choices[1].disabled = true;
            gameControll.isPlayerChosen = true;
        });
    });
    

    const clicks = document.querySelectorAll("[class*='column']");
    
    //add eventlistener
    let result = "";
    clicks.forEach(click => {
        click.addEventListener("click", (e) => {
            //check is player choice has been made
            if (!gameControll.isPlayerChosen) {
                alert("Please choose X or O first!");
                return;
            }
            //check if this place has been clicked before
            target = e.target;
            if (target.innerHTML === "X" || target.innerHTML === "O") {
                return;
            }
            //if the game is over, you can not click again
            if (result.includes("win") || result.includes("game") ) {
                return;
            }
            //otherwise, process the class info to get row and column index
            const clickedRow = target.className.slice(3, 4);
            const clickedColumn = target.className.slice(11, 12);
            gameBoard.arr[clickedRow][clickedColumn] = gameControll.getCurPlayer().token;
            target.innerHTML = gameControll.getCurPlayer().token;
            //switch player
            gameControll.switchPlayer();
            console.log(gameControll.getCurPlayer());
            //if one wins or draw game, create congrats message
            result = gameControll.checkWinning();
            if (result !== "TBD") {
                const gameResult = document.createElement('div');
                gameResult.innerHTML = result;
                document.querySelector(".result").appendChild(gameResult);
                //clearBoard();
            }
        });
    });
    const newGameButton = document.querySelector(".newgame");
    
    newGameButton.addEventListener("click", () => {
        clearBoard();
        result = "";
        gameControll.isPlayerChosen = false;
        choices[0].disabled = false;
        choices[1].disabled = false;
    });
}
//at this point, no clue what objects above will do?

//set up to render the contents of the gameboard array to webpage

function addGameboard () {
    const gameContainer = document.querySelector(".gameboard");
    for (let i = 0; i < gameBoard.arr.length; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add(`row${i}`);
        for (let j = 0; j < gameBoard.arr[i].length; j++) {
            const newSquare = document.createElement("div");
            newSquare.classList.add(`row${i}`);
            newSquare.classList.add(`column${j}`);
            newSquare.classList.add("grid");
            newSquare.innerHTML = gameBoard.arr[i][j];
            newRow.appendChild(newSquare);
        }
        gameContainer.appendChild(newRow);
    }
    const newGame = document.createElement('button');
    newGame.innerHTML = "New Game";
    newGame.classList.add("newgame");
    document.body.appendChild(newGame);
}



function clearBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard.arr[i][j] = " ";
        }
    }
    //clear the current board;
    //document.querySelector(".gameboard").replaceChildren();
    //document.querySelector(".newgame").replaceChildren();
    const grids = document.querySelectorAll("[class*='column']");
    grids.forEach(grid => {
        grid.innerHTML = " ";
    })
    document.querySelector(".result").replaceChildren();
}




addGameboard();
game();
