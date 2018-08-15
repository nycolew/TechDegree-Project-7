const keyboard = document.getElementById('qwerty');
const keyRows = document.getElementsByClassName('keyrow');
const keys = keyRows.children;
const phrase = document.getElementById('phrase');
let missed = 0;
const gameStart = document.getElementsByClassName('btn__reset')[0];

// Change cursor to pointer over start button
gameStart.style.cursor = "pointer";

// Add event listener for start button & hide overlay
gameStart.addEventListener('click', (e) => {
  const overlay = document.getElementById('overlay');
  overlay.style.display = "none";
});

// Create phrases for user to guess
const phrases = [
  'I aim to misbehave',
  'A word after a word after a word is power',
  'It does not do to dwell on dreams and forget to live',
  'To love is to act',
  'Somewhere something incredible is waiting to be known'
];

// Get random phrase and split into array of characters

function getRandomPhraseAsArray(array) {
  let random = array[Math.floor(Math.random()*array.length)];
  const letters = random.split('');
  return letters;
};

const phraseLetters = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(array) {
  for (let i = 0; i < array.length; i += 1) {
    const li = document.createElement('li');
    const ul = document.getElementById('phrase');
    ul.appendChild(li);
    li.textContent = array[i];
    if (array[i] !== ' ') {
      li.className = "letter";
    }
  }
};

addPhraseToDisplay(phraseLetters);

function checkLetter(clicked) {
  const lettersInAnswer = document.getElementsByClassName('letter');
  for (let i = 0; i < lettersInAnswer; i +=1) {
    const guess = clicked.textContent;
    if (lettersInAnswer[i] === guess) {
      const li = lettersInAnswer[i].parentNode();
      li.className = "show";
    }
    else {
      return null;
    }
  }
};

keys.addEventListener('click', (e) => {
  e.target.className = "chosen";
  const letterFound = checkLetter(e.target);
})
