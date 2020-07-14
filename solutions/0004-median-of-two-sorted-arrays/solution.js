
/**
 * 方法一：
 * 合并数组为一个，然后取按奇数或者偶数计算出中位数的位置 i，直接 A[i] 取就可以。
 * 但这种方式，合并数组，需要重新排序数组，排序需要遍历两个数组，时间复杂度为 O(m+n)，大于 O(log (m+n)) 不符合要求。
 */

/**
 * 方法二
 * 
 * Runtime: 104ms
 * Memory: 39.1MB
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  var m = nums1.length,
      n = nums2.length,
      k = parseInt((m+n)/2) + 1
  var findKth = function(start1, start2, k) {
    var len1 = m - start1,
        len2 = n - start2,
        halfK = parseInt(k/2)
    if (m == 0) return nums2[k-1]
    if (n == 0) return nums1[k-1]
    if (k == 1) return Math.min(nums1[start1], nums2[start2])
    if (nums1[start1 + Math.min(len1, halfK) - 1] > nums2[start2 + Math.min(len2, halfK) - 1]) {
      if (halfK >= len2) return nums1[start1 + k - len2 - 1]
      start2 = start2 + Math.min(len2, halfK)
    } else {
      if (halfK >= len1) return nums2[start2 + k - len1 - 1]
      start1 = start1 + Math.min(len1, halfK)
    }
    return findKth(start1, start2, k-halfK)
  }
  return (m + n) % 2 == 0 ? (findKth(0,0,k - 1) + findKth(0,0,k)) / 2 : findKth(0,0,k)
};
console.log(findMedianSortedArrays([1], [2, 3, 4, 5, 6])) // 3.5
console.log(findMedianSortedArrays([2], [1, 3])) // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])) // 2.5
console.log(findMedianSortedArrays([], [1, 2])) // 1.5

/**
 * 方法三
 * 
 * Runtime: 136ms
 * Memory: 41.1MB
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  var m = nums1.length,
      n = nums2.length
  if (m > n) {
    var temp = nums1
    nums1 = nums2
    nums2 = temp
    m = nums1.length
    n = nums2.length
  }
  var iMin = 0, iMax = m, halfLen = parseInt((m + n + 1) / 2)
  
  while (iMin <= iMax) {
    var i = parseInt((iMin + iMax) / 2),
        j = halfLen - i
    if (i < iMax && nums2[j-1] > nums1[i]) {
      iMin = i + 1
    } else if (i > iMin && nums1[i-1] > nums2[j]) {
      iMax = i - 1
    } else {
      var maxLeft = 0, minRight = 0
      if (i == 0) { maxLeft = nums2[j - 1] }
      else if (j == 0) { maxLeft = nums1[i - 1] }
      else { maxLeft = Math.max(nums1[i - 1], nums2[j - 1]) }
      if ( (m + n) % 2 == 1 ) { return maxLeft }
      if (i == m) { minRight = nums2[j] }
      else if (j == n) { minRight = nums1[i]}
      else { minRight = Math.min(nums1[i], nums2[j]) }
      return (maxLeft + minRight) / 2.0
    }
  }
}
console.log(findMedianSortedArrays([1], [2, 3, 4, 5, 6])) // 3.5
console.log(findMedianSortedArrays([2], [1, 3])) // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])) // 2.5
console.log(findMedianSortedArrays([], [1, 2])) // 1.5


