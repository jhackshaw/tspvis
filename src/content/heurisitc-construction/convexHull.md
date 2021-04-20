---
type: heuristic-construction
order: 5
solverKey: convexHull
friendlyName: Convex Hull
defaults:
  evaluatingDetailLevel: 2
  maxEvaluatingDetailLevel: 2
---

# Convex Hull

This is a heuristic construction algorithm. It starts by building the [convex hull](https://en.wikipedia.org/wiki/Convex_hull), and adding interior points from there. This implmentation uses another heuristic for insertion based on the ratio of the cost of adding the new point to the overall length of the segment, however any insertion algorithm could be applied after building the hull.

There are a number of algorithms to determine the convex hull. This implementation uses the [gift wrapping algorithm](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm).

In essence, the steps are:

1. Determine the leftmost point
2. Continually add the most counterclockwise point until the convex hull is formed
3. For each remaining point p, find the segment i => j in the hull that minimizes cost(i -> p) + cost(p -> j) - cost(i -> j)
4. Of those, choose p that minimizes cost(i -> p -> j) / cost(i -> j)
5. Add p to the path between i and j
6. Repeat from #3 until there are no remaining points

## Implementation

```javascript
const convexHull = async points => {
  const sp = points[0];

  // Find the "left most point"
  let leftmost = points[0];
  for (const p of points) {
    if (p[1] < leftmost[1]) {
      leftmost = p;
    }
  }

  const path = [leftmost];

  while (true) {
    const curPoint = path[path.length - 1];
    let [selectedIdx, selectedPoint] = [0, null];

    // find the "most counterclockwise" point
    for (let [idx, p] of points.entries()) {
      if (!selectedPoint || orientation(curPoint, p, selectedPoint) === 2) {
        // this point is counterclockwise with respect to the current hull
        // and selected point (e.g. more counterclockwise)
        [selectedIdx, selectedPoint] = [idx, p];
      }
    }

    // adding this to the hull so it's no longer available
    points.splice(selectedIdx, 1);

    // back to the furthest left point, formed a cycle, break
    if (selectedPoint === leftmost) {
      break;
    }

    // add to hull
    path.push(selectedPoint);
  }

  while (points.length > 0) {
    let [bestRatio, bestPointIdx, insertIdx] = [Infinity, null, 0];

    for (let [freeIdx, freePoint] of points.entries()) {
      // for every free point, find the point in the current path
      // that minimizes the cost of adding the point minus the cost of
      // the original segment
      let [bestCost, bestIdx] = [Infinity, 0];
      for (let [pathIdx, pathPoint] of path.entries()) {
        const nextPathPoint = path[(pathIdx + 1) % path.length];

        // the new cost minus the old cost
        const evalCost =
          pathCost([pathPoint, freePoint, nextPathPoint]) -
          pathCost([pathPoint, nextPathPoint]);

        if (evalCost < bestCost) {
          [bestCost, bestIdx] = [evalCost, pathIdx];
        }
      }

      // figure out how "much" more expensive this is with respect to the
      // overall length of the segment
      const nextPoint = path[(bestIdx + 1) % path.length];
      const prevCost = pathCost([path[bestIdx], nextPoint]);
      const newCost = pathCost([path[bestIdx], freePoint, nextPoint]);
      const ratio = newCost / prevCost;

      if (ratio < bestRatio) {
        [bestRatio, bestPointIdx, insertIdx] = [ratio, freeIdx, bestIdx + 1];
      }
    }

    const [nextPoint] = points.splice(bestPointIdx, 1);
    path.splice(insertIdx, 0, nextPoint);
  }

  // rotate the array so that starting point is back first
  const startIdx = path.findIndex(p => p === sp);
  path.unshift(...path.splice(startIdx, path.length));

  // go back home
  path.push(sp);
};
```
