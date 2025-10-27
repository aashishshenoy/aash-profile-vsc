# Validate Binary Search Tree
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given the root of a binary tree, determine if it is a valid Binary Search Tree (BST). A valid BST is defined as follows: 1. The left subtree of a node contains only nodes with keys **less than** the node's key. 2. The right subtree of a node contains only nodes with keys **greater than** the node's key. 3. Both the left and right subtrees must also be BSTs.
```

## Examples
### Example 1
```
Input: root = [2,1,3]
Output: true
```

### Example 2
```
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root's value is 5 but its right child's value is 4, which is incorrect.
```

## Constraints
1. The number of nodes in the tree is in the range [1, 10^4].
2. -2^31 <= Node.val <= 2^31 - 1

## Solution
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def is_valid_bst(root):
    # Recursive helper with lower and upper bounds
    def validate(node, lower=-float('inf'), upper=float('inf')):
        if not node:
            return True
        # Current node value must be strictly within (lower, upper)
        if not (lower < node.val < upper):
            return False
        # Recurse on left: update upper bound to node.val
        if not validate(node.left, lower, node.val):
            return False
        # Recurse on right: update lower bound to node.val
        if not validate(node.right, node.val, upper):
            return False
        return True
    return validate(root)
```

## Approach
The standard recursive approach is to pass **upper and lower bounds** during the **Depth First Search (DFS)** traversal. It's not enough to just check if $node.left.val < node.val$ and $node.right.val > node.val$.

1. For the root, the bounds are $(-infty, infty)$.

2. When traversing to the **left child**, the new upper bound becomes the parent's value, and the lower bound remains the same: $(lower, 	ext{parent_val})$.

3. When traversing to the **right child**, the new lower bound becomes the parent's value, and the upper bound remains the same: $(	ext{parent_val}, upper)$.

This ensures that all nodes in the left subtree are smaller than the current node AND all its ancestors, and similarly for the right subtree.

## Complexity
- **Time Complexity**: O(n) - We visit each node exactly once.
- **Space Complexity**: O(h) - Where $h$ is the height of the tree, for the recursion stack. $O(n)$ in the worst case, $O(log n)$ in the best case.
