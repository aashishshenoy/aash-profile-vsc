# Stack Using Queues
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty). Implement the MyStack class.
```

## Examples
### Example 1
```
Input: ["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output: [null, null, null, 2, 2, false]
Explanation: MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
```

## Constraints
1. 1 <= x <= 9
2. At most 100 calls will be made to push, pop, top, and empty.
3. All calls to pop and top are valid (i.e., call only when the stack is not empty).

## Solution
```python
from collections import deque
class MyStack:
    def __init__(self):
        self.q = deque()
    def push(self, x: int) -> None:
        # Add new element to the back of the queue (O(1))
        self.q.append(x)
    def pop(self) -> int:
        # To achieve LIFO, move all but the last element to the front (O(n))
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())
        # The last element is the one to be popped (LIFO)
        return self.q.popleft()
    def top(self) -> int:
        # Similar to pop, but put the last element back (O(n))
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())
        top_val = self.q[0] # The last element is now at the front
        self.q.append(self.q.popleft()) # Put it back to maintain order
        return top_val
    def empty(self) -> bool:
        return not self.q
```

## Approach
This implementation uses a **single queue** (effectively, a second queue could be used as temporary storage during the pop/top operations).

The `push` operation is $O(1)$.

The `pop` and `top` operations are $O(n)$ where $n$ is the number of elements in the queue. To achieve LIFO (Stack) behavior from a FIFO (Queue) structure, when popping or looking at the top element, we must dequeue the first $n-1$ elements and enqueue them back to the end of the queue. This leaves the $n^{th}$ element (the last one pushed) at the front to be removed or checked.

## Complexity
- **Time Complexity**: Push: O(1), Pop/Top: O(n), Empty: O(1).
- **Space Complexity**: O(n) - To store $n$ elements.
