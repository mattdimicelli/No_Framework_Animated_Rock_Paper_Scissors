let playerScore = 0;
let computerScore = 0;
let rounds = 0;

const rockBtn = document.querySelector('.rock-btn');
const paperBtn = document.querySelector('.paper-btn');
const scissorsBtn = document.querySelector('.scissors-btn');
const pScore = document.querySelector('p.player-score');
const cScore = document.querySelector('p.computer-score');
const resultPara = document.querySelector('p.msg');
const resultPara2 = document.querySelector('p.msg2');

pScore.textContent = 'Player score: 0';
cScore.textContent = 'Computer score: 0';

rockBtn.addEventListener('click', handleButtonClick);
paperBtn.addEventListener('click', handleButtonClick);
scissorsBtn.addEventListener('click', handleButtonClick);

function handleButtonClick(e) {
    let weapon;
    if (e.target.className === 'btn-img rock') weapon = 'Rock';
    if (e.target.className === 'btn-img paper') weapon = 'Paper';
    if (e.target.className === 'btn-img scissors') weapon = 'Scissors';
    playSingleRound(weapon, generateRandomComputerPlay());
    deletePreviousWinnerAndLoser();
}

function generateRandomComputerPlay() {
    const PLAYS = ['Rock', 'Paper', 'Scissors'];
    return PLAYS[Math.floor(Math.random() * PLAYS.length)];
}

function playSingleRound(playerSelection, computerSelection) {
    renderAnimation();

    if ((playerSelection === 'Rock' && computerSelection === 'Scissors') || 
        (playerSelection === 'Paper' && computerSelection === 'Rock') ||
        (playerSelection === 'Scissors' && computerSelection === 'Paper')) {
        winRound();
    }
    else if (playerSelection === computerSelection) {
        tieRound();
    }
    else {
        loseRound();
    }

    if (rounds === 5) endGame();

    function winRound() {
        playerScore++;
        rounds += 1;
        renderScore();
        renderRoundWinner('player');
    }

    function tieRound() {
        rounds += 1;
        renderScore();
        renderRoundWinner();
    }

    function loseRound() {
        computerScore++;
        rounds += 1;
        renderScore();
        renderRoundWinner('computer');
    }

    function renderRoundWinner(winner) {
        setTimeout(() => {
            switch (winner) {
                case 'player':
                    resultPara.textContent = `You win the round!  ${playerSelection} beats ${computerSelection}!`;
                    break;
                case 'computer':
                    resultPara.textContent = `You lose the round!  ${computerSelection} beats ${playerSelection}!`;
                    break;
                default:
                    resultPara.textContent = `You both threw ${playerSelection}.  Go again!`;
                    break;
            }
        }, 900);  // delay message so that it jives with the animation
    }

    function renderScore() {
        setTimeout(() => {
            pScore.textContent = `Player score: ${playerScore}`;
            cScore.textContent = `Computer score: ${computerScore}`;
        }, 900); // delay score update so that it jives w/ the animation
    }

    function renderAnimation() { 
        const playerImg = document.createElement('img');
        playerImg.classList.add('animation-img', 'left-initial', 'left-final');
        const playerSrc = `./images/${playerSelection.toLowerCase()}.png`;
        playerImg.src = playerSrc;
        playerImg.alt = playerSelection;
        const section = document.querySelector('section.animation');
        const compImg = document.createElement('img');
        compImg.classList.add('animation-img', 'right-initial', 'right-final');
        const compSrc = `./images/${computerSelection.toLowerCase()}.png`;
        compImg.src = compSrc;
        compImg.alt = computerSelection;
        section.append(playerImg, compImg);
        setTimeout(moveImgsToCenter, 400);

        function removeImgs() {
            playerImg.remove();
            compImg.remove();
        }
        function moveImgsOffScreen() {
            playerImg.classList.add('left-initial');
            compImg.classList.add('right-initial');
            setTimeout(removeImgs, 650);
        }
        function moveImgsToCenter() {
            playerImg.classList.remove('left-initial');
            compImg.classList.remove('right-initial');
            setTimeout(moveImgsOffScreen, 2000);
        }
    }

}

function endGame() {
    announceGameWinner();
    resetScores();

    function announceGameWinner() {
        resultPara.textContent = '';
        if (playerScore > computerScore) {
            resultPara2.textContent = 'You win the game!  PLAY AGAIN!';
        }
        else if (playerScore === computerScore) {
            resultPara2.textContent = 'Tie game!  PLAY AGAIN!';
        }
        else if (playerScore < computerScore) {
            resultPara2.textContent = 'You lose the game!  PLAY AGAIN!';
        }
    }

    function resetScores() {
        rounds = 0;
        playerScore = 0;
        computerScore = 0;
    }
}

function deletePreviousWinnerAndLoser() {
    if (resultPara2.textContent) resultPara2.textContent = '';
}