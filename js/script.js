const answerDisplay = document.getElementById("dashWord");
// const answerDisplay = $('#dashWord');
let guesses = 7;
let guessCount = $('#guessesLeft');
let winCount = 0;
let answer = "";
const wordDisplay = [];
const button = $('.alphButton');
let randomWord = '';
let winOrLose = $('#winLose');
let hangman = $('#hangmanImg');
// console.log(hangman.attr("src"));


$.ajax({
    url: "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive&minCorpusCount=10&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=4&maxLength=10&api_key=4fayvxjfop7xp9yrl554gmimlr1vc5mdn9s5u11by5koewn7c",
  }).then(
    (data) => {
      console.log(data.word);
      randomWord = data.word.toLowerCase();
    //   render();
      answerDisplay.innerHTML = setRandomWordDisplay(randomWord);
      answer = randomWord;
      letterGuess(randomWord);
    },
    (error) => {
      console.log("bad request", error);
    }
  )
 

function showLetter(word, letter) {
    console.log(word,letter)
    let letterArray = word.split("");
    console.log(letterArray)
    let letterIndex = letterArray.indexOf(letter);
            letterArray.forEach((char, index) => {
                if (char === letter) {
                    $(`#box-${index}`).text(char);
                    winCount += 1;
                    console.log(`win count: ${winCount}`)
                    if (winCount === word.length) {
                            winOrLose.text(`HURRAH, YOU WON! THE MAN WAS SAVED! `);
                            hangman.attr("src","https://i.imgur.com/DjpNAHA.jpg");
                            console.log(hangman.src)
                        }
                }  
            })
        }


function letterGuess(word, letter) {
    if (word.includes(letter)) {
        console.log(`The word ${word} contains the letter ${letter}`)
        showLetter(word, letter)
    } else {
        guesses -= 1
        console.log(`guesses: ${guesses}`)
        guessCount.text(`GUESSES LEFT: ${guesses}`)
        winOrLoseCheck(guesses, word)
    }
}

function winOrLoseCheck(guess, word) {
    if (guess === 5) {
      hangman.attr("src", "https://i.imgur.com/xnDztPs.jpg");
    } else if (guess === 4) {
      hangman.attr("src", "https://i.imgur.com/lE6uNCK.jpg");
    } else if (guess === 3) {
      hangman.attr("src", "https://i.imgur.com/lySlp3q.jpg");
    } else if (guess === 2) {
      hangman.attr("src", "https://i.imgur.com/i4yhyIc.jpg");
    } else if (guess === 1) {
      hangman.attr("src", "https://i.imgur.com/HTVr7cd.jpg");
    } else if (guess === 0) {
        winOrLose.text(`SORRY, YOU LOST! THE WORD WAS ${word.toUpperCase()}! `);
        hangman.attr("src", "https://i.imgur.com/Ybj5Tgn.jpg");
    } 
}

button.on("click", function(evt) {
    console.log(this.innerHTML);
    letter = this.innerHTML.toLowerCase();
    this.disabled = true;
    this.style.backgroundColor = "red";
    return letterGuess(randomWord,letter);
  })

  function setRandomWordDisplay(word) {
    let letterArray = word.split("");
    console.log(letterArray);
    letterArray.forEach((element, i) => {
        wordDisplay.push(`<span id='box-${i}'>_</span>`);  
        // console.log(wordDisplay);
    });
    // console.log(wordDisplay);
    return wordDisplay.join(" ");
  }
