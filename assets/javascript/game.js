'use strict';

(function(){
const LETTER = /^[a-zA-Z]$/;

let data = ["alphabet", "soup", "candy", "phenomenal", "alternative", "themeless", "complete", "famous", "minimalism"];
let wins = 0;
let losses = 0;

// correct is false for indexes of var word where user hasn't guessed yet
let word = "";
let correct = [];

let wrongGuesses = [];
let guessesLeft = 0;

// DOM objects
let wordDisplay = document.getElementById('word');
let numGuessesDisplay = document.getElementById('num-guesses');
let wrongGuessesDisplay = document.getElementById('wrong-guesses');
let scoreDisplay = document.getElementById('score');

// sets up game initial state
function newGame() {
    // pick random word
    word = data[Math.floor(Math.random() * data.length)];
    word = word.toUpperCase();
    console.log(word);
    
    guessesLeft = 12;
    correct = [];
    wrongGuesses = [];

    // populate correct
    for(let i=0; i<word.length; i++) {
        correct.push(false);
    }
    updateDisplays();
}

function updateDisplays() {
    wordDisplay.innerHTML = "";
    for(let i=0; i<word.length; i++) {
        if(correct[i]) {
            wordDisplay.innerHTML += word[i];
        } else {
            wordDisplay.innerHTML += "_";
        }
        wordDisplay.innerHTML += " ";
    }
    
    numGuessesDisplay.innerHTML = "Guesses left: " + guessesLeft;

    wrongGuessesDisplay.innerHTML = "Already Guessed: "
    for(let i=0; i<wrongGuesses.length; i++) {
        wrongGuessesDisplay.innerHTML += wrongGuesses[i] + ",";
    }

    scoreDisplay.innerHTML = "Wins: " + wins + " Losses: " + losses;
}


document.onkeyup = function(event) {
    let userGuess = event.key;
    userGuess = userGuess.toUpperCase();
    
    // restrict to single letters
    if (!LETTER.test(userGuess)) {
        return;
    }

    // not in word
    if(word.indexOf(userGuess) === -1) {
        // not previously guessed 
        if(wrongGuesses.indexOf(userGuess) === -1) {
            wrongGuesses.push(userGuess);
            wrongGuesses.sort();
            guessesLeft--;
            // lose state
            if(guessesLeft == 0) {
                losses++;
                newGame();
                return
            }
            updateDisplays();
        }
        return;
    }

    // update correct user guesses
    for(let i=0; i<word.length; i++) {
        if(word[i] === userGuess) {
            correct[i] = true;
        }
    }

    // win state
    if(correct.reduce((a,b) => a && b )) {
        wins++;
        newGame();
        return;
    }

    updateDisplays();
}

newGame();

})();