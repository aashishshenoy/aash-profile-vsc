# Number Of Islands
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
Given an $m 	imes n$ 2D binary grid $grid$ which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
```

## Examples
### Example 1
```
Input: grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
Output: 1
```

### Example 2
```
Input: grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
Output: 3
```

## Constraints
1. m == grid.length
2. n == grid[i].length
3. 1 <= m, n <= 300
4. grid[i][j] is '0' or '1'.

## Solution
```python
def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    num_islands = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0' # Mark as visited (sink the island)
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                num_islands += 1
                dfs(r, c)
    return num_islands
```

## Approach
This problem is essentially finding the number of connected components in an undirected graph, which is best solved using **Traversal Algorithms (DFS or BFS)**.

1. Iterate through every cell of the grid.

2. If a cell contains **'1'** (land), it marks the beginning of a new island. Increment the island count.

3. Perform a **DFS** (or BFS) starting from this cell to visit all connected '1's (the entire island). **Mark all visited '1's as '0'** (sink the island) so they aren't counted again later. This ensures that only the start of a *new* connected component is counted.

## Complexity
- **Time Complexity**: O(R * C) - We visit each cell in the grid at most a constant number of times (where R is rows and C is columns).
- **Space Complexity**: O(R * C) - In the worst case (the entire grid is land), the recursion stack for DFS (or the queue for BFS) can go up to the size of the grid.
