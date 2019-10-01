/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let A, B

  nums.forEach((num, index) => {
    nums.slice(index + 1).forEach(_num => {
      if (_num + num === target) {
        A = index
        B = nums.indexOf(_num)
        return false
      }
    })

    if (A && B) {
      return false
    }
  })

  console.log([A, B])

  return [A, B]
}

twoSum([2, 7, 11, 15], 18)
