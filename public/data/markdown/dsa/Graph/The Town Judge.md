# Find The Town Judge
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
In a town, there are $n$ people labeled from 1 to $n$. A secret trust relationship exists. We are given an array $trust$ where $trust[i] = [a, b]$ represents that person $a$ trusts person $b$. The town judge is a person who: 1. Trusts nobody. 2. Is trusted by everybody else (all $n-1$ people). 3. There is exactly one person that satisfies these properties. Return the label of the town judge if the town judge exists and can be identified, or return -1.
```

## Examples
### Example 1
```
Input: n = 3, trust = [[1,3],[2,3]]
Output: 3
```

### Example 2
```
Input: n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
Explanation: The judge (3) trusts another person (1).
```

### Example 3
```
Input: n = 2, trust = [[1,2]]
Output: 2
```

## Constraints
1. 1 <= n <= 1000
2. 0 <= trust.length <= 10^4
3. trust[i].length == 2
4. All the pairs of trust are unique.

## Solution
```python
def find_judge(n, trust):
    # If n=1, and trust is empty, person 1 is the judge
    if n == 1 and not trust:
        return 1
    # Net trust score: score[i] = (number of people who trust i) - (number of people i trusts)
    # For the Judge (i): score[i] = (n - 1) - 0 = n - 1
    scores = [0] * (n + 1)
    for a, b in trust:
        scores[a] -= 1  # Person a trusts someone (out-degree -1)
        scores[b] += 1  # Person b is trusted (in-degree +1)
    # Check if any person has a score of n - 1
    for i in range(1, n + 1):
        if scores[i] == n - 1:
            return i
    return -1
```

## Approach
This problem can be modeled as a **Directed Graph** where people are nodes and `trust` relationships are edges. We can use the concept of **In-degree** (number of people who trust a person) and **Out-degree** (number of people a person trusts).

A person $i$ is the Town Judge if and only if:

1. **Out-degree is 0:** They trust nobody.

2. **In-degree is $n-1$:** They are trusted by everyone else.

We can use a single array (`scores` or `degree`) where $degree[i] = 	ext{In-degree}[i] - 	ext{Out-degree}[i]$. The Judge's score will be $ (n-1) - 0 = n-1$. Any person with a score of $n-1$ is the judge.

## Complexity
- **Time Complexity**: O(T + n) - Where T is the number of trust relationships. We iterate through all trust relations and then through all $n$ people.
- **Space Complexity**: O(n) - For the scores array.
