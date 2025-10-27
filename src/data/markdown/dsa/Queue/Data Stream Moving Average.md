# Data Stream Moving Average
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window. Implement the MovingAverage class.
```

## Examples
### Example 1
```
Input: MovingAverage m = new MovingAverage(3);
m.next(1)   // return 1.0
m.next(10)  // return (1 + 10) / 2 = 5.5
m.next(3)   // return (1 + 10 + 3) / 3 = 4.66667
m.next(5)   // return (10 + 3 + 5) / 3 = 6.0
Output: [null, 1.0, 5.5, 4.66667, 6.0]
```

## Constraints
1. 1 <= size <= 1000
2. -10^5 <= val <= 10^5
3. At most 10^4 calls will be made to next.

## Solution
```python
from collections import deque
class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.queue = deque()
        self.window_sum = 0
    def next(self, val: int) -> float:
        # 1. Add new element and update sum
        self.queue.append(val)
        self.window_sum += val
        # 2. Check if the queue size exceeds the window size
        if len(self.queue) > self.size:
            # 3. Remove the oldest element and update sum
            oldest_val = self.queue.popleft()
            self.window_sum -= oldest_val
        # 4. Calculate and return the average
        return self.window_sum / len(self.queue)
```

## Approach
This is a classic **Sliding Window** problem, best solved using a **Queue (Deque)** and a running sum. A queue maintains the FIFO property, ensuring that the oldest element is always at the front for removal.

1. Use a `deque` (for O(1) removals from the left) and a `window_sum` variable.

2. For each `next(val)` call, add `val` to the queue and `window_sum`.

3. If the queue size exceeds the maximum `size`, remove the oldest element from the front (`popleft`) and subtract it from `window_sum`.

4. Return the `window_sum` divided by the current number of elements in the queue.

## Complexity
- **Time Complexity**: O(1) - All operations (append, popleft, addition, subtraction, division) are constant time.
- **Space Complexity**: O(size) - The queue stores up to $size$ elements.
