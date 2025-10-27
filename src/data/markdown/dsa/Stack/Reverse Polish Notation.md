# Reverse Polish Notation
<sub><span style='background-color: #ffecb3; padding: 3px 6px; border-radius: 4px;'>Medium</span></sub>

## Problem Statement
```
You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression. Return an integer that represents the value of the expression.
```

## Examples
### Example 1
```
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

### Example 2
```
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

### Example 3
```
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5 = 22
```

## Constraints
1. 1 <= tokens.length <= 10^4
2. tokens[i] is either an operator: '+', '-', '*', or '/', or an integer in the range [-200, 200].

## Solution
```python
def eval_rpn(tokens):
    stack = []
    for token in tokens:
        if token in ['+', '-', '*', '/']:
            operand2 = stack.pop()
            operand1 = stack.pop()
            if token == '+':
                result = operand1 + operand2
            elif token == '-':
                result = operand1 - operand2
            elif token == '*':
                result = operand1 * operand2
            elif token == '/':
                # Integer division truncates towards zero in Python. 
                # Need special handling for negative numbers to match C++/Java truncation.
                # Standard integer division // is sufficient for Python 3's truncation towards negative infinity.
                # The expression int(operand1 / operand2) handles truncation towards zero correctly.
                result = int(operand1 / operand2)
            stack.append(result)
        else:
            # It's a number, push it onto the stack
            stack.append(int(token))
    return stack[0]
```

## Approach
This is a classic **Stack** problem. Reverse Polish Notation (RPN) is a mathematical notation where every operator follows all of its operands.

1. Iterate through the tokens.

2. If the token is a **number**, push it onto the stack.

3. If the token is an **operator** (`+`, `-`, `*`, `/`):

    - Pop the top two elements (the operands). The first pop is the second operand, and the second pop is the first operand.

    - Perform the operation.

    - Push the result back onto the stack.

After processing all tokens, the final result will be the only value remaining on the stack.

## Complexity
- **Time Complexity**: O(n) - We process each token once, and stack operations are O(1) time.
- **Space Complexity**: O(n) - In the worst case, the stack stores all $n$ numeric tokens.
