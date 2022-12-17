const answerDisplay = document.getElementById("dashWord");
// const answerDisplay = $('#dashWord');
let guesses = 7;
let guessCount = $('#guessesLeft');
let winCount = 0;
let answer = "";
const wordDisplay = [];
const button = $('.alphButton');
let randomWord = '';


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
                    // winCount += 1;
                    // console.log(winCount)
                }  
            })
        }


function letterGuess(word, letter) {
    if (word.includes(letter)) {
        console.log(`The word ${word} contains the letter ${letter}`)
        showLetter(word, letter)
        winCount += 1;
        console.log(`win count: ${winCount}`)
        // console.log(word, letter)
    } else {
        guesses -= 1
        console.log(`guesses: ${guesses}`)
        guessCount.text(`GUESSES LEFT: ${guesses}`)
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


  

//   console.log(wordDisplay);
//   console.log(answer);
//   console.log(str)
