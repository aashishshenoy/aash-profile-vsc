# Word Ladder
<sub><span style='background-color: #f9d6d5; padding: 3px 6px; border-radius: 4px;'>Hard</span></sub>

## Problem Statement
```
A transformation sequence from $beginWord$ to $endWord$ is a sequence of words $beginWord = w_1, w_2, dots, w_k = endWord$ such that every adjacent pair of words differs by a single letter. Given two words, $beginWord$ and $endWord$, and a dictionary $wordList$, return the number of words in the shortest transformation sequence from $beginWord$ to $endWord$, or 0 if no such sequence exists.
```

## Examples
### Example 1
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", with length 5.
```

### Example 2
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
```

## Constraints
1. 1 <= beginWord.length <= 10
2. beginWord and endWord consist of lowercase English letters.
3. 1 <= wordList.length <= 5000
4. All the words in wordList are unique.
5. beginWord is not in wordList.

## Solution
```python
from collections import deque, defaultdict
def ladder_length(beginWord, endWord, wordList):
    if endWord not in wordList:
        return 0
    L = len(beginWord)
    # 1. Preprocess: Create the generic state graph (neighbor map)
    # Generic Word -> List of Words matching that generic form
    all_combo_dict = defaultdict(list)
    for word in wordList:
        for i in range(L):
            # Generic form: e.g., 'hot' -> '*ot', 'h*t', 'ho*'
            generic_word = word[:i] + '*' + word[i+1:]
            all_combo_dict[generic_word].append(word)
    # 2. BFS: Find the shortest path in the unweighted graph
    queue = deque([(beginWord, 1)]) # (word, level)
    visited = {beginWord}
    while queue:
        current_word, level = queue.popleft()
        for i in range(L):
            generic_word = current_word[:i] + '*' + current_word[i+1:]
            # Check all words that can be reached from the current word
            for next_word in all_combo_dict[generic_word]:
                if next_word == endWord:
                    return level + 1
                if next_word not in visited:
                    visited.add(next_word)
                    queue.append((next_word, level + 1))
    return 0
```

## Approach
This is a shortest path problem in an **Unweighted Graph**, perfectly suited for **Breadth First Search (BFS)**. The 'graph' is implicit: words are nodes, and an edge exists between two words if they differ by exactly one letter.

The main optimization is to build a **Preprocessed Generic State Graph**:

1. Map each word in `wordList` to its generic representations (e.g., `hot` maps to `*ot`, `h*t`, `ho*`).

2. During BFS, instead of checking all words in the dictionary to find a neighbor, check the generic forms of the current word. All words mapped to that generic form are neighbors.

BFS guarantees finding the shortest path (minimum number of steps/words).

## Complexity
- **Time Complexity**: O(N * L^2) or O(N * L * L) - Where N is the number of words in `wordList` and L is the length of the words. $O(N cdot L)$ to build the graph, and $O(N cdot L)$ is the total number of edges. BFS takes $O(V+E)$, which is $O(N cdot L^2)$ with the generic word optimization.
- **Space Complexity**: O(N * L) - For the hash map storing the generic words and the queue/visited set.
