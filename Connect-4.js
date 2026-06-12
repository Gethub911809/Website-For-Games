let board = [];

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
    column.setAttribute('onclick', `placePiece(${col}, 1)`);
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
function placePiece(col, player) {
    for (let row = 5; row >= 0; row--) {
        if (board[row][col] === "") {

            board[row][col] = player;

            return;
        }
    }
}