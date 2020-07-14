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
