# Reverse Linked List
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given the head of a singly linked list, reverse the list, and return the reversed list.
```

## Examples
### Example 1
```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

### Example 2
```
Input: head = [1,2]
Output: [2,1]
```

### Example 3
```
Input: head = []
Output: []
```

## Constraints
1. The number of nodes in the list is in the range [0, 5000].
2. -5000 <= Node.val <= 5000

## Solution
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def reverse_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next # 1. Store next node
        current.next = prev      # 2. Reverse the link
        prev = current           # 3. Move prev to current node
        current = next_node      # 4. Move current to stored next node
    return prev
```

## Approach
The most common and efficient way is the **Iterative** approach. We use three pointers: `prev` (initially `None`), `current` (initially `head`), and `next_node` (to temporarily store the next node). In each iteration, we reverse the `current` node's pointer to point to `prev`, then advance all three pointers one step forward.

## Complexity
- **Time Complexity**: O(n) - We traverse the list exactly once.
- **Space Complexity**: O(1) - We use a constant amount of extra space for pointers.
