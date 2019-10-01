/*
  The goal is to find the most frequent word.
  [Medium] It tests both the knowledge of basic data structures and
  JavaScript features. The candidate should ask some questions at
  the beginning:
    - What to do with special characters (commas, dots) ?
      (Answer is to strip them)
    - Is it case sensitive? (Answer is no)
    - The range of possible inputs? (at least one word)
  Then, the candidate should clean the special characters (regexp is ok),
  split the text into words and count them as Object properties. Then,
  it's needed to iterate through these properties and find the most
  common one (extra points if constructs as Object.keys() and .reduce()
  are used...).
  There is one hidden pitfall. A naive solution will not work if the most
  common word is __proto__ since JS object is not hash table. It inherits
  properties. This can be fixed through usage of: const table = Object.create(null);
  The existence check of properties should be done this way:
  Object.prototype.hasOwnProperty.call(table, word)
*/

function mostFrequentWord(text) {
  /* [word.toLowercase()] = word.uses */
  const dict = new Map()

  let cleanText = text

  const specChars = new RegExp(/\,|\.|!|\?|\*/, 'gi')
  while (cleanText.search(specChars) !== -1) {
    cleanText = cleanText.replace(specChars, '')
  }

  const words = cleanText.split(' ')

  words.forEach(word => {
    const currentCount = dict.get(word.toLowerCase()) || 0
    dict.set(word.toLowerCase(), currentCount + 1)
  })

  let mostFreqWord = ''
  let freq = 0
  for (let [word, uses] of dict) {
    if (uses > freq) {
      mostFreqWord = word
      freq = uses
    }
  }

  return mostFreqWord
}

module.exports = mostFrequentWord
