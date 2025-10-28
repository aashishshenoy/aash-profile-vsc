# Sort Colors
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an array $nums$ with $n$ objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively. You must solve this problem without using the library's sort function. Can you come up with a one-pass algorithm using only constant extra space?
```

## Examples
### Example 1
```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

### Example 2
```
Input: nums = [2,0,1]
Output: [0,1,2]
```

## Constraints
1. n == nums.length
2. 1 <= n <= 300
3. nums[i] is 0, 1, or 2.

## Solution
```python
def sort_colors(nums):
    # Three pointers: p0 for the next 0, p2 for the previous 2, and current for traversal
    p0 = 0      # Tracks the rightmost boundary of 0s
    p2 = len(nums) - 1 # Tracks the leftmost boundary of 2s
    current = 0
    # The loop condition ensures the current pointer doesn't go beyond the leftmost '2' boundary
    while current <= p2:
        if nums[current] == 0:
            # Swap with p0 and advance both pointers
            nums[current], nums[p0] = nums[p0], nums[current]
            p0 += 1
            current += 1
        elif nums[current] == 2:
            # Swap with p2. DO NOT advance current, as the swapped element at current needs re-checking.
            nums[current], nums[p2] = nums[p2], nums[current]
            p2 -= 1
        else:
            # If nums[current] == 1, it's in the correct place, just advance current
            current += 1
```

## Approach
This is the **Dutch National Flag Problem** and can be solved efficiently using the **Three Pointers** technique in a single pass ($O(n)$) and constant extra space ($O(1)$).

1. Initialize three pointers: `p0` (next position for 0, starts at 0), `p2` (last position for 2, starts at $n-1$), and `current` (for traversal, starts at 0).

2. Iterate while `current $le p2$ `:

    - If `nums[current] == 0`: Swap $nums[current]$ with $nums[p0]$, then increment both $p0$ and $current$.

    - If `nums[current] == 2`: Swap $nums[current]$ with $nums[p2]$, then decrement $p2$. **Crucially, do not advance `current`** because the newly swapped element at $current$ needs to be checked (it could be a 0, 1, or 2).

    - If `nums[current] == 1`: Increment $current$ (it's already in the correct relative position).

## Complexity
- **Time Complexity**: O(n) - Single pass through the array.
- **Space Complexity**: O(1) - In-place sorting with constant extra space for pointers.
