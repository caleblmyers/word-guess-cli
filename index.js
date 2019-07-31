var Word = require("./word.js")
var inquirer = require("inquirer")

var words = [
  "Jurassic Park",
  "The Lord of the Rings"
]

var answer = new Word(words[0])

function promptGuess() {
  inquirer
    .prompt({
      message: "Guess a letter!",
      name: "guess"
      // validate for one character
    })
    .then(function(res) {
      answer.makeGuess(res.guess)
      console.log(answer.update())
      
      if (answer.remaining > 0) {
        promptGuess()
      } else {
        console.log("You got the word!")
      }
    })
}

promptGuess()

/*

-- Make limited amount of guesses
-- Make prompt only able to take one char and run automatically
-- handle case sensitivity

*/