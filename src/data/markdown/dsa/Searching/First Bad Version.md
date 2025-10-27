# First Bad Version
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have $n$ versions $[1, 2, dots, n]$ and you want to find the first bad one. You are given an API `isBadVersion(version)` which will return whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
```

## Examples
### Example 1
```
Input: n = 5, bad = 4
Output: 4
Explanation: call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
```

### Example 2
```
Input: n = 1, bad = 1
Output: 1
```

## Constraints
1. 1 <= bad <= n <= 2^31 - 1

## Solution
```python
# isBadVersion is an API defined by the problem, not implemented here
def isBadVersion(version):
    # Placeholder for the external API
    pass
def first_bad_version(n):
    low, high = 1, n
    first_bad = n  # Keep track of the 'best' possible answer found so far
    while low <= high:
        mid = low + (high - low) // 2
        if isBadVersion(mid):
            # mid is a bad version, so it *could* be the first bad version.
            # Store it and search in the left half to find an even earlier bad version.
            first_bad = mid
            high = mid - 1
        else:
            # mid is a good version, so the first bad version must be to its right.
            low = mid + 1
    return first_bad
```

## Approach
Since the `isBadVersion` function creates a monotonic property (a sorted-like behavior where all versions after a bad one are also bad), we can use **Binary Search** to find the transition point ($Good to Bad$) in $O(log n)$ time.

1. Initialize `low = 1` and `high = n`.

2. If `isBadVersion(mid)` is `true`, it means the first bad version could be $mid$ or before. We record $mid$ as a potential answer and narrow the search space to the left by setting $high = mid - 1$.

3. If `isBadVersion(mid)` is `false`, the first bad version must be after $mid$. We narrow the search space to the right by setting $low = mid + 1$.

The loop terminates when $low > high$. The last recorded `first_bad` version is the correct answer.

## Complexity
- **Time Complexity**: O(log n) - Binary search reduces the search space by half in each step, minimizing API calls.
- **Space Complexity**: O(1) - Constant extra space for pointers.
