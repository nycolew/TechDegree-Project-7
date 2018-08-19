const keyboard = document.getElementById('qwerty');
const keyRows = document.getElementsByClassName('keyrow');
const keys = document.querySelectorAll('.keyrow button');
const phrase = document.getElementById('phrase');
let missed = 0;
const gameStart = document.getElementsByClassName('btn__reset')[0];
const title = document.getElementsByClassName('title');


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

// Set phrase letters array to global variable

const phraseLetters = getRandomPhraseAsArray(phrases);

// Add phrase to the game board

function addPhraseToDisplay(array) {
  for (let i = 0; i < array.length; i += 1) {
    const li = document.createElement('li');
    const ul = document.getElementById('phrase');
    ul.appendChild(li);
    li.textContent = array[i];
    if (array[i] !== ' ') {
      li.className = "letter";
    }
    else if (array[i] === ' '){
      li.className = "space";
    }
  }
};

addPhraseToDisplay(phraseLetters);

// Create a checkLetter function.

function checkLetter(button) {
  // Get all elements with class of "letter"
  const letters = document.getElementsByClassName('letter');
  const buttonText = button.textContent;
  let letterFound = null;
  // Loop over the letters and check if they match the letter in the button chosen
  for (let i = 0; i < letters.length; i +=1) {
    if (letters[i].textContent.toLowerCase() === buttonText) {
      // If match, add 'show class to LI containing letter,
      letters[i].classList.add('show');
      // Store letter as a variable,
      letterFound = letters[i].textContent;
    }
  }
  // And return letter
  return letterFound;
}

// Function to change overlay according to win/lose

function results(className, message) {
    overlay.classList = className;
    overlay.style.display = "flex";
    gameStart.textContent = "Reset";
    title.innerHTML = message;
  }

// Function to check with each button pressed to see if game is won or lost

function checkWin() {
  const lettersGuessed = document.getElementsByClassName('show');
  const totalLetters = document.getElementsByClassName('letters');
  const overlay = document.getElementById('overlay');
  if (lettersGuessed.length === totalLetters.length && lettersGuessed.length !== 0) {
    results("win", "Congratulations! You're going to Disney World!");
  }
  else if (missed >= 5) {
    results("lose", "You lose! Better luck next time!");
  }
}

// Listen to only button events from the keyboard
for (let i = 0; i < keys.length; i +=1) {
  keys[i].addEventListener('click', (e) => {
    // When a letter is clicked, add 'chosen' class to that button
    e.target.classList.add('chosen');
    //and disable the button by adding "disabled" attribute
    e.target.setAttribute('disabled', true);
    //Pass the button to the checkLetter function,
    let letterFound = checkLetter(e.target);
    // Check value of letterFound variable
    if (letterFound === null) {
      // If null, remove a try from scoreboard
      const scoreboard = document.getElementById('scoreboard');
      scoreboard.firstElementChild.children[missed].firstElementChild.src = "images/lostHeart.png";
      missed += 1;
    }
    checkWin();
  })
}
