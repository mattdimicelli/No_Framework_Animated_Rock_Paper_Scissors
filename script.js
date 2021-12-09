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

rockBtn.addEventListener('click', () => {
    deletePreviousWinnerAndLoser();
    playSingleRound('Rock', generateRandomComputerPlay());
});
paperBtn.addEventListener('click', () => {
    deletePreviousWinnerAndLoser();
    playSingleRound('Paper', generateRandomComputerPlay());
});
scissorsBtn.addEventListener('click', () => {
    deletePreviousWinnerAndLoser();
    playSingleRound('Scissors', generateRandomComputerPlay());
});

function generateRandomComputerPlay() {
    const PLAYS = ['Rock', 'Paper', 'Scissors'];
    return PLAYS[Math.floor(Math.random() * PLAYS.length)];
}

function playSingleRound(playerSelection, computerSelection) {
    const WINNING_COMBOS = ['Rock, Scissors', 'Paper, Rock', 'Scissors, Paper'];
    const TIE_COMBOS = ['Rock, Rock', 'Paper, Paper', 'Scissors, Scissors'];

    const currentCombo = playerSelection + ', ' + computerSelection;

    if (WINNING_COMBOS.includes(currentCombo)) {
        winRound();
    }
    else if (TIE_COMBOS.includes(currentCombo)) {
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