/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost, distance, rotateToStartingPoint } from "../cost";
import { EVALUATING_PATH_COLOR } from "../../constants";

const simulatedAnnealing = async points => {
  const sp = points[0];
  const path = points;

  const tempCoeff =
    path.length < 10
      ? 1 - 1e-4
      : path.length < 15
      ? 1 - 1e-5
      : path.length < 30
      ? 1 - 1e-6
      : 1 - 5e-7;

  const deltaDistance = (aIdx, bIdx) => {
    const aPrev = (aIdx - 1 + path.length) % path.length;
    const aNext = (aIdx + 1 + path.length) % path.length;
    const bPrev = (bIdx - 1 + path.length) % path.length;
    const bNext = (bIdx + 1 + path.length) % path.length;
    let diff =
      distance(path[bPrev], path[aIdx]) +
      distance(path[aIdx], path[bNext]) +
      distance(path[aPrev], path[bIdx]) +
      distance(path[bIdx], path[aNext]) -
      distance(path[aPrev], path[aIdx]) -
      distance(path[aIdx], path[aNext]) -
      distance(path[bPrev], path[bIdx]) -
      distance(path[bIdx], path[bNext]);

    if (bPrev === aIdx || bNext === aIdx) {
      diff += 2 * distance(path[aIdx], path[bIdx]);
    }
    return diff;
  };

  const changePath = temperature => {
    // 2 random points
    const a = 1 + Math.floor(Math.random() * (path.length - 1));
    const b = 1 + Math.floor(Math.random() * (path.length - 1));

    const delta = deltaDistance(a, b);
    if (delta < 0 || Math.random() < Math.exp(-delta / temperature)) {
      // swap points
      [path[a], path[b]] = [path[b], path[a]];
    }
  };

  const initialTemp = 100 * distance(path[0], path[1]);
  let i = 0;

  for (
    let temperature = initialTemp;
    temperature > 1e-6;
    temperature *= tempCoeff
  ) {
    changePath(temperature);
    if (i % 10000 == 0) {
      self.setEvaluatingPaths(() => ({
        paths: [{ path, color: EVALUATING_PATH_COLOR }],
        cost: pathCost(path)
      }));
      await self.sleep();
    }
    if (i % 100000 == 0) {
      path.push(sp);
      self.setBestPath(path, pathCost(path));
      path.pop();
    }
    i++;
  }

  // rotate the array so that starting point is back first
  rotateToStartingPoint(path, sp);

  // go back home
  path.push(sp);
  const cost = pathCost(path);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost
  }));
  self.setBestPath(path, cost);
};

makeSolver(simulatedAnnealing);
