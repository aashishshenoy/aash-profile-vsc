# Merge K Sorted Lists
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
You are given an array of k linked-lists lists, each linked list is sorted in ascending order. Merge all the linked-lists into one sorted linked list and return it.
```

## Examples
### Example 1
```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The lists are:
[1->4->5],
[1->3->4],
[2->6]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

### Example 2
```
Input: lists = []
Output: []
```

### Example 3
```
Input: lists = [[]]
Output: []
```

## Constraints
1. k == lists.length
2. 0 <= k <= 10^4
3. 0 <= lists[i].length <= 500
4. -10^4 <= lists[i][j] <= 10^4
5. lists[i] is sorted in ascending order.
6. The total number of nodes in all lists will not exceed 10^4.

## Solution
```python
from heapq import heappush, heappop
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    # Enable comparison for the priority queue
    def __lt__(self, other):
        return self.val < other.val
def merge_k_lists(lists):
    min_heap = []
    # 1. Push the head of each non-empty list into the min-heap
    for head in lists:
        if head:
            heappush(min_heap, head)
    dummy = ListNode(0)
    tail = dummy
    # 2. Extract min node, attach it, and push its next node
    while min_heap:
        smallest = heappop(min_heap)
        tail.next = smallest
        tail = tail.next
        if smallest.next:
            heappush(min_heap, smallest.next)
    return dummy.next
```

## Approach
This is typically solved efficiently using a **Min-Heap (Priority Queue)**. The heap stores one node from each of the $k$ lists (specifically, the smallest unmerged node from each list).

1. Initialize a min-heap and insert the head of every non-empty list.

2. While the heap is not empty, extract the minimum node (which will be the next node in the merged list).

3. Append this node to the merged list and, if the extracted node has a `next` node, insert that `next` node into the heap.

## Complexity
- **Time Complexity**: O(N log k) - Where N is the total number of nodes in all lists and k is the number of lists. For each of the N nodes, we perform a heap operation (insertion or extraction) which takes O(log k) time.
- **Space Complexity**: O(k) - The min-heap holds up to $k$ elements (one from each list).
