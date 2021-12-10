let playerScore = 0;
let computerScore = 0;
let round = 1;  // the first round is round 1

let rockBtn = document.querySelector('.rock-btn');
let paperBtn = document.querySelector('.paper-btn');
let scissorsBtn = document.querySelector('.scissors-btn');
let pScore = document.querySelector('span.player-score');
let cScore = document.querySelector('span.computer-score');
let resultPara = document.querySelector('p.msg');
let resultPara2 = document.querySelector('p.msg2');

pScore.textContent = '0';
cScore.textContent = '0';

rockBtn.addEventListener('click', handleButtonClick);
paperBtn.addEventListener('click', handleButtonClick);
scissorsBtn.addEventListener('click', handleButtonClick);

function handleButtonClick(e) {
    deletePreviousWinnerAndLoser();
    let weapon;
    if (e.target.className === 'btn-img rock') weapon = 'Rock';
    if (e.target.className === 'btn-img paper') weapon = 'Paper';
    if (e.target.className === 'btn-img scissors') weapon = 'Scissors';
    playSingleRound(weapon, generateRandomComputerPlay());
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

    if (round === 6) endGame();

    function winRound() {
        playerScore++;
        round += 1;
        renderScore();
        renderRoundWinner('player');
        updateRoundNumber();
    }

    function tieRound() {
        round += 1;
        renderScore();
        renderRoundWinner();
        updateRoundNumber();
    }

    function loseRound() {
        computerScore++;
        round += 1;
        renderScore();
        renderRoundWinner('computer');
        updateRoundNumber();
    }

    function updateRoundNumber() {
        setTimeout(() => {
            let roundNumber = document.querySelector('span.round');
            roundNumber.textContent = round;
        }, 2900); // delay message so that it jives with the animation
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
            pScore.textContent = playerScore;
            cScore.textContent = computerScore;
        }, 2900); // delay score update so that it jives w/ the animation
    }

    function renderAnimation() { 
        let playerImg = document.createElement('img');
        playerImg.classList.add('animation-img', 'left-initial', 'left-final');
        const playerSrc = `./images/${playerSelection.toLowerCase()}.png`;
        if (playerSelection === 'Scissors') playerImg.classList.add('facing-right');
        playerImg.src = playerSrc;
        playerImg.alt = playerSelection;
        let section = document.querySelector('section.animation');
        let compImg = document.createElement('img');
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
        setTimeout(() => {
            if (playerScore > computerScore) {
                resultPara2.textContent = 'You win the game!  PLAY AGAIN!';
            }
            else if (playerScore === computerScore) {
                resultPara2.textContent = 'Tie game!  PLAY AGAIN!';
            }
            else if (playerScore < computerScore) {
                resultPara2.textContent = 'You lose the game!  PLAY AGAIN!';
            }
        }, 900);
    }

    function resetScores() {
        round = 1;
        playerScore = 0;
        computerScore = 0;
    }
}

function deletePreviousWinnerAndLoser() {
    if (resultPara2.textContent) resultPara2.textContent = '';
}