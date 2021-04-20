/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost, distance } from "../cost";

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

makeSolver(nearestNeighbor);
