# Rotate Image
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means modifying the input 2D matrix directly. DO NOT allocate another 2D matrix for the rotation.
```

## Examples
### Example 1
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

### Example 2
```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

## Constraints
1. n == matrix.length == matrix[i].length
2. 1 <= n <= 20
3. -1000 <= matrix[i][j] <= 1000

## Solution
```python
def rotate(matrix):
    n = len(matrix)
    # 1. Transpose the matrix
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # 2. Reverse each row
    for row in matrix:
        row.reverse()
    # Rotation by 90 degrees clockwise is equivalent to Transpose then Reverse each Row.
```

## Approach
A 90-degree clockwise rotation can be achieved by two sequential in-place transformations:

1. **Transpose:** Swap the element at $matrix[i][j]$ with $matrix[j][i]$. This flips the matrix over its main diagonal.

2. **Reverse:** Reverse the elements of each row. For an $n 	imes n$ matrix, this transforms a row $[a, b, c, d]$ to $[d, c, b, a]$.

## Complexity
- **Time Complexity**: O(n^2) - We visit each cell in the matrix a constant number of times.
- **Space Complexity**: O(1) - The rotation is performed in-place.
