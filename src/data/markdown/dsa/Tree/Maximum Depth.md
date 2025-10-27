# Maximum Depth Of Binary Tree
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
```

## Examples
### Example 1
```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

### Example 2
```
Input: root = [1,null,2]
Output: 2
```

### Example 3
```
Input: root = []
Output: 0
```

## Constraints
1. The number of nodes in the tree is in the range [0, 10^4].
2. -100 <= Node.val <= 100

## Solution
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def max_depth(root):
    if not root:
        return 0
    # Recursive definition: 1 + max(depth of left subtree, depth of right subtree)
    return 1 + max(max_depth(root.left), max_depth(root.right))
```

## Approach
This is a classic problem solvable with **Depth First Search (DFS)**, typically implemented recursively. The maximum depth of a node is $1 + max(	ext{depth of its left child}, 	ext{depth of its right child})$. The base case is a null node, which has a depth of $0$.

## Complexity
- **Time Complexity**: O(n) - We visit each node exactly once.
- **Space Complexity**: O(h) - Where $h$ is the height of the tree, representing the maximum size of the recursion stack. In the worst case (skewed tree), $h=n$, so $O(n)$. In the best case (balanced tree), $h=log n$, so $O(log n)$.
