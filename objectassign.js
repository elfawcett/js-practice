/*
The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.

Syntax

Object.assign(target, ...sources)
Parameters

target
The target object.
sources
The source object(s).
Return value

The target object.
*/

/*
cat = {
  name: 'jugs',
  color: 'gray',
  age: 8,
  behaviors: {
    type: 'annoyance',
    name: 'plastic chewing',
    description: 'chews on bags and shit'
  }
}

Jugs = Object.assign({}, cat)

for each property in target,
  for each property in property
*/
function objAssign(target, source) {
  for (let Prop in source) {
    if (typeof source[Prop] === 'object') {
      if (Array.isArray(source[Prop])) {
        target[Prop] = []

        for (let prop of source[Prop]) {
          if (typeof prop === 'object') {
            target[Prop].push(objAssign({}, prop))
          } else {
            target[Prop].push(prop)
          }
        }
      } else {
        target[Prop] = objAssign({}, source[Prop])
      }
    } else {
      target[Prop] = source[Prop]
    }
  }

  return target
}

const A = {
  name: 'Eric',
  age: 32,
  likes: [{ type: 'food', name: 'pizza' }, { type: 'video game', name: 'Dota 2' }],
  dislikes: ['cleaning', 'homework', 'chores', 'cats'],
}

const B = objAssign({}, A)
console.log('base copy\n', A, '\n', B)

A.name = 'ERIC ERIC ERIC'
B.age = 17
A.likes[0] = { type: 'food', name: 'enchilada' }
B.likes[1] = { type: 'activity', name: 'cooking' }
A.dislikes.unshift('working')

console.log('A.name, B.age, A.likes[0], B.likes[1]\n', A, '\n', B)
