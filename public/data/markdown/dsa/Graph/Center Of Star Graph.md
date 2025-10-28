# Find Center Of Star Graph
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
There is an undirected star graph consisting of $n$ nodes labeled from 1 to $n$. A star graph is a graph where there is one center node and exactly $n-1$ edges connecting the center node to every other node. You are given a 2D integer array $edges$, where $edges[i] = [u_i, v_i]$ indicates there is an edge between the two nodes $u_i$ and $v_i$. Return the center of the given star graph.
```

## Examples
### Example 1
```
Input: edges = [[1,2],[2,3],[4,2]]
Output: 2
Explanation: Node 2 is connected to all other nodes.
```

### Example 2
```
Input: edges = [[1,2],[5,1],[1,3],[1,4]]
Output: 1
```

## Constraints
1. 3 <= n <= 10^5
2. edges.length == n - 1
3. edges[i].length == 2
4. 1 <= u_i, v_i <= n
5. u_i != v_i
6. It is guaranteed that the given graph is a star graph.

## Solution
```python
def find_center(edges):
    # In a star graph, the center node must be present in *every* edge.
    # We only need to check the first two edges.
    u1, v1 = edges[0]
    u2, v2 = edges[1]
    # The center is the node that appears in both edges
    if u1 == u2 or u1 == v2:
        return u1
    else:
        # Must be v1 if the graph is guaranteed to be a star graph
        return v1
```

## Approach
In a **Star Graph**, the center node is the *only* node connected to all other $n-1$ nodes. This means the center node must be present in **every edge** in the `edges` array. Since the center is guaranteed to exist and must appear in the first edge $edges[0]$ and the second edge $edges[1]$, we simply look for the common node between the first two edges to identify the center.

## Complexity
- **Time Complexity**: O(1) - The solution only requires checking the first two elements of the input array.
- **Space Complexity**: O(1) - Constant extra space is used.
