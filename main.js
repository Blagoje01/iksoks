const x_class = "x";
const circle_class = "circle";
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const container = document.getElementById("container");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageElement = document.querySelector(".winning-message");
const restartBtn = document.getElementById("restartBtn");
let circleTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;

  cellElements.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(circle_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHover();

  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  //place mark
  placeMark(cell, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setHover();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `Draw!`;
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setHover() {
  container.classList.remove(x_class);
  container.classList.remove(circle_class);

  if (circleTurn) {
    container.classList.add(circle_class);
  } else {
    container.classList.add(x_class);
  }
}

function checkWin(currentClass) {
  return winning_combinations.some((comb) => {
    return comb.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
