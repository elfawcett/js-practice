function fibonacci(start, next, arr) {
  if (start === 1) {
    arr.push(start, next)
  } else {
    arr.push(next)
  }

  if (start >= 4000000) {
    arr.push(next)
    return arr
    // return false
  } else {
    fibonacci(next, start + next, arr)
  }

  return arr
}

const b = fibonacci(1, 2, []).reduce((a, x, i) => {
  if (x % 2 === 0) {
    return x + a
  }

  return a
}, 0)

console.log(b)
