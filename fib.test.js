const fib = require('./fib')

describe('tests fib patterns', () => {
  test('returns array of first 8 fib sequence', () => {
    const seq = fib(0, 1, [], 9)

    const [a, b, , , , , g, h] = seq

    expect(a).toBe(0)
    expect(b).toBe(1)
    expect(g).toBe(8)
    expect(h).toBe(13)
  })

  test('it returns fib sequence starting at non 0,1 base', () => {
    const seq = fib(10, 20, [], 10)
    const [a, b, c, , , , g, h] = seq

    console.log(seq)

    expect(a).toBe(10)
    expect(b).toBe(20)
    expect(c).toBe(30) // 50, 80, 130, 210, 340, 550
    expect(g).toBe(210)
    expect(h).toBe(340)
  })
})
