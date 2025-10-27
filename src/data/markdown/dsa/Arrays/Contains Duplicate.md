# Contains Duplicate
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
```

## Examples
### Example 1
```
Input: nums = [1,2,3,1]
Output: true
```

### Example 2
```
Input: nums = [1,2,3,4]
Output: false
```

### Example 3
```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

## Constraints
1. 1 <= nums.length <= 10^5
2. -10^9 <= nums[i] <= 10^9

## Solution
```python
def contains_duplicate(nums):
   seen = set()
   for num in nums:
       if num in seen:
           return True
       seen.add(num)
   return False
```

## Approach
Use a hash set (Set in Python) to efficiently track numbers encountered so far. Iterate through the array; if a number is already in the set, a duplicate exists, so return true. If not, add the number to the set and continue. If the loop finishes, no duplicates were found, so return false.

## Complexity
- **Time Complexity**: O(n) - We iterate through the array once, and set operations are O(1) average time.
- **Space Complexity**: O(n) - In the worst case, the set stores all n distinct elements.
