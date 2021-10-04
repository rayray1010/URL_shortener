const shortenString = function (requiredQuantity) {
  const number = '0123456789'
  const lowerLetter = 'abcdefghijklmnopqrstuvwxyz'
  const upperLetter = lowerLetter.toUpperCase()
  const combination = number + lowerLetter + upperLetter
  let output = ''
  for (let i = 0; i < requiredQuantity; i++) {
    output += combination[Math.floor(Math.random() * combination.length)]
  }
  return output
}

module.exports = shortenString
