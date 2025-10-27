# Min Stack
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class.
```

## Examples
### Example 1
```
Input: ["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output: [null,null,null,null,-3,null,0,-2]
Explanation: MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

## Constraints
1. -2^31 <= val <= 2^31 - 1
2. Methods pop, top and getMin operations will always be called on non-empty stacks.
3. At most 3 * 10^4 calls will be made to push, pop, top, and getMin.

## Solution
```python
class MinStack:
    def __init__(self):
        self.stack = []       # Main stack to store (value, current_min) tuples
    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = self.stack[-1][1]
            new_min = min(val, current_min)
            self.stack.append((val, new_min))
    def pop(self) -> None:
        self.stack.pop()
    def top(self) -> int:
        return self.stack[-1][0]
    def getMin(self) -> int:
        return self.stack[-1][1]
```

## Approach
The key to achieving $O(1)$ time complexity for `getMin` is to store the minimum value **alongside** the current value in the stack. This can be done by using a single stack of **tuples/pairs** `(value, min_so_far)` or by using two separate stacks.

In the single stack of tuples approach, when pushing a new `val`, the `min_so_far` element is calculated as $min(val, min_so_far_of_previous_element)$. This way, the minimum element for all elements *up to and including* the current one is always readily available at the top of the stack.

All operations (`push`, `pop`, `top`, `getMin`) are $O(1)$ time complexity.

## Complexity
- **Time Complexity**: O(1) - All four required operations are constant time.
- **Space Complexity**: O(n) - We store two values (or a tuple) for each of the $n$ elements in the stack.
