const gameBoard = (() => {
    const arr = [["X", "X", "O"], ["O", "X", "O"], ["O", "X", "X"]];
    return {
        arr,
    }
})();

function Player() {

};
//at this point, no clue what objects above will do?

//set up to render the contents of the gameboard array to webpage

function addGameboard () {
    const gameContainer = document.querySelector(".gameboard");
    for (let i = 0; i < gameBoard.arr.length; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("gamerow");
        for (let j = 0; j < gameBoard.arr[i].length; j++) {
            const newSquare = document.createElement("div");
            newSquare.innerHTML = gameBoard.arr[i][j];
            newRow.appendChild(newSquare);
        }
        gameContainer.appendChild(newRow);
    }
}

addGameboard();

//need to build funciton to allow players to add signs;