# Two Sum
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
```

## Examples
### Example 1
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

### Example 2
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Example 3
```
Input: nums = [3,3], target = 6
Output: [0,1]
```

## Constraints
1. 2 <= nums.length <= 10^4
2. -10^9 <= nums[i] <= 10^9
3. -10^9 <= target <= 10^9
4. Only one valid answer exists.

## Solution
```python
def two_sum(nums, target):
   num_map = {}
   for i, num in enumerate(nums):
       complement = target - num
       if complement in num_map:
           return [num_map[complement], i]
       num_map[num] = i
   return []
```

## Approach
This solution uses a hash map to efficiently find the complement of each number. For each number, we check if its complement (target - current number) has been seen before. If it has, we return the indices. If not, we add the current number and its index to the map.

## Complexity
- **Time Complexity**: O(n) - We traverse the array once.
- **Space Complexity**: O(n) - In the worst case, the hash map stores almost all elements.
