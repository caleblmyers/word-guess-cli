var asoiaf = require("api-iceandfire")

var randIndex = Math.floor(Math.random() * 500 + 100)

asoiaf
  .getCharacter(randIndex)
  .then(function(res) {
    console.log(res.name)
  })