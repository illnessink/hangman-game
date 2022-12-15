const answerDisplay = document.getElementById("dashWord");
// const answerDisplay = $('#dashWord');
const guesses = 6;
let answer = "";
const wordDisplay = [];
const button = $('.alphButton');
let randomWord = '';


$.ajax({
    url: "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive&minCorpusCount=10&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=4&maxLength=10&api_key=4fayvxjfop7xp9yrl554gmimlr1vc5mdn9s5u11by5koewn7c",
  }).then(
    (data) => {
      console.log(data.word);
      randomWord = data.word;
    //   render();
      answerDisplay.innerHTML = setRandomWordDisplay(randomWord);
      answer = randomWord;
      letterGuess(randomWord);
    },
    (error) => {
      console.log("bad request", error);
    }
  )
 
//   let test = 'a'

function showLetter(word, letter) {
    // console.log(word,letter)
    let letterArray = word.split("");
    console.log(letterArray)
    let letterIndex = letterArray.indexOf(letter);
    $(`#box-${letterIndex}`).text(letter);
}

function locations(substring,string){
    var a=[],i=-1;
    while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
    return a;
  }
  
//   console.log(locations("s","scissors"));

function letterGuess(word, letter) {
    if (word.includes(letter)) {
        console.log(`The word ${word} contains the letter ${letter}`)
        showLetter(word, letter)
    } else {
        console.log(`The word ${word} does NOT contain the letter ${letter}`)
    }
}

button.on("click", function(evt) {
    console.log(this.innerHTML);
    letter = this.innerHTML.toLowerCase()
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