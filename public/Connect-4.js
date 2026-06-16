let board = [];
let player = 0;
let playing = true;
/*
const socket = io();

let roomCode = "";
let isMyTurn = false;
let myColor = null; // 0 = blue, 1 = red
function createRoom() {
    console.log("here");
    socket.emit("createRoom");
    console.log("here1");
}

function joinRoom(code) {
    socket.emit("joinRoom", code);
}*/

function boardInit(){
    for (let row = 0; row < 6; row++) {
        board[row] = [];

        for (let col = 0; col < 7; col++) {
            board[row][col] = "";
        }
    }
    const gameBoard = document.getElementById("gameBoard");

    for (let col = 0; col < 7; col++) {

        const column = document.createElement("a");
        column.classList.add("column");
        column.setAttribute('onclick', `placePiece(${col})`);
        column.dataset.col = col;

        for (let row = 0; row < 6; row++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            column.appendChild(cell);
        }

        gameBoard.appendChild(column);
    }
}

function placePiece(col, fromServer = false) {
    /*if (!playing) return;

    if (!fromServer && !isMyTurn) return;
    */
    if (playing == true){
        for (let row = 5; row >= 0; row--) {
            if (board[row][col] === "") {
                board[row][col] = (player%2);
                /*if (!fromServer) {
                    console.log("ROOM:", roomCode);
                    socket.emit("move", {
                        room: roomCode,
                        row,
                        col,
                        player: player % 2
                    });
                }*/
                console.log(row + " " +col);
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if(player%2 ==0){cell.classList.add("blue")}
                if(player%2 ==1){cell.classList.add("red")}
                if(checkWin(row, col, player%2) == 0 ){
                    const winnerText = document.getElementById("winner-text");
                    if(player%2 == 0){winnerText.innerText = "The Winner Is Blue"}
                    if(player%2 == 1){winnerText.innerText = "The Winner Is Red"}
                    playing = false;
                    const resetButton = document.getElementById("reset-button-container");
                    resetButton.innerHTML = `<button onclick="reset()">Reset</button>`;
                }else if (checkWin(row, col, player%2) ==1){
                    const winnerText = document.getElementById("winner-text");
                    winnerText.innerText = "The Game Is A Tie"
                    playing = false;
                    const resetButton = document.getElementById("reset-button-container");
                    resetButton.innerHTML = `<button onclick="reset()">Reset</button>`;
                }
                player++;
                return;
            }
        }
    }
}
function checkWin(row, col, playernum) {
    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal \
        [1, -1]   // diagonal /
    ];

    for (const [dr, dc] of directions) {
        let count = 1; // include current piece

        // forward direction
        let r = row + dr;
        let c = col + dc;

        while (
            r >= 0 && r < 6 &&
            c >= 0 && c < 7 &&
            board[r][c] === playernum
        ) {
            count++;
            r += dr;
            c += dc;
        }

        // backward direction
        r = row - dr;
        c = col - dc;

        while (
            r >= 0 && r < 6 &&
            c >= 0 && c < 7 &&
            board[r][c] === playernum
        ) {
            count++;
            r -= dr;
            c -= dc;
        }

        if (count >= 4) {
            return 0;
        }
    }
    if(player == 41){
        return 1
    }
    return 2;
}
function reset(){
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = ``;
    board = [];
    boardInit();
    player = 0;
    playing = true;
    const winnerText = document.getElementById("winner-text");
    winnerText.innerText = ""
    const resetButton = document.getElementById("reset-button-container");
    resetButton.innerHTML = ``;
}
/*
function placePieceFromNetwork(row, col, p) {

    board[row][col] = p;

    const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
    );

    cell.classList.add(p === 0 ? "blue" : "red");

    if (checkWin(row, col, p)) {
        const winnerText = document.getElementById("winner-text");
        winnerText.innerText = p === 0 ? "Blue Wins" : "Red Wins";
        playing = false;
    }

    player++;
}
socket.on("moveMade", ({ row, col, player }) => {
    placePieceFromNetwork(row, col, player);
});
socket.on("yourTurn", () => {
    isMyTurn = true;
});

socket.on("notYourTurn", () => {
    isMyTurn = false;
});

socket.on("roomCreated", (code) => {
    console.log("ROOM CODE:", code);

    roomCode = code;

    document.getElementById("roomCodeText").innerText =
        "Room Code: " + code;
});*/
