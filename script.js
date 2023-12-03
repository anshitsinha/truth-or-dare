// Fetching necessary elements from the DOM
const playersEl = document.getElementById('players');
const textarea = document.getElementById('textarea');
const tru = document.querySelector('.tru');
const messageDiv = document.getElementById('message');
const selected = document.querySelector('.selected');
const spin = document.querySelector('.spin');
const truth = document.querySelector('.truth');
const dare = document.querySelector('.dare');
const gamestarter = document.querySelector('.gamestarter');
const task = document.querySelector('.task');
const taskdone = document.querySelector('.taskdone');

// Set focus on the text area for player names input
textarea.focus();

// Event listener for handling player names input
textarea.addEventListener('keyup', (e) => {
    createPlayers(e.target.value);

    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = '';
        }, 10);

        randomSelect();
    }
});

// Function to create player elements from input
function createPlayers(input) {
    const players = input.split(',').filter(player => player.trim() !== '').map(player => player.trim());

    playersEl.innerHTML = '';

    players.forEach(player => {
        const playerEl = document.createElement('span');
        playerEl.classList.add('player');
        playerEl.innerText = player;
        playersEl.appendChild(playerEl);
    });
}

// Function to perform random player selection
function randomSelect() {
    const times = 30;

    const interval = setInterval(() => {
        const randomPlayer = pickRandomPlayer();

        if (randomPlayer !== undefined) {
            highlightPlayer(randomPlayer);

            setTimeout(() => {
                unHighlightPlayer(randomPlayer);
            }, 100);
        }
    }, 100);

    setTimeout(() => {
        clearInterval(interval);

        setTimeout(() => {
            const randomPlayer = pickRandomPlayer();

            highlightPlayer(randomPlayer);
            messageDiv.innerText = `Bottle landed on you: ${randomPlayer.innerText}. Choose Truth or Dare.`;
        }, 100);
    }, times * 100);
}

// Function to pick a random player
function pickRandomPlayer() {
    const players = document.querySelectorAll('.player');
    return players[Math.floor(Math.random() * players.length)];
}

// Function to highlight a player
function highlightPlayer(player) {
    player.classList.add('highlight');
}

// Function to unhighlight a player
function unHighlightPlayer(player) {
    player.classList.remove('highlight');
}

// Event listener for starting the random selection on button click
spin.addEventListener('click', function startRandomSelection() {
    validateAndStartRandomSelect();
    randomSelect();

    setTimeout(() => {
        tru.style.display = 'flex';
        messageDiv.style.display = 'flex';
        gamestarter.style.display = 'none';
        spin.style.display = 'none';
    }, 30 * 100);
});

// Function to validate input and start random selection
function validateAndStartRandomSelect() {
    const inputText = textarea.value.trim();

    if (inputText === '') {
        alert("Player names can't be empty");
        location.reload();
        return;
    }
}