# Merge Sorted Array
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
You are given two integer arrays $nums1$ and $nums2$, sorted in non-decreasing order, and two integers $m$ and $n$, representing the number of elements in $nums1$ and $nums2$ respectively. Merge $nums1$ and $nums2$ into a single array sorted in non-decreasing order. The final sorted array should not be returned by the function, but instead be stored inside the first array $nums1$. To accommodate this, $nums1$ has a length of $m + n$, where the first $m$ elements denote the elements that should be merged, and the last $n$ elements are set to 0 and should be ignored. $nums2$ has a length of $n$.
```

## Examples
### Example 1
```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums2.
```

### Example 2
```
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
```

### Example 3
```
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1]. The result of the merge is [1].
```

## Constraints
1. nums1.length == m + n
2. nums2.length == n
3. 0 <= m, n <= 200
4. 1 <= m + n <= 200
5. -10^9 <= nums1[i], nums2[j] <= 10^9

## Solution
```python
def merge(nums1, m, nums2, n):
    # Initialize pointers for nums1 (m-1), nums2 (n-1), and the current position in the merged array (m+n-1)
    p1, p2, p_merged = m - 1, n - 1, m + n - 1
    # While there are still elements in nums2 to merge
    while p2 >= 0:
        # If there are elements left in nums1 and nums1[p1] is greater than nums2[p2]
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            # Place the larger element from nums1 at the merged position
            nums1[p_merged] = nums1[p1]
            p1 -= 1
        else:
            # Place the element from nums2 (or nums1 element if p1 < 0) at the merged position
            nums1[p_merged] = nums2[p2]
            p2 -= 1
        # Move the merged array pointer left
        p_merged -= 1
    # If there are remaining elements in nums1 (p1 >= 0), they are already in place and sorted, so no action needed.
```

## Approach
This is a classic problem that leverages the fact that $nums1$ has extra space at the end. The most efficient approach is to use the **Two Pointers** method, starting from the **end** of both arrays and merging backward.

1. Initialize three pointers: one for the end of $nums1$'s valid elements ($p1$), one for the end of $nums2$ ($p2$), and one for the end of the merged array ($p_merged$).

2. In each step, compare $nums1[p1]$ and $nums2[p2]$. Place the larger element at $nums1[p_merged]$ and decrement the corresponding pointer ($p1$ or $p2$) and $p_merged$.

3. The loop continues until all elements of $nums2$ are merged. Since the operation is performed in-place from the back, we avoid overwriting unmerged elements in $nums1$.

## Complexity
- **Time Complexity**: O(m + n) - We perform a single pass from the end of the arrays.
- **Space Complexity**: O(1) - The merge is performed in-place.
