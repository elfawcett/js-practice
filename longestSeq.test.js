const longestSequence = require('./longestSeq')

test('it finds the longest sequence to be 8 char d', () => {
  const input = 'abbbbbcccddddddddoooopppllllllkkkllllll'

  const result = longestSequence(input)

  expect(result).toBe(8)
})

test('longest seq is 12', () => {
  const input = '11122223335555555555553333333555555588888'
  const result = longestSequence(input)
  expect(result).toBe(12)
})
