const Requester = require('./requester')

const req = new Requester()

const promiseHandler = generator => {
  let gen = generator()

  let result

  function handler(yieldedPromise) {
    if (!yieldedPromise.done) {
      if (yieldedPromise.value.then) {
        /* Resolve our passed promise */
        yieldedPromise.value
          .then(resp => {
            /* Set result */
            result = resp

            /* Call yourself.  gen.next(resp) will cause yield to give us this response. */
            handler(gen.next(resp))
          })
          .catch(err => {
            gen.throw(err)
          })
      }
    }

    /* Generator is done */
    return result
  }

  /* init generator */
  return handler(gen.next())
}

/* My generator */
const getRandomJoke = function*() {
  let randomJoke

  try {
    randomJoke = yield req.get('https://api.icndb.com/jokes/random')
  } catch (err) {
    console.error(`try/catch err inside getRandomJoke generator function`, err)
    // console.log(err)
  }

  return randomJoke
}

/* Execute handler with getRandomJoke generator */
let jokeA = promiseHandler(getRandomJoke)
let jokeB = promiseHandler(getRandomJoke)
let jokeC = promiseHandler(getRandomJoke)

console.log(jokeA)

// req
//   .get('https://api.icndb.com/jokes/random')
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.error(err)
//   })

exports.promiseHandler = promiseHandler
