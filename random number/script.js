document.addEventListener('DOMContentLoaded', () => {
    let randomNum = Math.floor(Math.random() * 100) + 1;

    const inputField = document.getElementById('guessField');
    const guessSubmit = document.getElementById('submitGuess');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    const resultParas = document.querySelector('.resultParas');

    let guessCount = 1;
    let playGame = true;

    guessSubmit.addEventListener('click', function () {
        const guess = parseInt(inputField.value);
        validateCheck(guess);
    });

    function validateCheck(guess) {
        if (isNaN(guess) || guess < 1 || guess > 100) {
            displayMessage('Please enter a valid number between 1 and 100');
        } else {
            checkGuess(guess);
        }
    }

    function checkGuess(guess) {
        if (guess < randomNum) {
            displayMessage('Too Low');
        } else if (guess > randomNum) {
            displayMessage('Too High');
        } else if (guess === randomNum) {
            displayMessage(`You Got It! It took you ${guessCount} guesses.`);
            endGame();
        }
        guessCount++;
    }

    function displayMessage(message) {
        lastResult.textContent = message;
        if (message === 'You Got It!' || message.includes('valid')) {
            lowOrHi.textContent = '';
            resultParas.innerHTML = '';
        } else {
            lowOrHi.textContent = 'Wrong guess! Try again.';
            const para = document.createElement('p');
            para.textContent = `Previous guesses: ${inputField.value}`;
            resultParas.appendChild(para);
        }
    }

    const resetGameButton = document.getElementById('resetGame');

    resetGameButton.addEventListener('click', function () {
        resetGame();
    });

    function resetGame() {
        randomNum = Math.floor(Math.random() * 100) + 1;
        guessCount = 1;
        playGame = true;
        guessSubmit.disabled = false;
        inputField.value = '';
        lastResult.textContent = '';
        lowOrHi.textContent = '';
        resultParas.innerHTML = '';
        resetGameButton.style.display = 'none'; // Hide the Reset Game button
    }

    function endGame() {
        playGame = false;
        guessSubmit.disabled = true;
        resetGameButton.style.display = 'block'; // Show the Reset Game button
    }
});
