const fib = (arr = [0, 1], limit = 200) => {
  /* Arbitary limit */
  if (arr[arr.length - 1] >= limit) return arr

  return fib(arr.concat(arr[arr.length - 1] + arr[arr.length - 2]))
}

module.exports = fib
