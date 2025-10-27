# Find First And Last Position Of Element In Sorted Array
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an array of integers $nums$ sorted in non-decreasing order, find the starting and ending position of a given $target$ value. If $target$ is not found in the array, return $[-1, -1]$. You must write an algorithm with $O(log n)$ runtime complexity.
```

## Examples
### Example 1
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

### Example 2
```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

### Example 3
```
Input: nums = [], target = 0
Output: [-1,-1]
```

## Constraints
1. 0 <= nums.length <= 10^5
2. -10^9 <= nums[i] <= 10^9
3. nums is a non-decreasing array.
4. -10^9 <= target <= 10^9

## Solution
```python
def search_range(nums, target):
    def find_boundary(nums, target, is_finding_left):
        low, high = 0, len(nums) - 1
        boundary_index = -1
        while low <= high:
            mid = low + (high - low) // 2
            if nums[mid] == target:
                boundary_index = mid
                if is_finding_left:
                    # Found a match, but search further left for the *first* occurrence
                    high = mid - 1
                else:
                    # Found a match, but search further right for the *last* occurrence
                    low = mid + 1
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return boundary_index
    first = find_boundary(nums, target, True)
    last = find_boundary(nums, target, False)
    return [first, last]
```

## Approach
Since the array is sorted and an $O(log n)$ solution is required, we use **Binary Search**, but we need two specialized binary searches: one to find the **leftmost (first) occurrence** and one for the **rightmost (last) occurrence**.

1. **`find_left`:** When a `target` is found at $mid$, we store $mid$ as a potential answer and continue searching in the left subarray ($high = mid - 1$) to find an earlier index.

2. **`find_right`:** When a `target` is found at $mid$, we store $mid$ as a potential answer and continue searching in the right subarray ($low = mid + 1$) to find a later index.

If the first search returns $-1$, the target is not in the array, and we return $[-1, -1]$. Otherwise, the two searches give the required range.

## Complexity
- **Time Complexity**: O(log n) - Two separate binary search operations.
- **Space Complexity**: O(1) - Constant extra space for pointers.
