# Array Product
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.
```

## Examples
### Example 1
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

### Example 2
```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

## Constraints
1. 2 <= nums.length <= 10^5
2. -30 <= nums[i] <= 30
3. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

## Solution
```python
def product_except_self(nums):
   n = len(nums)
   answer = [1] * n
   # Calculate left products
   left_product = 1
   for i in range(n):
       answer[i] = left_product
       left_product *= nums[i]
   # Calculate right products and combine
   right_product = 1
   for i in range(n - 1, -1, -1):
       answer[i] *= right_product
       right_product *= nums[i]
   return answer
```

## Approach
The solution uses two passes without extra space (excluding the output array). In the first pass, we calculate the product of all elements to the *left* of $nums[i]$ and store it in $answer[i]$. In the second pass, we iterate backward, keeping a running product of elements to the *right* of $nums[i]$, and multiply it with the existing $answer[i]$ (which already holds the left product). The result is $LeftProduct * RightProduct$, which is the product of all elements except $nums[i]$.

## Complexity
- **Time Complexity**: O(n) - Two passes through the array.
- **Space Complexity**: O(1) - Only the output array is used (space complexity is O(1) if output array doesn't count as extra space).
