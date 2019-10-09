const fib = require('./fib2')

describe('tests basic fib emitter', () => {
  test('it produces fib numbers from 0 to 100', () => {
    console.log(fib())

    const result = fib()

    expect(result[result.length - 1]).toBeGreaterThanOrEqual(100)
  })
})
