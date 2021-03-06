# Longest Substring Without Repeating Characters - 无重复字符的最长子串

地址：https://leetcode.com/problems/longest-substring-without-repeating-characters/

难度：中等

知识点：滑动窗口



## 题目：

Given a string, find the length of the longest substring without repeating characters.

**Example 1:**
	Input: "abcabcbb"
	Output: 3 
	Explanation: The answer is "abc", with the length of 3. 

**Example 2:**
	Input: "bbbbb"
	Output: 1
	Explanation: The answer is "b", with the length of 1.

**Example 3:**
	Input: "pwwkew"
	Output: 3
	Explanation: The answer is "wke", with the length of 3. 

Note that the answer must be a substring, "pwke" is a subsequence and not a substring.



给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

**示例 1:**

​	输入: "abcabcbb"
​	输出: 3 
​	解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
**示例 2:**

​	输入: "bbbbb"
​	输出: 1
​	解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
**示例 3:**

​	输入: "pwwkew"
​	输出: 3
​	解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。

请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。



## 方法一：暴力法

思路简单易懂，遍历计算所有子字符串，取不重复字符的最长子字符串，**速度慢，会出现超时（TLE） **

```javascript
var lengthOfLongestSubstring = function(s) {
    // 判断字符串是否重复
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
    // i 为子字符串的起始位置，j 为字符串的结束位置。通过两次循环取得所有子字符串
    for (var i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++) {
            // 判断子字符串是否为不重复的字符串，并与当前存的最长字符串长度比较，取大的那个
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
```



## 方法二：滑动窗口



例如字符串 “abcacbbac”，接下来假设有一个窗口【】，窗口只显示字符串的一部分，过程如下：

-> 【a】 // 窗口内字符串不重复的情况下，窗口右边线向右扩大，下同

-> 【ab】

-> 【abc】

-> 【abca】 // a 重复，所以窗口左边线向左移动到 1 位，直到字符串内字符不重复

-> 【bca】

-> 【bcac】 // c 重复，所以窗口左边线向左移动 1 位，直到字符串内不重复

-> 【cac】 // c 重复，所以窗口左边线向左移动 1 位，直到字符串内不重复

-> 【ac】 -> 【acb】 -> 【acbb】 -> 【cbb】 -> 【bb】 -> 【b】 -> 【ba】

-> 【bac】 // 到最后窗口移动到最右边，结束循环。取过程中出现的最长的不重复字符 3



例如字符串 “pwwkew”，过程如下：

-> 【p】               // (p)wwkew

-> 【pw】			// (pw)wkew

-> 【pww】         // (pww)kew

-> 【ww】		   // p(ww)kew

-> 【w】       	   // pw(w)kew

-> 【wk】			// pw(wk)ew

-> 【wke】		  // pw(wke)w

-> 【wkew】	   // pw(wkew)

-> 【kew】		  // pww(kew)

> 这个过程，就好像是通过一个会向右滑动的窗口看长字符串的一个局部字符串。
>
> 每次都只移动一个位置，如果窗口内有字符重复，就移动左边线，如果没有，就移动右边线。

```javascript
var lengthOfLongestSubstring = function(s) {
    var ans = 0, i = 0, j = 0, n = s.length
    // 使用截取的子字符串，更形象一点，str 就是保存通过窗口看到的不重复字符串，使用 set 性能更高一点
    var str = ""
    while(i < n && j < n) {
        if(str.indexOf(s[j]) === -1) {
            str += s[j++]
            ans = Math.max(ans, str.length)
        } else {
            i++
            str = str.substr(1)
        }
        console.count() // 计算循环次数
    }
    return ans

    // 使用 Set 性能更高一些，set 用于保存滑动窗口内的字符串，用于判断窗口内字符串是否重复
    // var sSet = new Set()
    // // i 或者 j，不超过 n 就一直循环，向右滑动窗口
    // while(i < n && j < n) {
    //   if(!sSet.has(s[j])) {
    //     sSet.add(s[j++])
    //     ans = Math.max(ans, j-i)
    //   } else {
    //     sSet.delete(s[i++])
    //   }
    //   // console.count() // 计算循环次数
    // }
    // return ans
}
console.log(lengthOfLongestSubstring("abcabcbb")) // 3
```



