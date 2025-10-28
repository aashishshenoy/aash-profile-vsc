# Search A 2D Matrix
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
You are given an $m 	imes n$ integer matrix $matrix$ with the following two properties: 1. Each row is sorted in non-decreasing order. 2. The first integer of each row is greater than the last integer of the previous row. Given an integer $target$, return $true$ if $target$ is in the matrix or $false$ otherwise. You must write an algorithm with $O(log(m times n))$ runtime complexity.
```

## Examples
### Example 1
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

### Example 2
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

## Constraints
1. m == matrix.length
2. n == matrix[i].length
3. 1 <= m, n <= 100
4. -10^4 <= matrix[i][j], target <= 10^4

## Solution
```python
def search_matrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    # Treat the 2D array as a single 1D sorted array of size m * n
    low, high = 0, m * n - 1
    while low <= high:
        mid = low + (high - low) // 2
        # Convert 1D index 'mid' to 2D coordinates (row, col)
        # row = mid // n, col = mid % n
        row = mid // n
        col = mid % n
        value = matrix[row][col]
        if value == target:
            return True
        elif value < target:
            low = mid + 1
        else:
            high = mid - 1
    return False
```

## Approach
The two properties of the matrix (rows sorted, and the start of the next row $>$ end of the previous row) mean the entire matrix is a single, large sorted array. To achieve $O(log(m 	imes n))$ complexity, we can perform a single **Binary Search** over the 'unrolled' 1D array.

1. **Unroll and Search:** Treat the $m 	imes n$ matrix as a single array of size $m 	imes n$. Use standard binary search with `low = 0` and `high = m 	imes n - 1$.

2. **Index Conversion:** Convert the 1D index `mid` back to 2D coordinates using integer division and modulo: $row = mid // n$ and $col = mid % n$.

The binary search proceeds normally on the value at $matrix[row][col]$. This is faster than two separate binary searches (one for the row, one for the column).

## Complexity
- **Time Complexity**: O(log(m * n)) - Single binary search on $m 	imes n$ elements.
- **Space Complexity**: O(1) - Constant extra space for pointers.
