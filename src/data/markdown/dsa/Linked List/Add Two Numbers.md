# Add Two Numbers
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
```

## Examples
### Example 1
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

### Example 2
```
Input: l1 = [0], l2 = [0]
Output: [0]
```

### Example 3
```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

## Constraints
1. The number of nodes in each linked list is in the range [1, 100].
2. 0 <= Node.val <= 9
3. It is guaranteed that the list represents a number that does not have leading zeros.

## Solution
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def add_two_numbers(l1, l2):
    dummy_head = ListNode(0)
    current = dummy_head
    carry = 0
    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        sum_val = val1 + val2 + carry
        carry = sum_val // 10
        digit = sum_val % 10
        current.next = ListNode(digit)
        current = current.next
        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    return dummy_head.next
```

## Approach
This is an **Iterative** approach simulating manual addition. Use a `dummy_head` node to simplify list construction and a `current` pointer to build the result. Iterate as long as there are nodes in either list or there is a `carry`. In each step, calculate the `sum_val` of the two current digits plus the `carry`, update the `carry`, and create a new node with the `digit` ($sum_val pmod{10}$) for the result list. Finally, advance the pointers of $l1$ and $l2$. The loop handles lists of unequal length and the final carry.

## Complexity
- **Time Complexity**: O(max(m, n)) - We iterate up to the length of the longer list plus one iteration for the final carry.
- **Space Complexity**: O(max(m, n)) - A new linked list of up to $max(m, n) + 1$ nodes is created.
