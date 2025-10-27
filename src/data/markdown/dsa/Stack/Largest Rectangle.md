# Largest Rectangle
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
```

## Examples
### Example 1
```
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle is shown in the shaded area, which has an area of 10.
```

### Example 2
```
Input: heights = [2,4]
Output: 4
```

## Constraints
1. 1 <= heights.length <= 10^5
2. 0 <= heights[i] <= 10^4

## Solution
```python
def largest_rectangle_area(heights):
    n = len(heights)
    max_area = 0
    stack = [-1] # Stores indices, maintains monotonic increasing order of heights
    for i, h in enumerate(heights):
        # While current height is less than the height at the top of the stack (breaking monotonic order)
        while stack[-1] != -1 and heights[stack[-1]] >= h:
            height = heights[stack.pop()]
            # Width is current index (i) - index of the new stack top (left boundary) - 1
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    # Process remaining elements in the stack (all remaining elements have their right boundary as n)
    while stack[-1] != -1:
        height = heights[stack.pop()]
        width = n - stack[-1] - 1
        max_area = max(max_area, height * width)
    return max_area
```

## Approach
This is a classic problem solved using a **Monotonic Increasing Stack**. For any bar at index $i$ with height $h$, we want to find the largest rectangle where $h$ is the limiting height. This requires finding the first bar to the left and the first bar to the right that are **shorter** than $h$.

The monotonic stack stores indices of bars in increasing order of height.

When a new bar breaks the monotonic order (current height $h$ is less than $heights[stack.top()])$, we pop the taller bar $h_{pop}$. For $h_{pop}$, the current index $i$ is its **right boundary**, and the new stack top is its **left boundary** (because $h_{pop}$ is taller than the new top, and $h$ is shorter). We calculate the area using $h_{pop}$ and update the maximum area.

## Complexity
- **Time Complexity**: O(n) - Each index is pushed and popped from the stack at most once.
- **Space Complexity**: O(n) - In the worst case (e.g., heights are strictly increasing), the stack stores all $n$ indices.
