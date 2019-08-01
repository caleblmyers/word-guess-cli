var Word = require("./word.js")
var inquirer = require("inquirer")
var asoiaf = require("api-iceandfire")
var chalk = require("chalk")

var answer
var guesses = []

function promptGuess() {
  inquirer
    .prompt({
      message: "Guess a letter! (Must be a single character)",
      name: "guess",
      validate: function (value) {
        if (
          value.length === 1 && 
          isNaN(value) === true &&
          value.toUpperCase() != value.toLowerCase() && 
          guesses.indexOf(value.toLowerCase()) === -1
        ) {
          return true
        }
        return false
      }
    })
    .then(function (res) {
      guesses.push((res.guess).toLowerCase())
      var correct = answer.makeGuess(res.guess)

      if (correct) {
        console.log(chalk.green.bold("\nCORRECT!!!"))
      } else {
        answer.lives--
        console.log(chalk.red.bold("\nINCORRECT!!!\n"))
        if (answer.lives > 1) {
          console.log(chalk.bold("You have " + answer.lives + " guesses left!!!"))
        } else if (answer.lives === 1) {
          console.log(chalk.bold("You have " + answer.lives + " guess left!!!"))
        }
      }

      if (answer.lives > 0) {
        console.log("\n" + answer.update() + "\n")
        if (answer.remaining > 0) {
          console.log("Letters guessed: " + guesses.join(", ") + "\n")
          promptGuess()
        } else if (answer.remaining <= 0) {
          console.log("You got the word!\n")
          mainMenu()
        }
      } else {
        console.log("Oh dear...you're out of guesses!\n")
        console.log(answer.reveal() + "\n")
        mainMenu()
      }
    })
}

function newGame() {
  guesses = []
  var randIndex = Math.floor(Math.random() * 500 + 100)
  asoiaf
    .getCharacter(randIndex)
    .then(function (res) {
      answer = new Word(res.name)
      console.log("\n" + answer.update() + "\n")
      promptGuess()
    })
}

function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "input",
      message: "Welcome! What would you like to do?",
      choices: ["New Game", "Exit"]
    })
    .then(function (res) {
      if (res.input === "New Game") {
        newGame()
      } else {
        console.log("\nBye for now!")
      }
    })
}

mainMenu()