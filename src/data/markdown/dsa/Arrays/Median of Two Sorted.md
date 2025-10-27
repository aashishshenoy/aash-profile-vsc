# Median of Two Sorted
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).
```

## Examples
### Example 1
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: The merged array is [1,2,3] and the median is 2.
```

### Example 2
```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: The merged array is [1,2,3,4] and the median is (2 + 3) / 2 = 2.5.
```

## Constraints
1. nums1.length == m
2. nums2.length == n
3. 0 <= m <= 1000
4. 0 <= n <= 1000
5. 1 <= m + n <= 2000
6. -10^6 <= nums1[i], nums2[i] <= 10^6

## Solution
```python
def find_median_sorted_arrays(nums1, nums2):
    # Ensure nums1 is the shorter array for optimal binary search
    if len(nums1) > len(nums2):
        return find_median_sorted_arrays(nums2, nums1)
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    # Total number of elements in the 'left half' of the merged array
    half_len = (m + n + 1) // 2
    while low <= high:
        # Partition point for nums1 (i)
        i = (low + high) // 2
        # Partition point for nums2 (j). Ensures i + j = half_len
        j = half_len - i
        # Calculate boundary elements (L1, R1, L2, R2)
        L1 = nums1[i - 1] if i > 0 else float('-inf')
        R1 = nums1[i] if i < m else float('inf')
        L2 = nums2[j - 1] if j > 0 else float('-inf')
        R2 = nums2[j] if j < n else float('inf')
        # Correct Partition Found: L1 <= R2 and L2 <= R1
        if L1 <= R2 and L2 <= R1:
            # Odd total length: Median is the max of the left half
            if (m + n) % 2 == 1:
                return max(L1, L2)
            # Even total length: Median is the average of the two middle elements
            else:
                return (max(L1, L2) + min(R1, R2)) / 2.0
        # Partition is too far right in nums1, need to move left
        elif L1 > R2:
            high = i - 1
        # Partition is too far left in nums1, need to move right
        else: # L2 > R1
            low = i + 1
```

## Approach
This is a **Binary Search** approach. The goal is to find a partition point in both arrays such that: 

1. The elements on the left of the partition are $(m+n)/2$ total elements (the 'left half').

2. Every element in the left half is less than or equal to every element in the right half ($L1 ≤ R2$ and $L2 ≤ R1$).

We binary search on the smaller array ($nums1$) to find the partition point $i$. The partition point $j$ for $nums2$ is automatically determined by the required total size of the left half. Once the correct partition is found:

- If the total length is **odd**, the median is $max(L1, L2)$ (the largest element of the left half).

- If the total length is **even**, the median is $(max(L1, L2) + min(R1, R2)) / 2.0$ (average of the two middle elements).

## Complexity
- **Time Complexity**: O(log(min(m, n))) - The binary search is performed on the shorter array.
- **Space Complexity**: O(1) - The algorithm uses constant extra space.
