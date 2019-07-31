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
      console.log("\n" + answer.update() + "\n")
      
      if (answer.remaining > 0 && answer.lives > 0) {
        console.log(answer.lives + " guesses remaining!")
        promptGuess()
      } else if (answer.remaining <= 0 && answer.lives > 0) {
        console.log("You got the word!")
      } else {
        console.log("Oh dear...you seem to have died!")
      }
    })
}

promptGuess()

/*

-- Make prompt only able to take one char and run automatically
-- handle case sensitivity
-- handle guesses with multiple letters
-- handle guesses of letters already guessed

*/