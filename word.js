var Letter = require("./letter.js")

function Word(str) {
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
    console.log(this.remaining)
    return wordDisplay
}

Word.prototype.makeGuess = function (guess) {
    this.charArray.forEach(function(char) {
        char.check(guess)
    })
}

module.exports = Word