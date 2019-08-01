var Letter = require("./letter.js")

function Word(str) {
  this.lives = 10
  this.remaining = str.length
  this.charArray = []
  for (let i = 0; i < str.length; i++) {
    this.charArray.push(new Letter(str[i]))
  }
}

Word.prototype.update = function () {
  var wordDisplay = ''
  this.charArray.forEach(function (char) {
    wordDisplay += char
  });

  this.remaining = 0
  for (let i = 0; i < wordDisplay.length; i++) {
    if (wordDisplay[i] === "_") {
      this.remaining++
    }
  }
  return wordDisplay
}

Word.prototype.makeGuess = function (guess) {
  var correct = false
  var upper = guess.toUpperCase()
  var lower = guess.toLowerCase()

  this.charArray.forEach(function (char) {
    if (char.check(upper, lower) === true) {
      correct = true
    }
  })
  return correct
}

Word.prototype.reveal = function () {
  this.charArray.forEach(function(char) {
    char.isGuessed = true
  })

  var wordDisplay = ''
  this.charArray.forEach(function (char) {
    wordDisplay += char
  });

  return wordDisplay
}

module.exports = Word