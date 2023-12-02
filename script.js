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

