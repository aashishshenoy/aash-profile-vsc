# Remove Nth Node
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given the head of a linked list, remove the $n^{th}$ node from the end of the list and return its head.
```

## Examples
### Example 1
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

### Example 2
```
Input: head = [1], n = 1
Output: []
```

### Example 3
```
Input: head = [1,2], n = 1
Output: [1]
```

## Constraints
1. The number of nodes in the list is sz.
2. 1 <= sz <= 30
3. 1 <= n <= sz

## Solution
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    first = dummy
    second = dummy
    # Advance first pointer by n + 1 steps (n for offset, 1 for dummy)
    for _ in range(n + 1):
        first = first.next
    # Move both pointers until first reaches the end (None)
    # At this point, second is at the (sz - n)th node (the node *before* the one to be removed)
    while first:
        first = first.next
        second = second.next
    # Remove the node: second.next points to the node to be removed, so skip it
    second.next = second.next.next
    return dummy.next
```

## Approach
A **Two Pointers (Sliding Window)** approach is used to solve this in a single pass. We use a `dummy` node to handle the edge case where the head is removed. Two pointers, `first` and `second`, are initialized to the `dummy` node. First, `first` is advanced $n+1$ steps ahead. Then, both pointers advance simultaneously until `first` reaches `None` (the end of the list). At this point, `second` will be positioned exactly one node before the $n^{th}$ node from the end. We then perform the removal by setting `second.next = second.next.next`.

## Complexity
- **Time Complexity**: O(L) - We traverse the list up to twice in total, where L is the length of the list.
- **Space Complexity**: O(1) - We use a constant amount of extra space for the pointers and the dummy node.
