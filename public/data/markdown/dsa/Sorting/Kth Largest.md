# Kth Largest Element In An Array
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an integer array $nums$ and an integer $k$, return the $k^{th}$ largest element in the array. Note that it is the $k^{th}$ largest element in the sorted order, not the $k^{th}$ distinct element. Can you solve it without sorting?
```

## Examples
### Example 1
```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

### Example 2
```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

## Constraints
1. 1 <= k <= nums.length <= 10^5
2. -10^4 <= nums[i] <= 10^4

## Solution
```python
import heapq
def find_kth_largest_heap(nums, k):
    # Max-Heap (simulated by min-heap of negative values)
    # Or use a Min-Heap of size k
    # We want the kth largest, so we keep a min-heap of the k largest elements seen so far.
    min_heap = []
    for num in nums:
        if len(min_heap) < k:
            heapq.heappush(min_heap, num)
        elif num > min_heap[0]:
            heapq.heapreplace(min_heap, num)
    return min_heap[0]
def find_kth_largest_quickselect(nums, k):
    # The QuickSelect algorithm (Partition Logic) is the most efficient (Average O(n))
    # Implementation is complex due to in-place partitioning, so Min-Heap is a simpler approach.
    pass
```

## Approach
This is a selection problem. While sorting ($O(n log n)$) works, a more efficient solution can be achieved using:

1. **Min-Heap (Priority Queue) of size $k$**: Maintain a min-heap that stores the $k$ largest elements encountered so far. Iterate through the array; if the current element is larger than the heap's minimum (the smallest of the $k$ largest), replace the minimum with the current element. After iteration, the heap's minimum is the $k^{th}$ largest element. Time: $O(n log k)$.

2. **QuickSelect (Partition Algorithm)**: This is based on QuickSort's partitioning logic. On average, it finds the $k^{th}$ element in $O(n)$ time. The worst case is $O(n^2)$, but a randomized pivot choice keeps the average time complexity efficient. (For this problem, the Min-Heap is usually easier to implement and sufficient for constraints.)

## Complexity
- **Time Complexity**: O(n log k) - Using a Min-Heap of size k. Average O(n) using QuickSelect.
- **Space Complexity**: O(k) - For the Min-Heap.
