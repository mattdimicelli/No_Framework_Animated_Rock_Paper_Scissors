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
    else if ((playerSelection === 'Rock' && computerSelection === 'Rock') ||
            (playerSelection === 'Paper' && computerSelection === 'Paper') ||
            (playerSelection === 'Scissors' && computerSelection === 'Scissors')) {
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
    }

    function renderScore() {
        pScore.textContent = `Player score: ${playerScore}`;
        cScore.textContent = `Computer score: ${computerScore}`;
    }

    function renderAnimation() {
        
        //based on playerselection, create appropriate image an add
        const playerImg = document.createElement('img');
        playerImg.classList.add('animation-img', 'left');
        const playerSrc = `./images/${playerSelection.toLowerCase()}.png`;
        playerImg.src = playerSrc;
        playerImg.alt = playerSelection;
        //append the image to the <section class="animation"></section>
        const section = document.querySelector('section.animation');
        //it should have classes .animation-img, .left
        //add the right image for the comp selection to it as well.
        const compImg = document.createElement('img');
        compImg.classList.add('animation-img', 'right');
        const compSrc = `./images/${computerSelection.toLowerCase()}.png`;
        compImg.src = compSrc;
        compImg.alt = computerSelection;

        section.append(playerImg, compImg);
        //it should have .animation-img, .right 
        setTimeout(() => {
            playerImg.classList.remove('left');
            compImg.classList.remove('right');
        }, 2000);
        //remove those two classes
        //after 2 seconds add the classes back on 
        //remove the images from the DOM


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