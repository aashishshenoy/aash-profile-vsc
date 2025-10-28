# Serialize And Deserialize Binary Tree
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection channel, and later reconstructed in the same or another computer environment (deserialization). Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to be able to serialize a binary tree to a string and deserialize it back to the original tree structure.
```

## Examples
### Example 1
```
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
```

## Constraints
1. The number of nodes in the tree is in the range [0, 10^4].
2. -1000 <= Node.val <= 1000

## Solution
```python
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Codec:
    def serialize(self, root):
        if not root:
            return "#"
        # Use BFS (Level Order Traversal) to serialize
        queue = deque([root])
        result = [str(root.val)]
        while queue:
            node = queue.popleft()
            # Left child
            if node.left:
                result.append(str(node.left.val))
                queue.append(node.left)
            else:
                result.append("#")
            # Right child
            if node.right:
                result.append(str(node.right.val))
                queue.append(node.right)
            else:
                result.append("#")
        # Trim trailing '#'s that don't help reconstruction
        while result[-1] == "#":
            result.pop()
        return " ".join(result)
    def deserialize(self, data):
        if data == "#" or not data:
            return None
        nodes = data.split(' ')
        root = TreeNode(int(nodes[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(nodes):
            parent = queue.popleft()
            # Left child
            if nodes[i] != "#":
                parent.left = TreeNode(int(nodes[i]))
                queue.append(parent.left)
            i += 1
            # Right child
            if i < len(nodes) and nodes[i] != "#":
                parent.right = TreeNode(int(nodes[i]))
                queue.append(parent.right)
            i += 1
        return root
```

## Approach
The most common way to serialize a generic binary tree is using a form of **Level Order Traversal (BFS)** or **Preorder Traversal (DFS)** that includes `null` markers. This solution uses a modified **BFS**.

1. **Serialization:** Traverse the tree level by level. For a node, append its value to the string. If a child is `null`, append a unique marker (e.g., `'#'`). This ensures that the structure is preserved.

2. **Deserialization:** Parse the string into a list of node values/markers. Rebuild the tree using a queue (FIFO) to keep track of parent nodes. For each parent, use the next two values in the list to create its left and right children (or skip if the marker is encountered).

## Complexity
- **Time Complexity**: O(n) - We visit and process each node once.
- **Space Complexity**: O(n) - For the string representation and the queue/recursion stack.
