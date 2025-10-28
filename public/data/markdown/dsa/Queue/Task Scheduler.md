# Task Scheduler
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given a character array `tasks` representing the tasks a CPU needs to do, where each letter represents a different task. Tasks are executed in order. A non-negative integer $n$ represents the cooling interval between two **same** tasks. Find the least number of units of time the CPU needs to complete all the given tasks.
```

## Examples
### Example 1
```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B
There is a minimum of 2 units of time between any two 'A's or any two 'B's.
```

### Example 2
```
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: A -> A -> A -> B -> B -> B
```

### Example 3
```
Input: tasks = ["A","B","C","D","E","F"], n = 2
Output: 6
Explanation: A -> B -> C -> D -> E -> F
```

## Constraints
1. 1 <= tasks.length <= 10^4
2. tasks[i] is an uppercase English letter.
3. 0 <= n <= 100

## Solution
```python
def least_interval(tasks, n):
    from collections import Counter
    counts = Counter(tasks)
    # Find the maximum frequency (max_freq) and the number of tasks with that frequency (max_freq_count)
    max_freq = max(counts.values())
    max_freq_count = sum(1 for count in counts.values() if count == max_freq)
    # The 'frame' approach: tasks are placed into (max_freq - 1) chunks of size (n + 1), plus the last row.
    # The number of slots is determined by the most frequent task. The size of the last chunk is max_freq_count.
    min_intervals = (max_freq - 1) * (n + 1) + max_freq_count
    # The result is the maximum of the minimum intervals required by the cooling time or the total number of tasks.
    return max(len(tasks), min_intervals)
```

## Approach
This is a **Greedy** approach that calculates the minimum time based on the most frequent task. The idea is to build a sequence of tasks using a *frame* (or a block of time) of size $n+1$:

1. Determine the **maximum frequency** ($max_freq$) and the **count** of tasks with that frequency ($max_freq_count$).

2. The minimum time slots needed for the most frequent task, assuming no gaps are wasted, is given by the expression: $(max_freq - 1) times (n + 1) + max_freq_count$. This represents $max_freq - 1$ full blocks of $n+1$ size, plus the final block which is just the $max_freq_count$ tasks.

3. The final answer is the maximum of this calculated minimum time and the total number of tasks ($len(tasks)$), as there may not be enough idle time necessary to complete all tasks, or the total number of tasks itself is the minimum time.

## Complexity
- **Time Complexity**: O(N) - Where N is the number of tasks, dominated by the `Counter` calculation and a single pass to find the max frequency count.
- **Space Complexity**: O(1) - Since the number of unique tasks is limited to 26 (uppercase letters), the space complexity is constant, $O(26) = O(1)$.
