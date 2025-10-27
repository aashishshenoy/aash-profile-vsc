# Count Of Smaller Numbers After Self
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
Given an integer array $nums$, return an integer array $counts$ where $counts[i]$ is the number of smaller elements to the right of $nums[i]$.
```

## Examples
### Example 1
```
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation: To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
```

### Example 2
```
Input: nums = [-1]
Output: [0]
```

### Example 3
```
Input: nums = [-1,-1]
Output: [0,0]
```

## Constraints
1. 1 <= nums.length <= 10^5
2. -10^4 <= nums[i] <= 10^4

## Solution
```python
def count_smaller(nums):
    # This problem is a classic application of the Merge Sort / Segment Tree / Fenwick Tree family.
    # Using Merge Sort is conceptually simpler.
    n = len(nums)
    # Create a list of (value, original_index) pairs
    indexed_nums = []
    for i, num in enumerate(nums):
        indexed_nums.append((num, i))
    counts = [0] * n
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])
        return merge(left, right)
    def merge(left, right):
        merged = []
        i, j = 0, 0
        # Count of elements in the right half that have been merged
        right_count = 0
        while i < len(left) or j < len(right):
            # If only elements in the right half remain, just merge them
            if i == len(left):
                merged.append(right[j])
                j += 1
            # If only elements in the left half remain, they are all smaller than the remaining in right half
            # But we only count smaller elements to the right (already processed via right_count)
            elif j == len(right):
                merged.append(left[i])
                counts[left[i][1]] += right_count
                i += 1
            # If left element is <= right element
            elif left[i][0] <= right[j][0]:
                # All elements in the right half merged so far (right_count) are smaller than left[i][0].
                # Add the count to the result for the element from the left half.
                counts[left[i][1]] += right_count
                merged.append(left[i])
                i += 1
            # If right element is smaller than left element
            else:
                # The right element is smaller, so it's a 'smaller element to the right' for all remaining elements in the left half.
                merged.append(right[j])
                right_count += 1
                j += 1
        return merged
    merge_sort(indexed_nums)
    return counts
```

## Approach
This is a hard problem that relies on advanced data structures or a specialized application of a sorting algorithm. The most common solution is a modified **Merge Sort**.

1. **Indexing:** Create a list of tuples/pairs: $(value, original_index)$.

2. **Modified Merge Sort:** During the **Merge** step of Merge Sort, elements from the left subarray are always to the left of elements from the right subarray (in the original array). When merging, if an element from the **right** subarray is moved to the merged array, it means this element is smaller than *all* remaining elements in the left subarray. This is where the counting happens: when $left[i].val > right[j].val$, we increment a `right_count`. When an element $left[i]$ is moved, its count is incremented by the current `right_count`.

## Complexity
- **Time Complexity**: O(n log n) - Same time complexity as standard Merge Sort.
- **Space Complexity**: O(n) - For the auxiliary arrays/lists created during the merge process and the indexed array.
