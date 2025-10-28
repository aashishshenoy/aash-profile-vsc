# Binary Search
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given an array of integers $nums$ which is sorted in ascending order, and an integer $target$, write a function to search $target$ in $nums$. If $target$ exists, then return its index. Otherwise, return -1. You must write an algorithm with $O(log n)$ runtime complexity.
```

## Examples
### Example 1
```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4.
```

### Example 2
```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1.
```

## Constraints
1. 1 <= nums.length <= 10^4
2. -10^4 < nums[i], target < 10^4
3. All the integers in nums are unique.
4. nums is sorted in ascending order.

## Solution
```python
def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            # Target is in the right half (exclusive of mid)
            low = mid + 1
        else:
            # Target is in the left half (exclusive of mid)
            high = mid - 1
    return -1
```

## Approach
This is the standard **Binary Search** algorithm, designed for a sorted array to achieve $O(log n)$ time complexity by repeatedly dividing the search interval in half. We use two pointers, `low` and `high`, to define the search space.

1. Initialize `low = 0` and `high = len(nums) - 1`.

2. While `low le high`:

    - Calculate `mid` index.

    - If $nums[mid]$ is the $target$, return $mid$.

    - If $nums[mid] < target$, the target must be in the right subarray, so set $low = mid + 1$.

    - If $nums[mid] > target$, the target must be in the left subarray, so set $high = mid - 1$.

3. If the loop terminates, the target was not found, return $-1$.

## Complexity
- **Time Complexity**: O(log n) - The search space is halved in each step.
- **Space Complexity**: O(1) - Constant extra space for pointers.
