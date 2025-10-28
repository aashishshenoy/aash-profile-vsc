# Three Sum
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.
```

## Examples
### Example 1
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

### Example 2
```
Input: nums = [0,1,1]
Output: []
```

### Example 3
```
Input: nums = [0,0,0]
Output: [[0,0,0]]
```

## Constraints
1. 3 <= nums.length <= 3000
2. -10^5 <= nums[i] <= 10^5

## Solution
```python
def three_sum(nums):
    nums.sort()
    result = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # Skip duplicate i
        left, right = i + 1, n - 1
        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            if current_sum < 0:
                left += 1
            elif current_sum > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1  # Skip duplicate left
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1 # Skip duplicate right
    return result
```

## Approach
The core idea is to combine sorting with the **Two Pointers** technique. First, sort the array (O(n log n)). Then, iterate through the array with a primary pointer $i$. For each $nums[i]$, use two pointers, $left$ and $right$, on the rest of the array to find pairs that sum to $-nums[i]$. This reduces the problem to a two-sum variation on a sorted array. We skip duplicate values for $i$, $left$, and $right$ to ensure the solution set contains no duplicate triplets.

## Complexity
- **Time Complexity**: O(n^2) - The sort takes O(n log n), and the nested two-pointer loop takes O(n^2).
- **Space Complexity**: O(log n) to O(n) - Depending on the sorting algorithm used (for the space needed for sorting).
