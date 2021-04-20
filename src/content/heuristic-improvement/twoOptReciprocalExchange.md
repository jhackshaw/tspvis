---
type: heuristic-improvement
order: 2
solverKey: twoOptReciprocalExchange
friendlyName: Two Opt Reciprocal Exchange
defaults:
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

# Two-Opt Reciprocal Exchange

This algorithm is similar to the 2-opt mutation or inversion algorithm, although generally will find a less optimal path. However, the computational cost of calculating new solutions is less intensive.

The big difference with 2-opt mutation is not reversing the path between the 2 points. This algorithm is **not** always going to find a path that doesn't cross itself.

It could be worthwhile to try this algorithm prior to 2-opt inversion because of the cheaper cost of calculation, but probably not.

1. While a better path has not been found.
2. For each pair of points:
3. Swap the points in the path. That is, go to point B before point A, continue along the same path, and go to point A where point B was.
4. If the new path is cheaper (shorter), keep it and continue searching. Remember that we found a better path.
5. If not, revert the path and continue searching.

## Implementation

```javascript
const twoOptReciprocalExchange = async path => {
  path.push(path[0]);
  let best = pathCost(path);
  let swapped = true;

  self.setBestPath(path, best);

  while (swapped) {
    swapped = false;
    for (let pt1 = 1; pt1 < path.length - 1; pt1++) {
      for (let pt2 = pt1 + 1; pt2 < path.length - 1; pt2++) {
        // swap current pair of points
        [path[pt1], path[pt2]] = [path[pt2], path[pt1]];

        // calculate new cost
        const cost = pathCost(path);

        if (cost < best) {
          // found a better path after the swap, keep it
          swapped = true;
          best = cost;
        } else {
          // swap back - this one's worse
          [path[pt1], path[pt2]] = [path[pt2], path[pt1]];
        }
      }
    }
  }
};
```
