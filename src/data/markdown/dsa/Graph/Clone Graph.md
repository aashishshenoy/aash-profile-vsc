# Clone Graph
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list of its neighbors. The graph is represented in the test case using an adjacency list.
```

## Examples
### Example 1
```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: The graph has 4 nodes. Node 1's neighbors are 2 and 4, etc.
```

## Constraints
1. The number of nodes in the graph is in the range [0, 100].
2. 1 <= Node.val <= 100
3. Node.val is unique for each node.
4. The graph is connected.

## Solution
```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
def clone_graph(node):
    if not node:
        return None
    # Dictionary to map original node to its clone: {original_node: cloned_node}
    old_to_new = {}
    # DFS approach
    def dfs(old_node):
        # If already cloned, return the clone
        if old_node in old_to_new:
            return old_to_new[old_node]
        # Create the clone and map it
        new_node = Node(old_node.val)
        old_to_new[old_node] = new_node
        # Recursively clone neighbors and connect them
        for neighbor in old_node.neighbors:
            new_node.neighbors.append(dfs(neighbor))
        return new_node
    return dfs(node)
```

## Approach
Graph cloning requires creating a deep copy of all nodes and edges without falling into an infinite loop due to cycles. This is solved with **Graph Traversal (DFS or BFS)** combined with a **Hash Map** to track cloned nodes.

1. **Hash Map:** Use a hash map (`old_to_new`) to store a mapping from the original node reference to its newly created cloned node. This prevents cycles and redundant node creation.

2. **Traversal (DFS/BFS):** Traverse the original graph. For each node, create its clone if it hasn't been cloned yet. Store the mapping. Then, recursively (or iteratively for BFS) clone its neighbors and connect them to the current node's clone.

## Complexity
- **Time Complexity**: O(V + E) - We visit each vertex (V) and each edge (E) once.
- **Space Complexity**: O(V) - For the hash map to store V nodes and for the recursion stack/queue used in traversal.
