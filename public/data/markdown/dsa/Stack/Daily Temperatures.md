# Daily Temperatures
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the $i^{th}$ day to get a warmer temperature. If there is no future day for which this is possible, keep $answer[i] == 0$ instead.
```

## Examples
### Example 1
```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

### Example 2
```
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

### Example 3
```
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

## Constraints
1. 1 <= temperatures.length <= 10^5
2. 30 <= temperatures[i] <= 100

## Solution
```python
def daily_temperatures(temperatures):
    n = len(temperatures)
    answer = [0] * n
    stack = [] # Stores indices (i, temperature[i])
    for i, temp in enumerate(temperatures):
        # While stack is not empty AND the current temperature is warmer than the temperature at the top of the stack
        while stack and temp > temperatures[stack[-1]]:
            # Pop the index of the day that just found its warmer day
            prev_index = stack.pop()
            # Calculate the waiting days
            answer[prev_index] = i - prev_index
        # Push the current day's index onto the stack
        stack.append(i)
    return answer
```

## Approach
This problem is solved using a **Monotonic Decreasing Stack**. The stack stores the **indices** of the days in decreasing order of their temperatures. This means that if we encounter a new temperature $T_{new}$:

1. We pop all indices $i$ from the stack for which $temperatures[i] < T_{new}$.

2. For each popped index $i$, its waiting period is $current_index - i$.

3. We push $current_index$ onto the stack. By keeping the stack monotonic (decreasing temperatures), we ensure that the next day we encounter that's warmer than a day $i$ in the stack will be the *first* such day.

## Complexity
- **Time Complexity**: O(n) - Although there's a nested loop (the `while` loop), each index is pushed onto the stack once and popped off the stack at most once, leading to an overall linear time complexity.
- **Space Complexity**: O(n) - In the worst case (e.g., temperatures are strictly decreasing), the stack stores all $n$ indices.
