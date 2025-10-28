# Merge Two Sorted Lists
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.
```

## Examples
### Example 1
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

### Example 2
```
Input: list1 = [], list2 = []
Output: []
```

### Example 3
```
Input: list1 = [], list2 = [0]
Output: [0]
```

## Constraints
1. The number of nodes in both lists is in the range [0, 50].
2. -100 <= Node.val <= 100
3. list1 and list2 are both sorted in non-decreasing order.

## Solution
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def merge_two_lists(list1, list2):
    dummy = ListNode(0)
    tail = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    # Attach the remaining nodes of the non-empty list
    if list1:
        tail.next = list1
    elif list2:
        tail.next = list2
    return dummy.next
```

## Approach
This uses an **Iterative** approach with a dummy head node. We create a dummy node to act as the start of the merged list and a `tail` pointer to track the end. While both lists have nodes, we compare the values of the current nodes in $list1$ and $list2$, append the smaller node to `tail.next`, and advance the pointer of the list from which the node was taken. Finally, we attach the remainder of the non-empty list (if any) and return `dummy.next`.

## Complexity
- **Time Complexity**: O(m + n) - We visit each node from both lists once.
- **Space Complexity**: O(1) - We only use a constant number of extra pointers (excluding the space for the new merged list, which is necessary for the output).
