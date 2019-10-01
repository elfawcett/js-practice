/* Flatten an object to one level deep... or nest an object...? */
const A = {
  animals: {
    jugs: {
      type: 'cat',
      age: 7,
      color: 'gray',
    },
    ham: {
      type: 'cat',
      age: 5,
      color: 'orange',
    },
  },
  people: {
    eric: {
      age: 32,
    },
    jess: {
      age: 32,
    },
  },
  things: {
    car: {
      color: 'green',
      year: 2003,
    },
  },
}

const B = [
  { parent: null, type: 'animals' },
  { type: 'cats', parent: 'animals' },
  { type: 'jugs', parent: 'cats' },
  { type: 'ham', parent: 'cats' },
  { type: 'people', parent: null },
  { type: 'males', parent: 'people' },
  { type: 'females', parent: 'people' },
  { type: 'eric', parent: 'males' },
  { type: 'jess', parent: 'females' },
]

function nest(parent, type) {
  let obj = {}
  if (parent === null) {
    obj[type] = {}
  } else {
    obj[parent] = nest(parent, type)
  }
  return obj
}

let nested = {}
for (let obj of B) {
  nested = nest(obj.parent, obj.type)
}

console.log('\n', nested)
