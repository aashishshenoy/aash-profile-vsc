# The Circular Game
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
There are $n$ friends standing in a circle, numbered from 1 to $n$. You start at friend 1. Proceeding clockwise, you eliminate the $k^{th}$ friend. The circle closes and the game continues. The last friend remaining is the winner. Return the winner's number.
```

## Examples
### Example 1
```
Input: n = 5, k = 2
Output: 3
Explanation: 1: [1,2,3,4,5]
2: [1,3,4,5] (2 is eliminated)
3: [1,3,5] (4 is eliminated)
4: [3,5] (1 is eliminated)
5: [3] (5 is eliminated)
Winner is 3.
```

### Example 2
```
Input: n = 6, k = 5
Output: 1
```

## Constraints
1. 1 <= n <= 500
2. 1 <= k <= 500

## Solution
```python
from collections import deque
def find_the_winner_queue(n, k):
    queue = deque(range(1, n + 1))
    while len(queue) > 1:
        # Move k-1 elements from front to back (skip k-1 friends)
        for _ in range(k - 1):
            queue.append(queue.popleft())
        # The kth friend (now at the front) is eliminated
        queue.popleft()
    return queue[0] if queue else -1
def find_the_winner_josephus(n, k):
    # Josephus Problem Formula (recursive/DP approach)
    # f(n, k) = (f(n-1, k) + k) % n
    # Base case: f(1, k) = 0 (using 0-based indexing)
    winner_index = 0
    for i in range(1, n + 1):
        winner_index = (winner_index + k) % i
    # Convert 0-based index to 1-based number
    return winner_index + 1
```

## Approach
This is the famous **Josephus Problem**. Two common approaches exist:

1. **Simulation (Queue):** Use a **Queue (Deque)** to simulate the process. In each round, move $k-1$ elements from the front to the back, then remove the $k^{th}$ element from the front. This is intuitive but slower ($O(n cdot k)$).

2. **Dynamic Programming/Math:** Use the Josephus Problem recurrence relation: $f(n, k) = (f(n-1, k) + k) pmod n$, where $f(n, k)$ is the $0$-based index of the winner among $n$ people. This solution is significantly faster ($O(n)$) and is typically the intended optimized solution.

## Complexity
- **Time Complexity**: Queue Simulation: O(n * k). Josephus Formula: O(n).
- **Space Complexity**: Queue Simulation: O(n). Josephus Formula: O(1).
