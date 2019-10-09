const gens = require('./generators')

describe('tests cats generator', () => {
  let cats = ['jugs', 'jamon', 'khajiit']

  test('it yields each cat', () => {
    const catIt = gens.cats(cats)

    let value
    let i = 0
    while (!catIt.done) {
      i++

      if (i > 10) break
    }
  })
})

describe('test property iterator', () => {
  const object = {
    name: 'eric',
    age: 34,
    location: 'Toano',
    favorites: {
      food: 'Pizza',
      show: 'Mr. Show',
    },
    likes: ['wife', 'games'],
  }

  test('as an iterator, it returns [key, value] of obj', () => {
    const it = gens.propIt(object)

    /* result.value = [key, value] */
    let result = it.next()
    expect(result.value.join()).toBe(['name', 'eric'].join())

    let i = 0
    while (!result.done) {
      result = it.next()
      i++
      if (i > 10) break
    }
  })

  test('as a generator, it returns [key, value] of obj', () => {
    const it = gens.propItGen(object)

    let result = it.next()

    expect(result.value.join()).toBe(['name', 'eric'].join())

    let i = 0
    while (!result.done) {
      if (i > 10) break
      result = it.next()
      i++
    }
  })

  test('as a generator, it ends early on a specified key or value', () => {
    let testResult = ''
    const it = gens.propItGen(object)
    let sentinel = 'location'

    let result = it.next(sentinel)

    let i = 0
    while (!result.done) {
      if (i > 10) break

      result = it.next(sentinel)

      i++
    }

    expect(result.value[0]).toBe('location')
  })
})

describe('make objects iterable with for...of', () => {
  const object = {
    name: 'jess',
    age: 33,
    likes: ['vacations', 'skyrim'],
    favorites: {
      food: 'french fries',
      team: 'liquid',
    },
  }

  let itObj = gens.makeIterableObj(object)

  let key, value
  let intentionalErr = false

  test('for...of fails on normal object', () => {
    try {
      for ([key, value] of object) {
        console.log(key, value)
      }
    } catch (err) {
      intentionalErr = true
    }

    expect(intentionalErr).toBe(true)
  })

  test('it iterates an object with [key, value]', () => {
    let lastResult
    for ([key, value] of itObj) {
      lastResult = [key, value]
    }

    expect(lastResult[0]).toBe('favorites')
    // console.table(lastResult)
  })
})

test('make object iterable, use generator to iterate', () => {
  const collegesByUUID = {
    aaa0: { name: 'NYU', type: 'private' },
    aaa1: { name: 'Yale', type: 'public' },
    aab0: { name: 'VCU', type: 'public' },
    aab1: { name: 'TNCC', type: 'community' },
    abb0: { name: 'Stanford', type: 'private' },
    abb1: { name: 'Princeton', type: 'private' },
    bbb0: { name: 'Oxford', type: 'public' },
    bbb1: { name: 'Notre Dame', type: 'private' },
  }

  const genItColleges = function*(obj) {
    const it = gens.makeIterableObj(obj)
    yield* it
  }

  const colleges = genItColleges(collegesByUUID)

  let keys = []
  let names = []
  let result = colleges.next()

  while (!result.done || result.value !== undefined) {
    keys.push(result.value ? result.value[0] : undefined)
    names.push(result.value && result.value[1] ? result.value[1].name : undefined)
    result = colleges.next()
  }

  expect(keys.slice(-1)[0]).toBe('bbb1')
  expect(names.slice(-1)[0]).toBe('Notre Dame')
})

describe('fibonacci generator with RESET and KILL controls', () => {
  let fibNum = gens.fib()

  test('it generates fib numbers', () => {
    expect(fibNum.next().value).toBe(0)
    expect(fibNum.next().value).toBe(1)
    expect(fibNum.next().value).toBe(1)
    expect(fibNum.next().value).toBe(2)
    expect(fibNum.next().value).toBe(3)
    expect(fibNum.next().value).toBe(5)
  })

  test('it resets the generator to 0,1', () => {
    expect(fibNum.next('RESET').value).toBe(0)
    expect(fibNum.next().value).toBe(1)
    expect(fibNum.next().value).toBe(1)
    expect(fibNum.next().value).toBe(2)
  })

  test('it stops the generator internally and returns the current fib num', () => {
    expect(fibNum.next('KILL').value).toBe(3)
    expect(fibNum.next().value).toBe(undefined)
    expect(fibNum.next().value).toBe(undefined)
    expect(fibNum.next().value).toBe(undefined)
  })

  test('it generates fibs from 10,20', () => {
    fibNum = gens.fib(10, 20)
    expect(fibNum.next().value).toBe(10)
    expect(fibNum.next().value).toBe(20)
    expect(fibNum.next().value).toBe(30)
    expect(fibNum.next().value).toBe(50)
  })

  test('it resets from 10,20 back to 0,1', () => {
    expect(fibNum.next('RESET').value).toBe(0)
    expect(fibNum.next().value).toBe(1)
    expect(fibNum.next().value).toBe(1)
    expect(fibNum.next().value).toBe(2)
  })
})
