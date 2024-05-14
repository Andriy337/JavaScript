const gamesData = [
    {
        matrix: [
            [1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [0, 1, 0, 0, 1]
        ],
        movesToWin: 7
    },
    {
        matrix: [
            [1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0]
        ],
        movesToWin: 8
    },
    {
        matrix: [
            [1, 0, 0, 0, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 0, 1, 1],
            [0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0]
        ],
        movesToWin: 9
    }
];

let currentGameIndex = 0;
let moves = 0;
let timerInterval;
let currentMatrix = [];

function createGameBoard(matrix) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    matrix.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            if (cell === 1) {
                cellDiv.classList.add('active');
            }
            cellDiv.dataset.row = rowIndex;
            cellDiv.dataset.col = colIndex;
            cellDiv.addEventListener('click', toggleCell);
            rowDiv.appendChild(cellDiv);
        });

        gameContainer.appendChild(rowDiv);
    });
}

function toggleCell(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const gameData = gamesData[currentGameIndex];

    toggleCellState(currentMatrix, row, col);
    toggleCellState(currentMatrix, row - 1, col);
    toggleCellState(currentMatrix, row + 1, col);
    toggleCellState(currentMatrix, row, col - 1);
    toggleCellState(currentMatrix, row, col + 1);

    createGameBoard(currentMatrix);

    moves++;
    updateMovesCounter();

    checkWinCondition(gameData);
}

function toggleCellState(matrix, row, col) {
    if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
        matrix[row][col] = 1 - matrix[row][col]; // Переключення між 0 і 1
    }
}

function updateMovesCounter() {
    const movesSpan = document.getElementById('moves');
    movesSpan.textContent = moves;
}

function checkWinCondition(gameData) {
    const totalCells = currentMatrix.length * currentMatrix[0].length;
    let activeCells = 0;

    currentMatrix.forEach(row => {
        row.forEach(cell => {
            if (cell === 1) {
                activeCells++;
            }
        });
    });

    if (activeCells === 0) {
        handleWin();
    }
}

function handleWin() {
    clearInterval(timerInterval);
    alert(`Ви виграли за ${moves} ходів і ${document.getElementById('time').textContent} секунд!`);
}

function updateTimer() {
    const timeSpan = document.getElementById('time');
    let currentTime = parseInt(timeSpan.textContent);
    currentTime++;
    timeSpan.textContent = currentTime;
}

function startGame() {
    clearInterval(timerInterval);
    moves = 0;
    updateMovesCounter();
    const gameData = gamesData[currentGameIndex];
    currentMatrix = JSON.parse(JSON.stringify(gameData.matrix)); // Використовуємо матрицю з поточного рівня
    createGameBoard(currentMatrix);
    document.getElementById('time').textContent = 0;
    timerInterval = setInterval(updateTimer, 1000);
}

function restartGame() {
    clearInterval(timerInterval);
    moves = 0;
    updateMovesCounter();
    const gameData = gamesData[currentGameIndex];
    currentMatrix = JSON.parse(JSON.stringify(gameData.matrix)); // Використовуємо матрицю з поточного рівня
    createGameBoard(currentMatrix);
    document.getElementById('time').textContent = 0;
}

function newGame() {
    currentGameIndex = (currentGameIndex + 1) % gamesData.length; // Обираємо наступний рівень
    startGame();
}

document.getElementById('new-game-btn').addEventListener('click', newGame);
document.getElementById('restart-btn').addEventListener('click', restartGame);

startGame();
