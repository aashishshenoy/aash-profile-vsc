# First Missing Positive
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
Given an unsorted integer array nums, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses constant extra space.
```

## Examples
### Example 1
```
Input: nums = [1,2,0]
Output: 3
```

### Example 2
```
Input: nums = [3,4,-1,1]
Output: 2
```

### Example 3
```
Input: nums = [7,8,9,11,12]
Output: 1
```

## Constraints
1. 1 <= nums.length <= 5 * 10^5
2. -2^31 <= nums[i] <= 2^31 - 1

## Solution
```python
def first_missing_positive(nums):
    n = len(nums)
    # 1. Place each number in its correct index (i.e., put '1' at index 0, '2' at index 1, etc.)
    for i in range(n):
        # Condition checks: nums[i] is positive, within array bounds, and not already in its correct place
        while 1 <= nums[i] <= n and nums[i] != nums[nums[i] - 1]:
            val = nums[i]
            nums[i], nums[val - 1] = nums[val - 1], nums[i] # Swap to correct position
    # 2. Find the first index i where nums[i] != i + 1
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    # 3. If all numbers from 1 to n are present, the missing positive is n + 1
    return n + 1
```

## Approach
This in-place O(n) time and O(1) extra space solution uses the array itself as a hash map. We only care about positive integers from 1 to $n$.

1. **Placement:** Iterate through the array. For each element $nums[i]$, if it's a positive number $x$ and $1 ≤ x ≤ n$, swap it into its 'correct' index ($x-1$) until it's in place or the condition is no longer met. This ensures that after the first pass, if the smallest missing positive is $≤ n$, it will be found in the second pass.

2. **Search:** Iterate from index $0$ to $n-1$. The first index $i$ where $nums[i] ≠ i+1$ means that $i+1$ is the smallest missing positive. 

3. **Edge Case:** If all numbers from 1 to $n$ are present (e.g., $[1, 2, 3]$), the smallest missing positive is $n+1$.

## Complexity
- **Time Complexity**: O(n) - While there is a nested loop, each number is only swapped to its correct position at most once, leading to an overall O(n) complexity.
- **Space Complexity**: O(1) - The operation is done in-place.
