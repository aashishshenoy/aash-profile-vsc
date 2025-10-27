# Course Schedule
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
There are a total of $numCourses$ courses you have to take, labeled from 0 to $numCourses - 1$. You are given an array $prerequisites$ where $prerequisites[i] = [a_i, b_i]$ indicates that you must take course $b_i$ first if you want to take course $a_i$. Return $true$ if you can finish all courses, otherwise return $false$.
```

## Examples
### Example 1
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: To take course 1 you should have finished course 0. Both courses can be taken.
```

### Example 2
```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: To take course 1 you have to finish course 0, and to take course 0 you have to finish course 1. This creates a cycle.
```

## Constraints
1. 1 <= numCourses <= 2000
2. 0 <= prerequisites.length <= 5000
3. prerequisites[i].length == 2
4. 0 <= a_i, b_i < numCourses
5. a_i != b_i
6. All the pairs [a_i, b_i] are unique.

## Solution
```python
from collections import deque
def can_finish(numCourses, prerequisites):
    # 1. Build Adjacency List (graph) and In-degree Array
    adj = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses
    for course, prereq in prerequisites:
        adj[prereq].append(course)
        in_degree[course] += 1
    # 2. Initialize Queue with all courses having 0 in-degree (no prerequisites)
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    courses_taken = 0
    # 3. Process courses (Kahn's Algorithm for Topological Sort)
    while queue:
        course = queue.popleft()
        courses_taken += 1
        # For all courses that have this course as a prerequisite
        for neighbor in adj[course]:
            in_degree[neighbor] -= 1
            # If a course now has 0 prerequisites, add it to the queue
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    # 4. Check Result: All courses can be finished if no cycle was detected
    # A cycle exists if the topological sort cannot include all courses.
    return courses_taken == numCourses
```

## Approach
This problem is equivalent to determining if a **Directed Graph** contains a **Cycle**. If there's a cycle (e.g., A requires B, and B requires A), you can't finish all courses. The standard way to detect cycles and order courses is **Topological Sort**.

We use **Kahn's Algorithm (BFS-based Topological Sort)**:

1. Build the graph (adjacency list) and calculate the **in-degree** (number of prerequisites) for each course.

2. Start a queue with all courses that have an in-degree of 0 (no prerequisites).

3. Process the queue: Dequeue a course, decrement the in-degree of its neighbors (dependent courses). If a neighbor's in-degree drops to 0, enqueue it.

4. If the total number of courses processed equals $numCourses$, no cycle was found, and it's possible to finish all courses ($true$). Otherwise, a cycle exists ($false$).

## Complexity
- **Time Complexity**: O(V + E) - Where V is the number of vertices (courses) and E is the number of edges (prerequisites).
- **Space Complexity**: O(V + E) - For storing the graph and the in-degree array.
