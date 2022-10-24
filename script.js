/* DOM ELEMENTS */
const remainingTry = document.getElementById('remainingTry');
const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');


const Alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
const wordList = ['VARIABLE', 'FONCTION', 'CONDITION', 'BOUCLE'];

/* WORD GENERATOR*/
const secretWord  = wordList[Math.floor(Math.random() * wordList.length)];

Alphabet.forEach((l) => {
    keyboard.innerHTML += `<div class="letters" id="l${l}">${l}</div>`;
});

for (let i = 1; i <= secretWord.length; i++) {
    board.textContent += '_';
}

board.textContent = board.textContent.replace(' ', '');
const letters = [...document.querySelectorAll('.letters')];

function clickLetter(l) {
    let clickedLetter = document.getElementById(l.target.id);
    if (secretWord.includes(clickedLetter.textContent)) {
        let indexOfLetter = [];
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === clickedLetter.textContent) {
                indexOfLetter.push(i);
            }
        }
        let splitBoard = board.textContent.split('');
        for (let i = 0; i < indexOfLetter.length; i++) {
            splitBoard[indexOfLetter[i]] = clickedLetter.textContent;
        }
        board.textContent = splitBoard.join('');
    } else {
        remainingTry.textContent = `${parseInt(remainingTry.textContent) - 1}`;
    }
    // VERIFICATION WIN/LOOSE
    if (!board.textContent.includes('_')) {
        board.textContent = 'Tu as trouvé : ' + secretWord;
        board.style.color = 'green';
        keyboard.style.display = 'none';
    } else if (parseInt(remainingTry.textContent) === 0) {
        board.textContent = 'Tu n\'as pas trouvé : ' + secretWord;
        board.style.color = 'red';
        keyboard.style.display = 'none';
    }
    clickedLetter.textContent = '';
}

letters.forEach((l) => {
   l.addEventListener('click', clickLetter);
});