const reverse = require('./numberReverse')

describe('test reversal of number', () => {
  test('it should reverse 123 as 321', () => {
    const result = reverse(123)

    expect(result).toBe(321)
  })

  test('it should reverse negative numbers', () => {
    const result = reverse(-553)

    expect(result).toBe(-355)
  })
})
