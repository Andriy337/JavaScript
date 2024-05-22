document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('gameBoard');
    const resultDiv = document.getElementById('result');
    const newGameBtn = document.getElementById('newGame');
    const restartBtn = document.getElementById('restart');
    const movesDisplay = document.getElementById('moves');
    const targetDisplay = document.getElementById('target');
    const timerDisplay = document.getElementById('timer');

    let size = 5; // Розмір дошки
    let lights = []; // Масив станів світла (1 - увімкнуто, 0 - вимкнено)
    let moves = 0; // Кількість ходів
    let targetMoves = 0; // Цільова кількість ходів
    let timerInterval; // Інтервал для таймера
    let timer = 0; // Таймер
    let currentMatrixIndex = 0; // Індекс поточної матриці

    // Ініціалізація гри
    function initializeGame() {
        fetch('data.json') // Замініть 'data.json' на шлях до вашого JSON-файлу
            .then(response => response.json())
            .then(data => {
                lights = data.startMatrices; // Змінили змінну з data на data.startMatrices
                targetMoves = lights[currentMatrixIndex].min_moves; // Змінили змінну з data на lights
                moves = 0;
                movesDisplay.textContent = moves;
                targetDisplay.textContent = `${targetMoves}`;
                renderLights();
                resetTimer();
            })
            .catch(error => {
                console.error('Не вдалося отримати дані:', error);
            });
    }    

   // Відобразити світло
function renderLights() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const lightDiv = document.createElement('div');
            lightDiv.className = 'light';
            lightDiv.dataset.row = i;
            lightDiv.dataset.col = j;
            if (lights[currentMatrixIndex].matrix[i][j] === 1) { // Оновлено доступ до даних
                lightDiv.classList.add('on');
            }
            lightDiv.addEventListener('click', toggleLight);
            gameBoard.appendChild(lightDiv);
        }
        gameBoard.appendChild(document.createElement('br'));
    }
}

// Перемикнути світло
function toggleLight(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (lights[currentMatrixIndex].matrix[row][col] === 1) { // Оновлено доступ до даних
        // якщо світло увімкнене, змінити його стан на вимкнений
        lights[currentMatrixIndex].matrix[row][col] = 0; // Оновлено доступ до даних
        moves++;
        movesDisplay.textContent = `${moves}`;
    } else {
        // якщо світло вимкнене, змінити його стан на увімкнений
        lights[currentMatrixIndex].matrix[row][col] = 1; // Оновлено доступ до даних
        moves++;
        movesDisplay.textContent = `${moves}`;
    }

    // змінити стан сусідніх світлових комірок
    if (row > 0) lights[currentMatrixIndex].matrix[row - 1][col] = 1 - lights[currentMatrixIndex].matrix[row - 1][col]; // Оновлено доступ до даних
    if (row < size - 1) lights[currentMatrixIndex].matrix[row + 1][col] = 1 - lights[currentMatrixIndex].matrix[row + 1][col]; // Оновлено доступ до даних
    if (col > 0) lights[currentMatrixIndex].matrix[row][col - 1] = 1 - lights[currentMatrixIndex].matrix[row][col - 1]; // Оновлено доступ до даних
    if (col < size - 1) lights[currentMatrixIndex].matrix[row][col + 1] = 1 - lights[currentMatrixIndex].matrix[row][col + 1]; // Оновлено доступ до даних

    renderLights();

    if (checkWin()) {
        resultDiv.textContent = `You win! Moves: ${moves}`;
    }
}


    // Перевірити, чи виграли
    function checkWin() {
        return lights.every(row => row.matrix.every(light => light === 0)); // Змінили lights.every(row => row.every(light => light === 0)); на lights.every(row => row.matrix.every(light => light === 0));
    }

    // Почати нову гру
    newGameBtn.addEventListener('click', function() {
        currentMatrixIndex = (currentMatrixIndex + 1) % lights.length;
        resetGame();
    });

    // Перезапустити гру
    restartBtn.addEventListener('click', function() {
        initializeGame();
    });

    // Скинути гру
    function resetGame() {
        resultDiv.textContent = '';
        moves = 0;
        movesDisplay.textContent = `${moves}`;
        initializeGame();
    }

    // Таймер
    function startTimer() {
        timerInterval = setInterval(function() {
            timer++;
            timerDisplay.textContent = `${formatTime(timer)}`;
        }, 1000);
    }

    // Скинути таймер
    function resetTimer() {
        clearInterval(timerInterval);
        timer = 0;
        timerDisplay.textContent = '0:00';
        startTimer();
    }

    // Функція форматування часу
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Ініціалізувати гру при завантаженні сторінки
    initializeGame();
});