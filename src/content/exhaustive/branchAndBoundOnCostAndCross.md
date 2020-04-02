---
type: exhaustive
order: 4
solverKey: branchAndBoundOnCostAndCross
friendlyName: Branch and Bound (Cost, Crossings)
defaults:
  evaluatingDetailLevel: 2
  maxEvaluatingDetailLevel: 2
---

# Branch and Bound (Cost, Intersections)

This is the same as branch and bound on cost, with an additional heuristic added to further minimize the search space.

While traversing paths, if at any point the path intersects (crosses over) itself, than backtrack and try the next way. It's been proven that an optimal path will never contain crossings.

Implementation is almost identical to branch and bound on cost only, with the added heuristic below:

## Implementation

```javascript

const counterClockWise = (p, q, r) => {
  return  (q[0] - p[0]) * (r[1] - q[1]) <
          (q[1] - p[1]) * (r[0] - q[0])
}

const intersects = (a, b, c, d) => {
  return counterClockWise(a, c, d) !== counterClockWise(b, c, d) &&
         counterClockWise(a, b, c) !== counterClockWise(a, b, d)
}

const branchAndBoundOnCostAndCross = async (...) => {
  //
  // .....
  //

  if (path.length > 3) {
    // if this newly added edge crosses over the existing path,
    // don't continue. It's been proven that an optimal path will
    // not cross itself.
    const newSegment = [
      path[path.length-2], path[path.length-1]
    ]
    for (let i=1; i<path.length-2; i++) {
      if (intersects(path[i], path[i-1], ...newSegment)) {
        return [null, null]
      }
    }
  }

  //
  // .....
  //
}
```
