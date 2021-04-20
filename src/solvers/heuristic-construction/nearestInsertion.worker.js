/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost, distance } from "../cost";

const nearestInsertion = async points => {
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

makeSolver(nearestInsertion);
