/*
  Find the longest consecutive sequence in the input string.
  The correct answer is 8 (character d).
*/
const longestSequence = input => {
  let seq = ''
  let longest = 0

  for (let i in input) {
    if (seq.slice(-1) === input[i]) {
      seq += input[i]
    } else {
      seq = input[i]
    }

    longest = seq.length > longest ? seq.length : longest
  }

  return longest
}

module.exports = longestSequence
