const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scorep1 = document.getElementById("score--0");
const scorep2 = document.getElementById("score--1");
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const diceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//initial conditions

let scores, currentScore, activeplayer, playing;
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activeplayer = 0;
    playing = true;

    scorep1.textContent = 0;
    scorep2.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
};
init();

//switching player

function switchPlayer() {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    currentScore = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

//Rolling the dice

diceBtn.addEventListener('click', function () {
    if (playing) {
        const dicenum = Math.trunc(Math.random() * 6) + 1;

        dice.classList.remove('hidden');
        dice.src = `assets/dice-${dicenum}.png`;

        if (dicenum !== 1) {
            currentScore += dicenum;
            document.getElementById(`current--${activeplayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
})

//holding the score

holdBtn.addEventListener('click', function () {
    if (playing) {
        scores[activeplayer] += currentScore;
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];

        if (scores[activeplayer] >= 20) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
        }

        else {
            switchPlayer();
        }
    }
})

//new game
newBtn.addEventListener('click', init)
