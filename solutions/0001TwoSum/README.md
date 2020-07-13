# Two Sum 两数之和
地址：https://leetcode.com/problems/two-sum/

难度：简单

知识点：hash table - 哈希表



## 题目：

Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

​	Given nums = [2, 7, 11, 15], target = 9,
​	Because nums[0] + nums[1] = 2 + 7 = 9,
​	return [0, 1].

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

示例:

​	给定 nums = [2, 7, 11, 15], target = 9
​	因为 nums[0] + nums[1] = 2 + 7 = 9
​	所以返回 [0, 1]



## 方法一：暴力解法

嵌套遍历数组，然后一一匹对，直到找到目标结果。但时间复杂度为 $O(n^2)$，不推荐使用。



## 方法二：HASH TABLE - 哈希表

以空间换速度，在遍历的时候，把已经遍历过的元素缓存到 hash 表里，在后续遍历的时候再从 hash 表里查找有没有可以与当前值匹配的值。因为 hash 表里找目标值时间复杂度为 $O(1)$，并且只需要遍历一次数组，所以整体时间复杂度降为 $O(n)$，使用了一个 Map 保存数据，空间复杂度升为$O(n)$。



```javascript
var twoSum = function (nums, target) {
    // map 表，缓存已经遍历过的唯一 item，跟对应的 index，可以使用普通对象替代 map
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
```
```javascript
// es5 语法
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
```

