# Find Peak Element
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
A peak element is an element that is strictly greater than its neighbors. Given an integer array $nums$, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that $nums[-1] = nums[n] = -infty$. You must write an algorithm that runs in $O(log n)$ time.
```

## Examples
### Example 1
```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element, and your function should return the index number 2.
```

### Example 2
```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index 1 where the peak is 2, or index 5 where the peak is 6.
```

## Constraints
1. 1 <= nums.length <= 1000
2. -2^31 <= nums[i] <= 2^31 - 1
3. $nums[i] 
eq nums[i+1]$ for all valid $i$.

## Solution
```python
def find_peak_element(nums):
    low, high = 0, len(nums) - 1
    while low < high:
        mid = (low + high) // 2
        # Check if the right neighbor is greater
        if nums[mid] < nums[mid + 1]:
            # If mid < mid+1, it means there must be a peak on the right side.
            # The peak could be at mid+1 or further right.
            low = mid + 1
        else:
            # If mid > mid+1, the peak must be at mid or on the left side (since a peak is guaranteed to exist).
            high = mid
    # When low == high, it's the index of a peak
    return low
```

## Approach
To achieve $O(log n)$ time complexity, a modified **Binary Search** is used. Since the array is guaranteed to have at least one peak, we can use the relative relationship between $nums[mid]$ and $nums[mid+1]$ to prune the search space.

1. Compare $nums[mid]$ with its right neighbor $nums[mid+1]$.

2. If $nums[mid] < nums[mid+1]$, it means we're on an ascending slope, so the peak must be to the right (including $mid+1$). Set $low = mid + 1$.

3. If $nums[mid] > nums[mid+1]$, it means we're on a descending slope (or at a peak). The peak must be at $mid$ or to the left. Set $high = mid$.

The loop continues until $low == high$, which points to a peak element.

## Complexity
- **Time Complexity**: O(log n) - Binary search reduces the search space by half in each iteration.
- **Space Complexity**: O(1) - Constant extra space for variables.
