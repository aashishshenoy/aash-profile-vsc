# Sliding Window Maximum
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
You are given an array of integers nums, there is a sliding window of size $k$ which is moving from the very left of the array to the very right. You can only see the $k$ numbers in the window. Each time the sliding window moves right by one position. Return the *maximum* element in the sliding window for each move.
```

## Examples
### Example 1
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: Window position: [1, 3, -1] -3 5 3 6 7. Max is 3
Window position: 1 [3, -1, -3] 5 3 6 7. Max is 3
Window position: 1 3 [-1, -3, 5] 3 6 7. Max is 5
Window position: 1 3 -1 [-3, 5, 3] 6 7. Max is 5
Window position: 1 3 -1 -3 [5, 3, 6] 7. Max is 6
Window position: 1 3 -1 -3 5 [3, 6, 7]. Max is 7
```

### Example 2
```
Input: nums = [1], k = 1
Output: [1]
```

## Constraints
1. 1 <= nums.length <= 10^5
2. -10^4 <= nums[i] <= 10^4
3. 1 <= k <= nums.length

## Solution
```python
from collections import deque
def max_sliding_window(nums, k):
    output = []
    # Deque stores indices, maintaining a Monotonic Decreasing order of nums[index]
    deq = deque()
    for i, num in enumerate(nums):
        # 1. Remove elements smaller than the current one from the back (Monotonic property)
        while deq and nums[deq[-1]] <= num:
            deq.pop()
        # 2. Add current element's index to the back
        deq.append(i)
        # 3. Remove index that is out of the window from the front
        if deq[0] == i - k:
            deq.popleft()
        # 4. Record max only after the first window has been formed (i >= k - 1)
        if i >= k - 1:
            # The max is always the element at the index stored at the front of the deque
            output.append(nums[deq[0]])
    return output
```

## Approach
This is a **Sliding Window** problem solved with a **Monotonic Decreasing Deque (Double-Ended Queue)**. The deque stores the **indices** of the elements, and the elements corresponding to these indices are in decreasing order ($nums[i_1] ge nums[i_2] ge dots$).

1. **Monotonic Update:** For a new element, remove all smaller elements from the back of the deque to maintain the decreasing order.

2. **Window Check:** Remove the index from the front if it's no longer within the current window ($index = current_index - k$).

3. **Result:** The element at the front of the deque is always the maximum element in the current sliding window.

## Complexity
- **Time Complexity**: O(n) - Each index is added to the deque once and removed at most once.
- **Space Complexity**: O(k) - The deque stores at most $k$ elements.
