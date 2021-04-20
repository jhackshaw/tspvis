---
type: heuristic-improvement
order: 1
solverKey: twoOptInversion
friendlyName: Two Opt Inversion
defaults:
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

# Two-Opt inversion

This algorithm is also known as 2-opt, 2-opt mutation, and cross-aversion. The general goal is to find places where the path crosses over itself, and then "undo" that crossing. It repeats until there are no crossings. A characteristic of this algorithm is that afterwards the path is guaranteed to have no crossings.

1. While a better path has not been found.
2. For each pair of points:
3. Reverse the path between the selected points.
4. If the new path is cheaper (shorter), keep it and continue searching. Remember that we found a better path.
5. If not, revert the path and continue searching.

## Implementation

```javascript
const twoOptInversion = async path => {
  path.push(path[0]);
  let best = pathCost(path);
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let pt1 = 1; pt1 < path.length - 1; pt1++) {
      for (let pt2 = pt1 + 1; pt2 < path.length - 1; pt2++) {
        // section of the path to reverse
        const section = path.slice(pt1, pt2 + 1);

        // reverse section in place
        section.reverse();

        // replace section of path with reversed section in place
        path.splice(pt1, pt2 + 1 - pt1, ...section);

        // calculate new cost
        const newPath = path;
        const cost = pathCost(newPath);

        if (cost < best) {
          // found a better path after the swap, keep it
          swapped = true;
          best = cost;
          self.setBestPath(newPath, best);
        } else {
          // un-reverse the section
          section.reverse();
          path.splice(pt1, pt2 + 1 - pt1, ...section);
        }
      }
    }
  }
};
```
