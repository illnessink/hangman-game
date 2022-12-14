$.ajax({
    url: "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive&minCorpusCount=10&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=4&maxLength=10&api_key=4fayvxjfop7xp9yrl554gmimlr1vc5mdn9s5u11by5koewn7c",
  }).then(
    (data) => {
      console.log(data.word)
    },
    (error) => {
      console.log("bad request", error)
    }
  )