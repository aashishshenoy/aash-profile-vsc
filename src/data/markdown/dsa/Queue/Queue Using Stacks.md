# Queue Using Stacks
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty). Implement the MyQueue class.
```

## Examples
### Example 1
```
Input: ["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output: [null, null, null, 1, 1, false]
Explanation: MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (left is front)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

## Constraints
1. 1 <= x <= 9
2. At most 100 calls will be made to push, pop, peek, and empty.
3. All calls to pop and peek are valid (i.e., call only when the queue is not empty).

## Solution
```python
class MyQueue:
    def __init__(self):
        self.in_stack = []   # For new elements (push)
        self.out_stack = []  # For old elements (pop/peek)
    def _transfer(self):
        # Transfer all elements from in_stack to out_stack to reverse order
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
    def push(self, x: int) -> None:
        self.in_stack.append(x)
    def pop(self) -> int:
        self._transfer()
        return self.out_stack.pop()
    def peek(self) -> int:
        self._transfer()
        return self.out_stack[-1]
    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack
```

## Approach
This implements a queue using two stacks, `in_stack` (for pushing) and `out_stack` (for popping/peeking). This is known as the **Amortized O(1)** approach.

1. **Push:** Always push to `in_stack` (O(1)).

2. **Pop/Peek:** Before popping/peeking, check `out_stack`. If `out_stack` is empty, transfer *all* elements from `in_stack` to `out_stack`. This reversal ensures FIFO order. Then, pop/peek from `out_stack` (O(1) after transfer, but the transfer is O(n)).

The overall **amortized** time complexity for `pop` and `peek` is $O(1)$ because each element is pushed once to `in_stack`, moved once to `out_stack`, and popped once from `out_stack`. The total cost for $n$ operations is $O(n)$, making the average cost per operation $O(1)$.

## Complexity
- **Time Complexity**: Push: O(1). Pop/Peek: Amortized O(1), Worst Case O(n). Empty: O(1).
- **Space Complexity**: O(n) - To store $n$ elements across two stacks.
