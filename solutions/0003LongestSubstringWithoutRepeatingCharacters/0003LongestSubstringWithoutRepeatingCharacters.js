/**
 * 三种方法，性能依次递增 
 * 方法一：暴力解法
 * 方法二：滑动窗口
 * 方法三：优化活动窗口
 */

// 方法一：暴力法，思路简单易懂，遍历计算所有子字符串，取不重复字符的最长子字符串
// 速度慢，会出现超时（TLE） 
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var allUnique = function(str) {
    var uniqueStr = ''
    for (let i = 0; i < str.length; i++) {
      var ch = str[i]
      if(uniqueStr.indexOf(ch) != -1) {
        return false
      }
      uniqueStr += ch
    }
    return true
  }
  var n = s.length
  var ans = 0
  for (var i = 0; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (allUnique(s.substring(i, j))) {
        ans = Math.max(ans, j-i)
      }
    }
  }
  return ans
};
console.log(lengthOfLongestSubstring("abcabcbb")) // 3
console.log(lengthOfLongestSubstring("bbbbb")) // 1
console.log(lengthOfLongestSubstring("pwwkew")) // 3


// 方法二：滑动窗口
var lengthOfLongestSubstring = function(s) {
  var ans = 0, i = 0, j = 0, n = s.length
  var str = ""
  while(i < n && j < n) {
    if(str.indexOf(s[j]) === -1) {
      str += s[j++]
      ans = Math.max(ans, str.length)
    } else {
      i++
      str = str.substr(1)
    }
  }
  return ans

  // 使用 Set 性能更高一些，set 用于保存滑动窗口内的字符串，用于判断窗口内字符串是否重复
  // var sSet = new Set()
  // while(i < n && j < n) {
  //   if(!sSet.has(s[j])) {
  //     sSet.add(s[j++])
  //     ans = Math.max(ans, j-i)
  //   } else {
  //     sSet.delete(s[i++])
  //   }
  // }
  // return ans
}
console.log(lengthOfLongestSubstring("abcabcbb")) // 3

/**
 * 方法三：优化滑动窗口
 * 
 * Runtime: 80~84ms
 * Memory: 37.6~38MB
 * 
 * @param {*} s 
 */
var lengthOfLongestSubstring = function(s) {
  var ans = 0
  var start = 0
  var map = new Map()
  for (var j = 0; j < s.length; j++) {
    if(map.has(s[j])) {
      start = Math.max(map.get(s[j]), start)
    }
    ans = Math.max(ans, j - start + 1)
    map.set(s[j], j + 1)
  }
  return ans
}
console.log(lengthOfLongestSubstring("abcabcbb")) // 3
console.log(lengthOfLongestSubstring("bbbbb")) // 1
console.log(lengthOfLongestSubstring("pwwkew")) // 3


