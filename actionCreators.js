function createAction(type, ...args) {
  return {
    type,
    ...args,
  }
}

function specificAction1(type, update1, update2) {
  return {
    type,
    update1,
    update2,
  }
}

const task = {
  task: 'get milk',
}

console.log(specificAction1('UPDATE_TODO', 'get milk', 'get gas'))
