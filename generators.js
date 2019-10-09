function* cats(input = []) {
  /* this doesn't happen until we call the first next() */
  console.log(`received ${input}, should we join these?`)

  /* pause for literally no reason */
  let firstPause = yield true

  /* if we next(), then go ahead and join*/
  let joined = input.join('! ')
  let secondPause = yield joined

  console.log(`firstPause ${firstPause}, secondPause ${secondPause}`)

  return { value: null, done: true }
}

function propIt(obj = {}) {
  const keys = Object.keys(obj)
  const propertyIterator = {
    next: () => {
      let key, value
      if (keys[0]) {
        key = keys.shift()
        value = typeof obj[key] === 'string' || typeof obj[key] === 'number' ? obj[key] : JSON.stringify(obj[key])
        return { value: [key, value], done: false }
      }
      return { value: obj, done: true }
    },
  }

  return propertyIterator
}

function* propItGen(obj = {}) {
  let key
  let value
  let endEarly

  for (key of Object.keys(obj)) {
    value = typeof obj[key] === 'string' || typeof obj[key] === 'number' ? obj[key] : JSON.stringify(obj[key])
    endEarly = yield [key, value]

    if (endEarly === key || endEarly === value) {
      break
    }
  }

  return [key, value]
}

function makeIterableObj(obj = {}) {
  if (obj[Symbol.iterator] || obj.hasOwnProperty(Symbol.iterator)) return obj

  /* return shallow copy and with an iterator */
  return {
    ...obj,
    *[Symbol.iterator]() {
      let key
      for (key of Object.keys(obj)) {
        yield [key, obj[key]]
      }
    },
  }
}

function* fib(num1 = 0, num2 = 1) {
  let current
  let sent = true
  while (sent === true) {
    current = num1
    num1 = num2
    num2 = current + num1
    let action = yield current

    switch (action) {
      case 'RESET':
        num1 = 0
        num2 = 1
        break
      case 'KILL':
        sent = false
        break
      default:
    }
  }

  return num1
}

module.exports = {
  cats,
  propIt,
  propItGen,
  makeIterableObj,
  fib,
}
