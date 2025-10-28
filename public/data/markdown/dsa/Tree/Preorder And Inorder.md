# Construct Binary Tree From Preorder And Inorder Traversal
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given two integer arrays $preorder$ and $inorder$ where $preorder$ is the preorder traversal of a binary tree and $inorder$ is the inorder traversal of the same tree, construct and return the binary tree.
```

## Examples
### Example 1
```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

### Example 2
```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

## Constraints
1. 1 <= preorder.length <= 3000
2. inorder.length == preorder.length
3. -3000 <= preorder[i], inorder[i] <= 3000
4. preorder and inorder consist of unique values.
5. Each value of inorder also appears in preorder.
6. preorder is guaranteed to be the preorder traversal of the tree.
7. inorder is guaranteed to be the inorder traversal of the tree.

## Solution
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def build_tree(preorder, inorder):
    # Map: value -> index in inorder for quick lookup (O(1))
    inorder_map = {val: i for i, val in enumerate(inorder)}
    preorder_index = 0
    def array_to_tree(left_bound, right_bound):
        nonlocal preorder_index
        # Base case: if the subarray is empty
        if left_bound > right_bound:
            return None
        # The root is the next element in the preorder traversal
        root_val = preorder[preorder_index]
        root = TreeNode(root_val)
        preorder_index += 1
        # Find the root in the inorder array to determine its children's sub-arrays
        inorder_root_index = inorder_map[root_val]
        # Recursively build left subtree
        root.left = array_to_tree(left_bound, inorder_root_index - 1)
        # Recursively build right subtree
        root.right = array_to_tree(inorder_root_index + 1, right_bound)
        return root
    return array_to_tree(0, len(inorder) - 1)
```

## Approach
This is a classic problem solved using **Recursion (DFS)**, leveraging the properties of the two traversals:

1. **Preorder** is **[Root, Left Subtree, Right Subtree]**. The first element is always the root of the current (sub)tree.

2. **Inorder** is **[Left Subtree, Root, Right Subtree]**. The root's position divides the array into the elements belonging to its left subtree and those belonging to its right subtree.

The algorithm:

- Use the current element from `preorder` as the root.

- Find this root element's position in `inorder` to split the `inorder` array into its left and right parts.

- Recursively call the function for the left part of `inorder` (to build the left subtree).

- Recursively call the function for the right part of `inorder` (to build the right subtree).

Using a hash map for `inorder` values to index lookups improves the complexity from $O(n^2)$ to $O(n)$.

## Complexity
- **Time Complexity**: O(n) - We process each node's value once, and the hash map lookups are O(1) average time.
- **Space Complexity**: O(n) - To store the `inorder_map` and for the recursion stack ($O(h)$).
