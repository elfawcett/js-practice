var findMedianSortedArrays = function(nums1, nums2) {
  let arr = nums1.concat(nums2).sort()

  let mids = arr.length % 2 === 0 ? [arr.length / 2 - 1, arr.length / 2] : [Math.floor(arr.length / 2)]

  if (mids.length === 2) {
    return (arr[mids[0]] + arr[mids[1]]) / 2
  } else {
    return arr[mids[0]]
  }
}

console.log(findMedianSortedArrays([1, 2], [3, 4]))
