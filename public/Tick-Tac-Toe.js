let gameBoard = [["1","2","3"],["4","5","6"],["7","8","9"]];
let winningCells = [];
let turnCounter = 0;
let twoPlayer = true;
let playing = true;
let dificulty = 1;
function printBoard(){
    const text = document.getElementById("text");

    text.innerHTML = `
        <button class="${getClass(gameBoard[0][0],1)}" onclick="modifyArray(1,getTurn())">${gameBoard[0][0]}</button>
        <button class="${getClass(gameBoard[0][1],2)}" onclick="modifyArray(2,getTurn())">${gameBoard[0][1]}</button>
        <button class="${getClass(gameBoard[0][2],3)}" onclick="modifyArray(3,getTurn())">${gameBoard[0][2]}</button>

        <button class="${getClass(gameBoard[1][0],4)}" onclick="modifyArray(4,getTurn())">${gameBoard[1][0]}</button>
        <button class="${getClass(gameBoard[1][1],5)}" onclick="modifyArray(5,getTurn())">${gameBoard[1][1]}</button>
        <button class="${getClass(gameBoard[1][2],6)}" onclick="modifyArray(6,getTurn())">${gameBoard[1][2]}</button>

        <button class="${getClass(gameBoard[2][0],7)}" onclick="modifyArray(7,getTurn())">${gameBoard[2][0]}</button>
        <button class="${getClass(gameBoard[2][1],8)}" onclick="modifyArray(8,getTurn())">${gameBoard[2][1]}</button>
        <button class="${getClass(gameBoard[2][2],9)}" onclick="modifyArray(9,getTurn())">${gameBoard[2][2]}</button>
    `;
}
function modifyArray(num,Turn){
    while (playing == true){
        let row = Math.floor((num-1)/3); 
        let col = (num-1) % 3; 
        console.log(row);
        console.log(col);
        if(gameBoard[row][col] == 'X' || gameBoard[row][col] == 'O'){
            return
        }
        gameBoard[row][col] = Turn;
        printBoard();
        turnCounter++
        checkWinner();
        if (twoPlayer == false && (turnCounter%2 == 1) && (turnCounter <9) && (playing == true)){
            console.log("computer")
            computerChoice();
        }
    }
}
function getTurn(){
    if ((turnCounter%2) == 0){
        return 'X'
    }else if ((turnCounter%2) == 1){
        return 'O'
    }
}
function checkWinner(){
    for (let x = 0; x <= 1; x++){
        let player;
        if (x===0){
            player = 'X'
        }else{
            player = 'O'
        }
        for (let n = 0 ; n <3; n++){ 
            if (gameBoard[n][0]===(player) &&  
            gameBoard[n][1]===(player) && 
            gameBoard[n][2]===(player)){ 
                winningCells = [n*3 + 1, n*3 + 2, n*3 + 3];
                printWinner(player); 
                playing = false;
                return; 
            } 
            if (gameBoard[0][n]===(player) &&  
            gameBoard[1][n]===(player) && 
            gameBoard[2][n]===(player)){ 
                winningCells = [n + 1, n + 4, n + 7];
                printWinner(player); 
                playing = false;
                return; 
            } 
        } 
        if (gameBoard[0][0]===(player) && 
        gameBoard[1][1]===(player) && 
        gameBoard[2][2]===(player)){ 
            winningCells = [1,5,9];
            printWinner(player); 
            playing = false;
            return; 
        } 
        if (gameBoard[0][2]===(player) && 
        gameBoard[1][1]===(player) && 
        gameBoard[2][0]===(player)){ 
            winningCells = [3,5,7];
            printWinner(player); 
            playing = false;
            return; 
        } 
        if (turnCounter == 9){ 
            printBoard(); 
            const winnerText = document.getElementById("winner-text");
            winnerText.innerText = "The game is a tie";
            const resetButton = document.getElementById("reset-button-container");
            resetButton.innerHTML = `<button onclick="reset()">Reset</button>`;
            playing = false;
            return; 
        }
    }
}
function printWinner(player){
    const winnerText = document.getElementById("winner-text");
    winnerText.innerText = `The winner is ${player}`;
    const resetButton = document.getElementById("reset-button-container");
    resetButton.innerHTML = `<button onclick="reset()">Reset</button>`;
    printBoard();
}
function twoPlayerTrue(){
    twoPlayer = true;
    document.getElementById("two-player-btn").classList.add("active");
    document.getElementById("computer-btn").classList.remove("active");
    const dificultyRow = document.getElementById("dificulty-row");
    dificultyRow.innerHTML = ``
}
function twoPlayerFalse(){
    twoPlayer = false;
    document.getElementById("computer-btn").classList.add("active");
    document.getElementById("two-player-btn").classList.remove("active");

    const dificultyRow = document.getElementById("dificulty-row");
    dificultyRow.innerHTML = `
      <button class="dificulty-btn" id="dificulty-btn-easy" onclick="dificultyEasy()">Easy</button>
      <button class="dificulty-btn" id="dificulty-btn-mid" onclick="dificultyMid()">Medium</button>
      <button class="dificulty-btn" id="dificulty-btn-hard" onclick="dificultyHard()">Hard</button>`;
}
function dificultyEasy(){
    dificulty = 1;
    document.getElementById("dificulty-btn-easy").classList.add("active");
    document.getElementById("dificulty-btn-mid").classList.remove("active");
    document.getElementById("dificulty-btn-hard").classList.remove("active");

}
function dificultyMid(){
    dificulty = 2;
    document.getElementById("dificulty-btn-easy").classList.remove("active");
    document.getElementById("dificulty-btn-mid").classList.add("active");
    document.getElementById("dificulty-btn-hard").classList.remove("active");
}
function dificultyHard(){
    dificulty = 3;
    document.getElementById("dificulty-btn-easy").classList.remove("active");
    document.getElementById("dificulty-btn-mid").classList.remove("active");
    document.getElementById("dificulty-btn-hard").classList.add("active");
}
function computerChoice(){
    console.log(dificulty);
    if (dificulty == 1){
        let random = Math.floor(Math.random()*9)+1;
        let row = Math.floor((random-1)/3); 
        let col = (random-1) % 3; 
        console.log("comp");
        console.log(random);
        console.log(row);
        console.log(col);
        while ((gameBoard[row][col] == 'X') || (gameBoard[row][col] == 'O')){
            random = Math.floor(Math.random()*9)+1;
            row = Math.floor((random-1)/3); 
            col = (random-1) % 3; 
        }
        modifyArray(random,getTurn())
    }
    if (dificulty != 1){
        console.log("in loop");
        for (let i = 0; i<2 ; i++){ 
            if(i == 0){ 
                player = 'O'; 
            }else{ 
                player = 'X'; 
            } 
            if(gameBoard[0][1]===(player) && gameBoard[0][2]===(player)|| 
            gameBoard[1][0]===(player) && gameBoard[2][0]===(player)|| 
            gameBoard[1][1]===(player) && gameBoard[2][2]===(player)){ 
                if(gameBoard[0][0] == 1){ 
                    modifyArray(1,'O');
                    return
                } 
            }
            if (gameBoard[0][0]===(player) && gameBoard[0][2]===(player)|| 
            gameBoard[1][1]===(player) && gameBoard[2][1]===(player)){ 
                if(gameBoard[0][1] == 2){ 
                    modifyArray(2,'O');
                    return
                } 
            }
            if (gameBoard[0][0]===(player) && gameBoard[0][1]===(player)|| 
            gameBoard[2][0]===(player) && gameBoard[1][1]===(player)|| 
            gameBoard[2][2]===(player) && gameBoard[2][1]===(player)){ 
                if(gameBoard[0][2] == 3){ 
                    modifyArray(3,'O');
                    return
                } 
            }
            if (gameBoard[0][0]===(player) && gameBoard[2][0]===(player)|| 
            gameBoard[1][1]===(player) && gameBoard[1][2]===(player)){ 
                if(gameBoard[1][0] ==4){ 
                    modifyArray(4,'O');
                    return
                } 
            }
            if (gameBoard[1][0]===(player) && gameBoard[1][2]===(player)|| 
            gameBoard[0][1]===(player) && gameBoard[2][1]===(player)|| 
            gameBoard[2][0]===(player) && gameBoard[0][2]===(player)|| 
            gameBoard[0][0]===(player) && gameBoard[2][2]===(player)){ 
                if(gameBoard[1][1] == 5){ 
                    modifyArray(5,'O');
                    return
                } 
            }
            if (gameBoard[0][2]===(player) && gameBoard[2][2]===(player)|| 
            gameBoard[1][0]===(player) && gameBoard[1][1]===(player)){ 
                if(gameBoard[1][2] == 6){ 
                    modifyArray(6,'O');
                    return
                } 
            }
            if (gameBoard[0][0]===(player) && gameBoard[1][0]===(player)|| 
            gameBoard[0][2]===(player) && gameBoard[1][1]===(player)|| 
            gameBoard[2][1]===(player) && gameBoard[2][2]===(player)){ 
                if(gameBoard[2][0] == 7){ 
                    modifyArray(7,'O');
                    return
                } 
            }
            if (gameBoard[2][0]===(player) && gameBoard[2][2]===(player)|| 
            gameBoard[0][1]===(player) && gameBoard[1][1]===(player)){ 
                if(gameBoard[2][1] == 8){ 
                    modifyArray(8,'O');
                    return 
                } 
            }
            if (gameBoard[0][0]===(player) && gameBoard[1][1]===(player)|| 
            gameBoard[0][2]===(player) && gameBoard[1][2]===(player)|| 
            gameBoard[2][0]===(player) && gameBoard[2][1]===(player)){ 
                if(gameBoard[2][2] == 9){ 
                    modifyArray(9,'O');
                    return
                } 
            } 
        }
        if((gameBoard[1][1] == 5) && (dificulty == 3)){ 
            modifyArray(5,getTurn())
            return
        } 
        let random = Math.floor(Math.random()*9)+1;
        let row = Math.floor((random-1)/3); 
        let col = (random-1) % 3; 
        console.log("comp");
        console.log(random);
        console.log(row);
        console.log(col);
        while ((gameBoard[row][col] == 'X') || (gameBoard[row][col] == 'O')){
            random = Math.floor(Math.random()*9)+1;
            row = Math.floor((random-1)/3); 
            col = (random-1) % 3; 
        }
        modifyArray(random,getTurn())
    }
}
function reset(){
    gameBoard = [["1","2","3"],["4","5","6"],["7","8","9"]];
    winningCells = [];
    turnCounter = 0;
    playing = true
    printBoard();
    const winnerText = document.getElementById("winner-text");
    winnerText.innerText = ``;
    const resetButton = document.getElementById("reset-button-container");
    resetButton.innerHTML = ``;
}
function getClass(value, cellNum){
    let classes = "";

    if (value === 'X') classes = 'x';
    if (value === 'O') classes  = 'o';
    if (winningCells.includes(cellNum)) {
        classes += " winner";
    }
    return classes;
}
