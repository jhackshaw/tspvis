---
type: heuristic-construction
order: 3
solverKey: nearestInsertion
friendlyName: Nearest Insertion
defaults:
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

# Furthest Insertion

This is a heuristic construction algorithm. It selects the closest point to the path, and then figures out where the best place to put it will be.

1. From the starting point
2. First, go to the closest point
3. Choose the point that is **nearest** to the current path
4. Find the cheapest place to add it in the path
5. Chosen point is no longer an "available point"
6. Continue from #3 until there are no available points, and then return to the start.

## Implementation

```javascript
const nearestInsertion = async points => {
  // from the starting point
  const path = [points.shift()];

  //
  // INITIALIZATION - go to the nearest point first
  //
  points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
  path.push(points.pop());

  while (points.length > 0) {
    //
    // SELECTION - nearest point to the path
    //
    let [selectedDistance, selectedIdx] = [Infinity, null];
    for (const [freePointIdx, freePoint] of points.entries()) {
      for (const pathPoint of path) {
        const dist = distance(freePoint, pathPoint);
        if (dist < selectedDistance) {
          [selectedDistance, selectedIdx] = [dist, freePointIdx];
        }
      }
    }

    // get the next point to add
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
