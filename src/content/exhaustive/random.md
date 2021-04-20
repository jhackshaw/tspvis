---
type: exhaustive
order: 2
solverKey: random
friendlyName: Random
defaults:
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

# Random

This is an impractical, albeit exhaustive algorithm. It is here only for demonstration purposes, but will not find a reasonable path for traveling salesman problems above 7 or 8 points.

I consider it exhaustive because if it runs for infinity, eventually it will encounter every possible path.

1. From the starting path
2. Randomly shuffle the path
3. If it's better, keep it
4. If not, ditch it and keep going

## Implementation

```javascript
const random = async points => {
  let best = Infinity;

  while (true) {
    // save off the starting point
    const start = points.shift();

    // sort the remaining points
    const path = points.sort(() => Math.random() - 0.5);

    // put the starting point back
    path.unshift(start);

    // return to the starting point
    path.push(start);

    // calculate the new cost
    const cost = pathCost(path);

    if (cost < best) {
      // we found a better path
      best = cost;
    }

    // get rid of starting point at the end
    path.pop();
  }
};
```
