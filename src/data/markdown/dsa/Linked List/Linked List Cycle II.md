# Linked List Cycle II
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Do not modify the linked list.
```

## Examples
### Example 1
```
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where the tail connects to the second node.
```

### Example 2
```
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
```

### Example 3
```
Input: head = [1], pos = -1
Output: no cycle
```

## Constraints
1. The number of the nodes in the list is in the range [0, 10^5].
2. -10^5 <= Node.val <= 10^5
3. pos is -1 or a valid index in the linked list.

## Solution
```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
def detect_cycle(head):
    # 1. Detect if a cycle exists (Floyd's Tortoise and Hare)
    slow = head
    fast = head
    has_cycle = False
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            has_cycle = True
            break
    if not has_cycle:
        return None
    # 2. Find the entry point
    # Reset one pointer to the head and move both at the same pace
    ptr1 = head
    ptr2 = slow  # The meeting point
    while ptr1 != ptr2:
        ptr1 = ptr1.next
        ptr2 = ptr2.next
    return ptr1
```

## Approach
This is a two-step approach based on **Floyd's Tortoise and Hare Algorithm** (fast/slow pointers):

1. **Cycle Detection:** Use two pointers, `slow` (moves 1 step) and `fast` (moves 2 steps). If they meet, a cycle exists.

2. **Cycle Start Node:** If a cycle exists, reset one pointer (`ptr1`) to the list head, and leave the other (`ptr2`) at the meeting point. Move both pointers one step at a time. The node where they meet again is the start of the cycle. This works because the distance from the head to the cycle start is the same as the distance from the meeting point to the cycle start.

## Complexity
- **Time Complexity**: O(L) - We traverse the list at most twice, where L is the length of the list.
- **Space Complexity**: O(1) - We use a constant amount of extra space for pointers.
