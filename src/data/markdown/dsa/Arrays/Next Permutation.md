# Next Permutation
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers. If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order). The replacement must be in place and use only constant extra memory.
```

## Examples
### Example 1
```
Input: nums = [1,2,3]
Output: [1,3,2]
```

### Example 2
```
Input: nums = [3,2,1]
Output: [1,2,3]
```

### Example 3
```
Input: nums = [1,1,5]
Output: [1,5,1]
```

## Constraints
1. 1 <= nums.length <= 100
2. 0 <= nums[i] <= 100

## Solution
```python
def next_permutation(nums):
    n = len(nums)
    # 1. Find the largest index k such that nums[k] < nums[k + 1]
    k = -1
    for i in range(n - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            k = i
            break
    # If no such index exists, the permutation is the largest possible (reverse the entire array)
    if k == -1:
        nums.reverse()
        return
    # 2. Find the largest index l > k such that nums[k] < nums[l]
    l = -1
    for i in range(n - 1, k, -1):
        if nums[k] < nums[i]:
            l = i
            break
    # 3. Swap nums[k] and nums[l]
    nums[k], nums[l] = nums[l], nums[k]
    # 4. Reverse the sub-array nums[k + 1:]
    left, right = k + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
```

## Approach
The algorithm finds the next lexicographically greater permutation in-place using a four-step process:

1. **Find Pivot:** Find the largest index $k$ such that $nums[k] < nums[k+1]$. If none exists, the array is the last permutation, so reverse it.

2. **Find Swap Target:** Find the largest index $l > k$ such that $nums[k] < nums[l]$. This is the smallest element to the right of $k$ that is still greater than $nums[k]$.

3. **Swap:** Swap $nums[k]$ and $nums[l]$.

4. **Reverse Suffix:** Reverse the subarray $nums[k+1:]$. Because the suffix was in descending order, reversing it puts it in the lowest possible ascending order, thus creating the lexicographically next permutation.

## Complexity
- **Time Complexity**: O(n) - We perform a constant number of passes over the array.
- **Space Complexity**: O(1) - The operation is done in-place.
