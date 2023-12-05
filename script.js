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

// Function to handle Truth or Dare option selection
function selectOption(option) {
    const selectedOption = document.getElementById('selected-option');
    const players = document.querySelectorAll('.player');
    const selectedPlayer = Array.from(players).find(player => player.classList.contains('highlight'));

    if (selectedPlayer) {
        selectedOption.innerText = ` ${selectedPlayer.innerText} selected ${option} `;

        const apiUrl = option === 'truth'
            ? 'https://api.truthordarebot.xyz/v1/truth'
            : 'https://api.truthordarebot.xyz/v1/dare';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.question) {
                    var taskFor = option === 'truth' ? 'Question for' : 'Dare for';

                    task.innerText = `${taskFor} ${selectedPlayer.innerText}: ${data.question}`;
                    task.style.display = 'flex';
                    tru.style.display = 'none';
                    messageDiv.style.display = 'none';

                    if (option === 'truth') {
                        taskdone.innerText = 'Answered';
                    } else {
                        taskdone.innerText = 'Dare Completed';
                    }
                    taskdone.style.display = 'flex';
                } else {
                    throw new Error('Unexpected API response format');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                task.innerText = 'Error fetching question from the API';
                task.style.display = 'block';
            });
    }
}

// Event listener for completing a task
taskdone.addEventListener('click', function startRandomSelection() {
    spin.style.display = 'flex';
    taskdone.style.display = 'none';
    task.style.display = 'none';
    selected.style.display = 'none';
});
