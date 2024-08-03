let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameModeSelection = document.querySelector(".game-mode-selection");
let gameContainer = document.querySelector(".game");
let playerVsPlayerBtn = document.querySelector("#player-vs-player");
let playerVsAIBtn = document.querySelector("#player-vs-ai");

let turnO = true;
let againstAI = false;

const winPatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

const makeAIMove = () => {
    let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (availableBoxes.length > 0) {
        let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        randomBox.innerText = 'X';
        randomBox.classList.add("x-player");
        randomBox.disabled = true;
        turnO = true; // Switch back to player O's turn
        checkWinner();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // Player O
            box.innerText = 'O';
            box.classList.add("o-player");
            box.classList.remove("x-player");
            box.disabled = true;
            turnO = false;
            checkWinner();
            if (!turnO && againstAI) {
                setTimeout(makeAIMove, 500); // AI makes a move after a short delay
            }
        } else if (!againstAI) { // Player X in Player vs Player mode
            box.innerText = "X";
            box.classList.add("x-player");
            box.classList.remove("o-player");
            box.disabled = true;
            turnO = true;
            checkWinner();
        }
    });
});

const disabledBoxes = () => { // Disable all boxes when the game ends
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => { // Enable all boxes when the game starts
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-player");
        box.classList.remove("x-player");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const showDraw = () => {
    msg.innerText = "Game is a Draw!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }

    if (!winnerFound) {
        let allBoxesFilled = Array.from(boxes).every(box => box.innerText !== "");
        if (allBoxesFilled) {
            showDraw();
        }
    }
};

playerVsPlayerBtn.addEventListener("click", () => {
    againstAI = false;
    gameModeSelection.classList.add("hide");
    gameContainer.classList.remove("hide");
    resetGame();
    console.log("Player vs Player mode selected");
});

playerVsAIBtn.addEventListener("click", () => {
    againstAI = true;
    gameModeSelection.classList.add("hide");
    gameContainer.classList.remove("hide");
    resetGame();
    console.log("Player vs AI mode selected");
});

newGameBtn.addEventListener("click", () => {
    gameModeSelection.classList.remove("hide");
    gameContainer.classList.remove("hide"); // Keep the game container visible
    resetGame();
    console.log("New game initiated");
});

resetBtn.addEventListener("click", resetGame);
