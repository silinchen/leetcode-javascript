# Add Two Numbers - 两数相加

地址：https://leetcode.com/problems/add-two-numbers/

难度：中等

知识点：链表



## 题目：

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order** and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example:**

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```



给出两个 **非空** 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个结点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例：**

```
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```



## 题目分析：

首先需要了解链表的结构。

![linked list](.\images\2_add_two_numbers.svg)



题目的意思是要从两个链表中取出结点的值，并相加，组成新的链表。

逆序的意思是转成整数的时候，靠前的结点会转成整数的低位。实际上在这里逆序不影响代码的实现。

以示例为例，两个链表的第一个结点分别是 2 跟 5，相加后是7，组成新的链表的第一个结点。这个结点表示整数的个位数。

第二个结点分别是 4 跟 6，相加是 10，逢十进一，新链表第二个结点是 0，表示正整数的十位数，进一位会加到下一个结点。

第三个结点分别是 3 跟 4，加上第二结点进一位，相加是 8 ，表示正整数的百位数是 8。以此类推。

当两个链表长度不同时，短的链表缺少的结点以 0 表示。直到两个链表都结束。



## 思路：

就像你在纸上计算两个数字的和那样，我们首先从最低有效位也就是列表 `l1` 和 `l2` 的表头开始相加。由于每位数字都应当处于 `0…9` 的范围内，我们计算两个数字的和时可能会出现 “溢出”。例如，`5 + 7 = 12`。在这种情况下，我们会将当前位的数值设置为 `2`，并将进位 `carry = 1` 带入下一次迭代。进位 `carry` 必定是 `0` 或 `1`，这是因为两个数字相加（考虑到进位）可能出现的最大和为 `9 + 9 + 1 = 19`。

伪代码：

* 初始化一个哑结点作为新链表的头结点，作用是可以减少边界情况的处理。
* 用一个 `carry` 变量，变量值为 `0` 或 `1`，来保存上一次结点是否有进位，如果有进位，下一个结点再相加的时候就需要加上 `1`。
* 用 `p`、`q` 分别初始化传入的链表 `l1`、`l2`的头部结点
* 循环遍历列表 `l1`、`l2` 直到到达他们的尾端 （`null`）
  * 将 `x` 设为结点 `p` 的值，如果 `p` 已经到达 `l1` 的末尾，则将其值设置为 `0`。
  * 将 `y` 设为结点 `q` 的值，如果 `q` 已经到达 `l2` 的末尾，则将其值设置为 `0`。
  * 设置 `sum = x + y + carry`
  * 更新进位的值 `carry = Math.ceil(sum/10)`，如果大于 10，`carry` 为 `1`，小于 `10` `carry` 为 `0`。
  * 创建一个数值为 `sum%10` （除10取余）的新结点，并将其设置为当前结点的下一个结点，然后将当前结点前进到下一个结点。
  * 同时，如果 `p` 或 `q` 不是最后一个结点，将 `p` 和 `q` 前进到下一个结点
* 检查 `carry = 1` 是否成立，如果成立，则向返回列表追加一个含有数字 `1` 的新结点。
* 返回哑结点的下一个结点。



>  请注意，我们使用哑结点来简化代码。如果没有哑结点，则必须编写额外的条件语句来初始化表头的值。



## 代码实现：

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let p = l1,
        q = l2,
        carry = 0,
        dummyHead = curr = new ListNode(0);
    while(p || q) {
        const x = p != null ? p.val : 0;
        const y = q != null ? q.val : 0;
        const sum = carry + x + y;
        carry = Math.floor(sum/10)
        curr.next = new ListNode(sum%10)
        curr = curr.next
        if(p!=null) p = p.next
        if(q!=null) q = q.next
    }
    if(carry > 0) {
        curr.next = new ListNode(carry)
    }
    return dummyHead.next
};
```



