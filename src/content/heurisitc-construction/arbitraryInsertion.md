---
type: heuristic-construction
order: 2
solverKey: arbitraryInsertion
friendlyName: Arbitrary Insertion
defaults:
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

# Arbitrary Insertion

This is a heuristic construction algorithm. It select a random point, and then figures out where the best place to put it will be.

1. From the starting point
2. First, go to the closest point
3. Choose a random point to go to
4. Find the cheapest place to add it in the path
5. Chosen point is no longer an "available point"
6. Continue from #3 until there are no available points, and then return to the start.

## Implementation

```javascript
const arbitraryInsertion = async points => {
  // from the starting point
  const path = [points.shift()];

  //
  // INITIALIZATION - go to the nearest point
  //
  points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
  path.push(points.pop());

  // randomly sort points - this is the order they will be added
  // to the path
  points.sort(() => Math.random() - 0.5);

  while (points.length > 0) {
    //
    // SELECTION - choose a next point randomly
    //
    const nextPoint = points.pop();

    //
    // INSERTION -find the insertion spot that minimizes distance
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
