/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost, distance } from "../cost";

const furthestInsertion = async points => {
  // from the starting point
  const path = [points.shift()];

  //
  // INITIALIZATION - go to the nearest point first
  //
  points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
  path.push(points.pop());

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost: pathCost(path)
  }));

  await self.sleep();

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

    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost: pathCost(path)
    }));

    await self.sleep();
  }

  // return to start after visiting all other points
  path.push(path[0]);
  const cost = pathCost(path);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost
  }));
  await self.sleep();

  self.setBestPath(path, cost);
};

makeSolver(furthestInsertion);
