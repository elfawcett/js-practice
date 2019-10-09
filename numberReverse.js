function reverse(number) {
  const str = number.toString()
  let reversed = str
    .split('')
    .reverse()
    .join('')

  return parseInt(reversed) * Math.sign(number)
}

module.exports = reverse