## 方法三：滑动窗口优化

方法二中，当窗口右边线向右移动后，如果窗口内有重复字符了，就会移动左边线，一位一位移动，直到窗口内不重复。优化的方法是直接找到窗口内重复的那个值的位置，然后把左边线直接移到它的后面。

例如： “abcacbbac” 

-> 【a】

-> 【ab】

-> 【abc】

-> 【abca】// 按上面普通滑动窗口的流程，接下来应该是【abcac】->【bcac】->【cac】->【ac】，但是其实这个过程可以优化一下，省略掉一些步骤，既然我们可以知道右边下一个是 "c"，然后我们又想窗口内字符串不重复，那左边就可以直接跳到 “abc” 之后，从重复的 “c” 的下一位开始，但我们必须知道这个重复的 "c" 的位置。

-> 【ac】

-> 【acb】

-> 【b】 // 【acb】 的下一位是 “b”，“b” 重复了，左边直接跳到 “b” 之后，所以 【acbb】 就剩 【b】

-> 【ba】

-> 【bac】// 结束



例如：“pwwkew”

->【p】        // (p)wwkew

->【pw】     // (pw)wkew

->【w】       // pw(w)kew

->【wk】     // pw(wk)ew

->【wke】   // pw(wke)w

->【kew】   // pww(kew)



> 优化后，右边依然每次移动位，但左边变成一次移动一或多位，移动的距离根据新进入的字符判断。如果新进入的字符使得窗口内字符有重复了，左边线直接移动到重复字符的位置（+1 位），使窗口内字符重新变成不重复。



 //abb      a->ab->abb->bb->b
 //abb      a->ab->b



对比：假设长度是 n，左边位置是 i，右边位置是 j

优化前，每次移动是 i+1，或者 j+1，最坏的情况下，需要循环 2n-1 次

优化后，每次移动 j+1，i 则判断新增加的字符在窗口内的位置，直接设置i 的位置就行。循环次数是 n 次

```javascript
/**
 * 方法三：优化滑动窗口
 * 
 * Runtime: 80~84ms
 * Memory: 37.6~38MB
 * 
 * @param {*} s 
 */
var lengthOfLongestSubstring = function(s) {
    // 记录最长的不重复子字符串的长度
    var ans = 0
    // 记录窗口开始位置
    var start = 0
    // 保存窗口内每个字符，以及字符对应的位置，方便滑动窗口把开始的位置移动到重复字符的下一位
    var map = new Map()
    // 循环 j，相当于窗口每次都会向右扩展一个位置
    for (var j = 0; j < s.length; j++) {
        // 如果新加入的字符在窗口内已经存在
        if(map.has(s[j])) {
            // 把开始位置设置为该字符在窗口内的位置，使窗口内的字符再次变成不重复
            start = Math.max(map.get(s[j]), start)
        }
        // 设置最大长度值
        ans = Math.max(ans, j - start + 1)
        // 把新加入的字符的位置存起来，方便当字符出现重复的时候，快速跳到该字符的位置。
        // + 1 是为了把位置向右移动一位，也就是把该字符也排除在窗口外。
        // 例如 “abcdb”，第一个 b 是 s[1]，那开始位置就要设置为 s[1+1] -> s[2] -> "cdb"，把
        map.set(s[j], j + 1)
        // console.count() // 计算循环次数
    }
    return ans
}
console.log(lengthOfLongestSubstring("abcabcbb")) // 3
console.log(lengthOfLongestSubstring("bbbbb")) // 1
console.log(lengthOfLongestSubstring("pwwkew")) // 3
```