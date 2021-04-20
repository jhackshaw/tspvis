---
type: heuristic-construction
order: 1
solverKey: nearestNeighbor
friendlyName: Nearest Neighbor
defaults:
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

# Nearest Neighbor

This is a heuristic, greedy algorithm also known as nearest neighbor. It continually chooses the best looking option from the current state.

1. From the starting point
2. sort the remaining available points based on cost (distance)
3. Choose the closest point and go there
4. Chosen point is no longer an "available point"
5. Continue this way until there are no available points, and then return to the start.

## Implementation

```javascript
const nearestNeighbor = async points => {
  const path = [points.shift()];

  while (points.length > 0) {
    // sort remaining points in place by their
    // distance from the last point in the current path
    points.sort(
      (a, b) =>
        distance(path[path.length - 1], b) - distance(path[path.length - 1], a)
    );

    // go to the closest remaining point
    path.push(points.pop());
  }

  // return to start after visiting all other points
  path.push(path[0]);
  const cost = pathCost(path);
};
```
