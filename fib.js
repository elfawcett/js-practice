function fib(a = 0, b = 1, nums = [], limit = 5) {
  nums = nums.length === 0 ? [a, b] : nums

  if (nums.length < limit) {
    return fib(b, a + b, nums.concat(a + b), limit)
  } else {
    return nums.concat(a + b)
  }
}

module.exports = fib
