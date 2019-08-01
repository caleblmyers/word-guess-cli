function Letter(char) {
    this.char = char
    this.isGuessed = false
}

Letter.prototype.toString = function () {
    if (this.char === " ") {
        return "  "
    } else {
        if (this.isGuessed) {
            return this.char + " "
        } else {
            return "_ "
        }
    }
}

Letter.prototype.check = function (upper, lower) {
    if (upper === this.char || lower == this.char) {
        this.isGuessed = true
        return true
    }
    return false
}

module.exports = Letter