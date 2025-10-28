# Design Circular Queue
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO principle and the last position is connected back to the first position to make a circle. It is also called 'Ring Buffer'. Implement the MyCircularQueue class.
```

## Examples
### Example 1
```
Input: ["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output: [null, true, true, true, false, 3, true, true, true, 4]
Explanation: MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1);  // return True
myCircularQueue.enQueue(2);  // return True
myCircularQueue.enQueue(3);  // return True
myCircularQueue.enQueue(4);  // return False, queue is full
myCircularQueue.Rear();      // return 3
myCircularQueue.isFull();    // return True
myCircularQueue.deQueue();   // return True
myCircularQueue.enQueue(4);  // return True
myCircularQueue.Rear();      // return 4
```

## Constraints
1. 1 <= k <= 1000
2. 0 <= value <= 1000
3. At most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty, and isFull.

## Solution
```python
class MyCircularQueue:
    def __init__(self, k: int):
        # Use a list/array with k slots for capacity
        self.queue = [0] * k
        self.capacity = k
        self.head_index = 0
        self.count = 0
    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        # Calculate tail index: (head_index + count) % capacity
        tail_index = (self.head_index + self.count) % self.capacity
        self.queue[tail_index] = value
        self.count += 1
        return True
    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        # Advance the head index circularly
        self.head_index = (self.head_index + 1) % self.capacity
        self.count -= 1
        return True
    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.head_index]
    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        # Calculate rear index: (head_index + count - 1) % capacity
        tail_index = (self.head_index + self.count - 1) % self.capacity
        return self.queue[tail_index]
    def isEmpty(self) -> bool:
        return self.count == 0
    def isFull(self) -> bool:
        return self.count == self.capacity
```

## Approach
The circular queue is best implemented using a fixed-size **array (list)** and two pointers/indices: `head_index` and a mechanism to find the `tail_index` (using `count`). The modulo operator (`%`) is key to the circular movement.

1. **`enQueue`:** The new element is placed at $index = (head_index + count) pmod{capacity}$. `count` is incremented.

2. **`deQueue`:** The `head_index` is moved to $(head_index + 1) pmod{capacity}$. `count` is decremented.

3. The `count` variable is used to determine `isFull` ($count == capacity$) and `isEmpty` ($count == 0$), which avoids ambiguity when using only two indices (e.g., `head == tail`).

## Complexity
- **Time Complexity**: O(1) - All operations are constant time.
- **Space Complexity**: O(k) - To store the queue elements in the array of size $k$.
