# Subarray K Sum
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
```

## Examples
### Example 1
```
Input: nums = [1,1,1], k = 2
Output: 2
```

### Example 2
```
Input: nums = [1,2,3], k = 3
Output: 2
```

## Constraints
1. 1 <= nums.length <= 2 * 10^4
2. -1000 <= nums[i] <= 1000
3. -10^7 <= k <= 10^7

## Solution
```python
def subarray_sum(nums, k):
    count = 0
    current_sum = 0
    # Map: prefix_sum -> number of times this sum has occurred
    prefix_sum_counts = {0: 1}
    for num in nums:
        current_sum += num
        # The problem asks for subarray sum = k. This means: current_sum - prefix_sum = k
        # or, prefix_sum = current_sum - k
        # We check how many times the required prefix_sum has occurred.
        if current_sum - k in prefix_sum_counts:
            count += prefix_sum_counts[current_sum - k]
        # Update the count for the current prefix_sum
        prefix_sum_counts[current_sum] = prefix_sum_counts.get(current_sum, 0) + 1
    return count
```

## Approach
This dynamic programming-like approach uses a **hash map (dictionary)** to store the counts of all prefix sums encountered so far. For each element, we update the current prefix sum. If $current_sum - k$ exists in the map, it means a subarray ending at the current index with a sum of $k$ exists, and the count of that prefix sum is added to the result. We then add the $current_sum$ to the map.

## Complexity
- **Time Complexity**: O(n) - We iterate through the array once, and map operations are O(1) average time.
- **Space Complexity**: O(n) - In the worst case, the hash map stores n distinct prefix sums.
