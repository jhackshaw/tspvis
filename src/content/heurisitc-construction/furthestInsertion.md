---
type: heuristic-construction
order: 4
solverKey: furthestInsertion
friendlyName: Furthest Insertion
defaults:
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

# Furthest Insertion

This is a heuristic construction algorithm. It selects the furthest point from the path, and then figures out where the best place to put it will be.

1. From the starting point
2. First, go to the closest point
3. Choose the point that is furthest from any of the points on the path
4. Find the cheapest place to add it in the path
5. Chosen point is no longer an "available point"
6. Continue from #3 until there are no available points, and then return to the start.

## Implementation

```javascript
const furthestInsertion = async points => {
  // from the starting point
  const path = [points.shift()];

  //
  // INITIALIZATION - go to the nearest point first
  //
  points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
  path.push(points.pop());

  while (points.length > 0) {
    //
    // SELECTION - furthest point from the path
    //
    let [selectedDistance, selectedIdx] = [0, null];
    for (const [freePointIdx, freePoint] of points.entries()) {
      // find the minimum distance to the path for freePoint
      let [bestCostToPath, costToPathIdx] = [Infinity, null];
      for (const pathPoint of path) {
        const dist = distance(freePoint, pathPoint);
        if (dist < bestCostToPath) {
          [bestCostToPath, costToPathIdx] = [dist, freePointIdx];
        }
      }

      // if this point is further from the path than the currently selected
      if (bestCostToPath > selectedDistance) {
        [selectedDistance, selectedIdx] = [bestCostToPath, costToPathIdx];
      }
    }
    const [nextPoint] = points.splice(selectedIdx, 1);

    //
    // INSERTION - find the insertion spot that minimizes distance
    //
    let [bestCost, bestIdx] = [Infinity, null];
    for (let i = 1; i < path.length; i++) {
      const insertionCost = pathCost([path[i - 1], nextPoint, path[i]]);
      if (insertionCost < bestCost) {
        [bestCost, bestIdx] = [insertionCost, i];
      }
    }
    path.splice(bestIdx, 0, nextPoint);
  }

  // return to start after visiting all other points
  path.push(path[0]);
};
```
