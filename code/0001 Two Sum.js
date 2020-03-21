// https://leetcode.com/problems/two-sum/


// Given an array of integers, return indices of the two numbers such that they add up to a specific target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

//   Given nums = [2, 7, 11, 15], target = 9,
//   Because nums[0] + nums[1] = 2 + 7 = 9,
//   return [0, 1].

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
 * 在进行迭代并将元素插入到表中的同时，我们还会回过头来检查表中是否已经存在当前元素所对应的目标元素。
 * 如果它存在，那我们已经找到了对应解，并立即将其返回。
 */
var twoSum = function (nums, target) {
    // map 表，缓存已经遍历过的唯一 item，跟对应的 index，可以使用普通对象替代
    var numsMap = new Map()
    for (var i = 0; i < nums.length; i++) {
        var item = nums[i],
            complement = target - item
        // 取目标值与当前项的差值，如果差值已经出现过，则取差值的索引跟当前值的索引作为结果
        if (numsMap.has(complement)) {
            return [numsMap.get(complement), i]
        }
        // 判断 map 是否有缓存当前的项，如果没有，缓存它
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

/**
 * Runtime: 40~64ms
 * Memory: 35.1~35.4MB
 */