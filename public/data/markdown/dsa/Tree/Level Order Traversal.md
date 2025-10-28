# Binary Tree Level Order Traversal
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
```

## Examples
### Example 1
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

### Example 2
```
Input: root = [1]
Output: [[1]]
```

### Example 3
```
Input: root = []
Output: []
```

## Constraints
1. The number of nodes in the tree is in the range [0, 2000].
2. -1000 <= Node.val <= 1000

## Solution
```python
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        current_level = []
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(current_level)
    return result
```

## Approach
This is a classic problem for **Breadth First Search (BFS)**, which uses a **Queue**. BFS naturally explores nodes level by level.

1. Initialize a queue with the root node and an empty list for the result.

2. While the queue is not empty, get the number of nodes at the current level (`level_size`).

3. Iterate `level_size` times, dequeueing each node, adding its value to the current level's list, and enqueuing its children.

4. After the inner loop, add the current level's list of values to the overall result.

## Complexity
- **Time Complexity**: O(n) - We visit each node exactly once.
- **Space Complexity**: O(n) - In the worst case (a complete binary tree), the queue may hold up to $n/2$ nodes, which is $O(n)$.
