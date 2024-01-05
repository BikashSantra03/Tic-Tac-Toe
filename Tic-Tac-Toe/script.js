const gameInfo = document.querySelector(".game-info");

const boxes = document.querySelectorAll(".box");

const newGamebtn = document.querySelector(".new-game-btn");

let currentPlayer;

// All possible combinations to win
const winingPositions = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

let currentGameGrid; // defines which fields are filled currently

// Initialize the game
function initGame() {
  currentPlayer = "x";
  gameInfo.style.backgroundColor = "#E26EE5";
  currentGameGrid = ["", "", "", "", "", "", "", "", ""];

  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;

  //  make UI grid empty
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    // box.classList = `box box-${index + 1}`;
    box.classList.remove("win");
  });

  newGamebtn.classList.remove("active");
}
initGame();
newGamebtn.addEventListener("click", initGame);

function swapTurn() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  gameInfo.style.backgroundColor =
    currentPlayer === "x" ? "#E26EE5" : "#7E2553";

  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
}

function checkGameOver() {
  let winner = "";
  // checking any player mactches the winning combinations
  // boxces should be non empty and same then winner
  winingPositions.forEach((position) => {
    if (
      currentGameGrid[position[0]] != "" &&
      currentGameGrid[position[1]] != "" &&
      currentGameGrid[position[2]] != "" &&
      currentGameGrid[position[0]] === currentGameGrid[position[1]] &&
      currentGameGrid[position[1]] === currentGameGrid[position[2]]
    ) {
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      winner = currentGameGrid[position[0]] === "x" ? "x" : "o";
      gameInfo.style.backgroundColor = winner === "x" ? "#E26EE5" : "#7E2553";

      // now we know winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  // checks if we get the winner
  if (winner != "") {
    gameInfo.innerText = `Winner - ${winner.toUpperCase()}`;
    newGamebtn.classList.add("active");
    return;
  }

  // checks if its a draw
  let allBoxesFilled = true;
  currentGameGrid.forEach((box) => {
    if (box === "") {
      allBoxesFilled = false;
    }
  });
  console.log("draw");
  if (allBoxesFilled) {
    gameInfo.style.backgroundColor = "";
    gameInfo.innerText = `It's a Draw`;
    newGamebtn.classList.add("active");
  }
}

function handleClick(index) {
  if (currentGameGrid[index] === "") {
    currentGameGrid[index] = currentPlayer; //Update grid in my code
    boxes[index].innerText = currentPlayer.toUpperCase(); // Update grid  on UI
    boxes[index].style.pointerEvents = "none";

    // swap player turn
    swapTurn();
    // checking game is over or not
    checkGameOver();
  }
}

// event listener for each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

/* This code is written by Bikash Santra
Linkedin : https://www.linkedin.com/in/bikash-santra-886901217/ */
