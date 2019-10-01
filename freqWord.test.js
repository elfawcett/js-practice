const mostFrequentWord = require('./freqWord')

test('', () => {
  const exampleText = `PERFORMANCE is not just about moving static files closer to visitors, it is also about ensuring that every page renders as fast and efficiently as possible from whatever device a visitor is surfing from. Cloudflare users can choose any combination of these Internet property content optimization features that take performance to the next level.`

  const result = mostFrequentWord(exampleText)

  expect(result).toBe('is')
})
