/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost } from "../cost";

const random = async points => {
  let best = Infinity;

  while (true) {
    // save off the starting point
    const start = points.shift();

    // sort the remaining points
    const path = points.sort(() => Math.random() - 0.5);

    // put the starting point back
    path.unshift(start);

    // return to the starting point
    path.push(start);

    // calculate the new cost
    const cost = pathCost(path);

    if (cost < best) {
      // we found a better path
      best = cost;
      self.setBestPath(path, cost);
    }

    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost
    }));

    // get rid of starting point at the end
    path.pop();
    await self.sleep();
  }
};

makeSolver(random);
