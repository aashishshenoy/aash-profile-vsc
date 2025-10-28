# Stock
<sub><span style='background-color: #d4f1f9; padding: 3px 6px; border-radius: 4px;'>Easy</span></sub>

## Problem Statement
```
You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
```

## Examples
### Example 1
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

### Example 2
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

## Constraints
1. 1 <= prices.length <= 10^5
2. 0 <= prices[i] <= 10^4

## Solution
```python
def max_profit(prices):
   if not prices:
       return 0
   max_profit = 0
   min_price = prices[0]
   for price in prices[1:]:
       max_profit = max(max_profit, price - min_price)
       min_price = min(min_price, price)
   return max_profit
```

## Approach
This is a single-pass solution (Greedy/Dynamic Programming). We keep track of the minimum price encountered so far. For each current price, we calculate the potential profit (current price - min_price) and update our maximum profit if it's better. We continuously update min_price to ensure we're always calculating profit against the lowest possible buying price up to the current day.

## Complexity
- **Time Complexity**: O(n) - Single pass through the array.
- **Space Complexity**: O(1) - Only a few variables are used.
