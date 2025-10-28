# Sort List
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given the head of a linked list, return the list sorted in ascending order. Can you sort the linked list in $O(n log n)$ time and $O(log n)$ memory (i.e., minimal space complexity)?
```

## Examples
### Example 1
```
Input: head = [4,2,1,3]
Output: [1,2,3,4]
```

### Example 2
```
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
```

### Example 3
```
Input: head = []
Output: []
```

## Constraints
1. The number of nodes in the list is in the range [0, 5 * 10^4].
2. -10^5 <= Node.val <= 10^5

## Solution
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def sort_list(head):
    if not head or not head.next:
        return head
    # 1. Split the list into two halves (Find middle using Fast/Slow Pointers)
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next # mid is the start of the second half
    slow.next = None # Break the list into two halves
    # 2. Recursively sort the two halves
    left = sort_list(head)
    right = sort_list(mid)
    # 3. Merge the two sorted halves
    return merge(left, right)
def merge(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val < l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next
```

## Approach
To achieve $O(n log n)$ time complexity and minimal space complexity, the ideal sorting algorithm for a linked list is **Merge Sort**.

1. **Split:** Recursively divide the list into two halves until the base case (single node or empty list). The middle is found using the **Fast/Slow Pointers** method.

2. **Recurse:** Recursively call `sort_list` on both halves.

3. **Merge:** Merge the two sorted halves back together. The merging process involves comparing the heads of the two lists and iteratively linking the smaller node to the merged list (same as 'Merge Two Sorted Lists').

The top-down recursive Merge Sort has a space complexity of $O(log n)$ due to the recursion stack depth.

## Complexity
- **Time Complexity**: O(n log n) - Standard time complexity for Merge Sort.
- **Space Complexity**: O(log n) - Due to the recursion stack depth (top-down Merge Sort).
