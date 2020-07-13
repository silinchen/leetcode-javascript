/**
* Runtime: 40~64ms
* Memory: 35.1~35.4MB
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  var numsMap = new Map()
  for (var i = 0; i < nums.length; i++) {
      var item = nums[i],
          complement = target - item
      if (numsMap.has(complement)) {
          return [numsMap.get(complement), i]
      }
      !numsMap.has(item) && numsMap.set(item, i)
  }
};
twoSum([2,7,11,15], 9) // [0 1]

// es5
var twoSum = function (nums, target) {
  var numsMap = {}
  for (var i = 0; i < nums.length; i++) {
      var item = nums[i],
          complement = target - item
      if (numsMap[complement] != undefined) {
          return [numsMap[complement], i]
      }
      numsMap[item] = i
  }
};
