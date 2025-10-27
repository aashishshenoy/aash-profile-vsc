# Search In Rotated Sorted Array
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
There is an integer array $nums$ sorted in ascending order (with distinct values). Prior to being passed to your function, $nums$ is possibly rotated at an unknown pivot index $k$. Given the array $nums$ after the possible rotation and an integer $target$, return the index of $target$ if it is in $nums$, or $-1$ if it is not in $nums$. You must write an algorithm with $O(log n)$ runtime complexity.
```

## Examples
### Example 1
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

### Example 2
```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

### Example 3
```
Input: nums = [1], target = 0
Output: -1
```

## Constraints
1. 1 <= nums.length <= 5000
2. -10^4 <= nums[i] <= 10^4
3. All values of nums are unique.
4. $nums$ is an ascending array that is possibly rotated.
5. -10^4 <= target <= 10^4

## Solution
```python
def search_rotated(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        # Check if the left half is sorted (nums[low] <= nums[mid])
        if nums[low] <= nums[mid]:
            # Check if target is in the left sorted half
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        # Otherwise, the right half must be sorted (nums[mid] < nums[high])
        else:
            # Check if target is in the right sorted half
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1
```

## Approach
This is a variation of **Binary Search** that handles the rotation. The key is that in a rotated sorted array, at least one half (from `low` to `mid` or from `mid` to `high`) *must* be correctly sorted.

1. **Identify the Sorted Half:** At the `mid` index, determine which half is sorted by comparing $nums[low]$ with $nums[mid]$ and $nums[mid]$ with $nums[high]$.

2. **Narrow the Search:**

    - If the **left half** is sorted, check if $target$ falls within its range ($nums[low] le target < nums[mid]$). If so, search the left half; otherwise, search the right (unsorted) half.

    - If the **right half** is sorted, check if $target$ falls within its range ($nums[mid] < target le nums[high]$). If so, search the right half; otherwise, search the left (unsorted) half.

By always searching the half that *may* contain the target, we maintain the $O(log n)$ complexity.

## Complexity
- **Time Complexity**: O(log n) - Binary search reduces the search space by half in each step.
- **Space Complexity**: O(1) - Constant extra space for pointers.
