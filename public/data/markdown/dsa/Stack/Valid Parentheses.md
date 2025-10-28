# Valid Parentheses
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order. 3. Every close bracket has a corresponding open bracket of the same type.
```

## Examples
### Example 1
```
Input: s = "()"
Output: true
```

### Example 2
```
Input: s = "()[]{}"
Output: true
```

### Example 3
```
Input: s = "(]"
Output: false
```

### Example 4
```
Input: s = "([)]"
Output: false
```

### Example 5
```
Input: s = "{[]}"
Output: true
```

## Constraints
1. 1 <= s.length <= 10^4
2. s consists of parentheses only '()[]{}'.

## Solution
```python
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping.values():
            # It's an opening bracket, push to stack
            stack.append(char)
        elif char in mapping.keys():
            # It's a closing bracket
            # Check if stack is empty or the top element does not match
            if not stack or stack.pop() != mapping[char]:
                return False
        # Any other character is not allowed by constraints
    # After iterating, the stack must be empty for a valid string
    return not stack
```

## Approach
A **Stack** is the ideal data structure. We iterate through the string:

1. **Opening Brackets:** If the character is an opening bracket (`(`, `{`, `[`), push it onto the stack.

2. **Closing Brackets:** If the character is a closing bracket (`)`, `}`, `]`), check the stack:

    - If the stack is empty, there's no matching open bracket, return `false`.

    - Pop the top element and check if it's the correct matching open bracket (e.g., `)` must match `(`). If not, return `false`.

3. **Final Check:** After the loop, if the stack is empty, all brackets were matched, return `true`; otherwise, some opening brackets were left unmatched, return `false`.

## Complexity
- **Time Complexity**: O(n) - We iterate through the string once, and stack operations are O(1) time.
- **Space Complexity**: O(n) - In the worst case (e.g., '((((('), the stack stores up to n characters.
