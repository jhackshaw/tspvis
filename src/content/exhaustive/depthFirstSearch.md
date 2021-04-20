---
type: exhaustive
order: 1
solverKey: depthFirstSearch
friendlyName: Depth First Search (Brute Force)
defaults:
  evaluatingDetailLevel: 2
  maxEvaluatingDetailLevel: 2
---

# Depth First Search (Brute Force)

This is an exhaustive, brute-force algorithm. It is guaranteed to find the best possible path, however depending on the number of points in the traveling salesman problem it is likely impractical. For example,

- With 10 points there are 181,400 paths to evaluate.
- With 11 points, there are 1,814,000.
- With 12 points there are 19,960,000.
- With 20 points there are 60,820,000,000,000,000, give or take.
- With 25 points there are 310,200,000,000,000,000,000,000, give or take.

This is factorial growth, and it quickly makes the TSP impractical to brute force. That is why heuristics exist to give a good approximation of the best path, but it is very difficult to determine without a doubt what the best path is for a reasonably sized traveling salesman problem.

This is a recursive, depth-first-search algorithm, as follows:

1. From the starting point
2. For all other points not visited
3. If there are no points left return the current cost/path
4. Else, go to every remaining point and

:

1. Mark that point as visited
2. "**recurse**" through those paths (go back to 1. )

## Implementation

```javascript
const dfs = async (points, path = [], visited = null, overallBest = null) => {
  if (visited === null) {
    // initial call
    path = [points.shift()];
    points = new Set(points);
    visited = new Set();
  }

  // figure out what points are left from this point
  const available = setDifference(points, visited);

  if (available.size === 0) {
    // this must be a complete path
    const backToStart = [...path, path[0]];

    // calculate the cost of this path
    const cost = pathCost(backToStart);

    // return both the cost and the path where we're at
    return [cost, backToStart];
  }

  let [bestCost, bestPath] = [null, null];

  // for every point yet to be visited along this path
  for (const p of available) {
    // go to that point
    visited.add(p);
    path.push(p);

    // RECURSE - go through all the possible points from that point
    const [curCost, curPath] = await dfs(points, path, visited, overallBest);

    // if that path is better, keep it
    if (bestCost === null || curCost < bestCost) {
      [bestCost, bestPath] = [curCost, curPath];

      if (overallBest === null || bestCost < overallBest) {
        // found a new best complete path
        overallBest = bestCost;
      }
    }

    // go back up and make that point available again
    visited.delete(p);
    path.pop();
  }
  return [bestCost, bestPath];
};
```
