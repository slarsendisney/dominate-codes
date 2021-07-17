const {
  uniqueNamesGenerator,
  adjectives,
  colors,
} = require("unique-names-generator")

function createRoomName() {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors],
  }) 
  return randomName
}

module.exports = {
  createRoomName,
}
