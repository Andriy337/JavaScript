function startGame() {
    score = 0; 
    const menu = document.getElementById('menu');
    menu.style.display = 'none'; 

    const difficulty = document.getElementById('difficulty').value;
    const color = document.getElementById('color').value;

    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    document.body.appendChild(gameContainer);


    let squareSize;
    if (difficulty === 'easy') {
        squareSize = 100; 
    } else if (difficulty === 'medium') {
        squareSize = 100 / 2; 
    } else {
        squareSize = 100 / 3; 
    }

    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.textContent = 'Рахунок: 0';
    gameContainer.appendChild(scoreDisplay);

    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.textContent = 'Час: ';
    gameContainer.appendChild(timerDisplay);

    let timer;
    
    if (difficulty === 'easy') {
        timer = 5000; 
    } else if (difficulty === 'medium') {
        timer = 3000; 
    } else {
        timer = 2000; 
    }
    startTimer(); 

    
    const target = document.createElement('div');
    target.id = 'target';
    target.className = 'square';
    target.style.backgroundColor = color;
    target.style.width = squareSize + 'px';
    target.style.height = squareSize + 'px';
    gameContainer.appendChild(target);

    
    target.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = 'Рахунок: ' + score;
        resetTimer();
        moveTarget();
    });

    function startTimer() {
        timerDisplay.textContent = 'Час: ' + (timer / 1000) + ' с';
        interval = setInterval(() => {
            timer -= 1000;
            timerDisplay.textContent = 'Час: ' + (timer / 1000) + ' с';
            if (timer <= 0) {
                clearInterval(interval);
                endGame();
            }
        }, 1000);
    }

    function resetTimer() {
        if (difficulty === 'easy') {
            timer = 5000; 
        } else if (difficulty === 'medium') {
            timer = 3000; 
        } else {
            timer = 2000; 
        }
        clearInterval(interval);
        startTimer();
    }

    function moveTarget() {
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;
        const squareRect = target.getBoundingClientRect();
        const squareWidth = squareRect.width;
        const squareHeight = squareRect.height;
        const maxX = windowWidth - squareWidth;
        const maxY = windowHeight - squareHeight;
        
        
        let dispersalCoefficient;
        if (difficulty === 'easy') {
            dispersalCoefficient = 0.5; 
        } else if (difficulty === 'medium') {
            dispersalCoefficient = 0.7; 
        } else {
            dispersalCoefficient = 1.0; 
        }

        
        function getRandomCoordinate(maxValue, coefficient) {
            return Math.random() * (maxValue * coefficient);
        }

       
        const randomX = getRandomCoordinate(maxX, dispersalCoefficient);
        const randomY = getRandomCoordinate(maxY, dispersalCoefficient);

        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';
    }

    function endGame() {
        alert('Гра закінчена! Ваш рахунок: ' + score);
        document.body.removeChild(gameContainer);
        menu.style.display = 'block'; 
    }
}



