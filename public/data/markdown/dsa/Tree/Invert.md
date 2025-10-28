# Invert Binary Tree
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given the root of a binary tree, invert the tree, and return its root. Inverting a tree means swapping the left and right children of every node.
```

## Examples
### Example 1
```
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

### Example 2
```
Input: root = [2,1,3]
Output: [2,3,1]
```

### Example 3
```
Input: root = []
Output: []
```

## Constraints
1. The number of nodes in the tree is in the range [0, 100].
2. -100 <= Node.val <= 100

## Solution
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def invert_tree(root):
    if not root:
        return None
    # Swap the left and right children
    root.left, root.right = root.right, root.left
    # Recursively call on the new children
    invert_tree(root.left)
    invert_tree(root.right)
    return root
```

## Approach
This can be solved recursively using **Depth First Search (DFS)**. For every node, we swap its left and right children, then recursively call the function on the newly swapped children. The base case is a null node, for which we do nothing.

## Complexity
- **Time Complexity**: O(n) - We visit each node exactly once.
- **Space Complexity**: O(h) - Where $h$ is the height of the tree, representing the maximum size of the recursion stack. $O(n)$ in the worst case, $O(log n)$ in the best case.
