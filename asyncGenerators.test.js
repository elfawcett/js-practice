const https = require('https')
const promisify = require('util').promisify

const promiseHandler = require('./asyncGenerators').promiseHandler

describe('get random chuck norris jokes from icndb', () => {
  const getRandom = function*() {
    let result
    try {
      result = yield promisify(https.get)('https://api.icndb.com/jokes/random')
    } catch (err) {
      console.log(`this should be an error from the generator from the promise`)
      console.log(err)
    }
  }

  promiseHandler(getRandom)
})
