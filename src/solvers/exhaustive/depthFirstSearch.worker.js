/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost } from "../cost";

import {
  EVALUATING_PATH_COLOR,
  EVALUATING_SEGMENT_COLOR
} from "../../constants";

const setDifference = (setA, setB) => {
  const ret = new Set(setA);
  setB.forEach(p => {
    ret.delete(p);
  });
  return ret;
};

const dfs = async (points, path = [], visited = null, overallBest = null) => {
  if (visited === null) {
    // initial call
    path = [points.shift()];
    points = new Set(points);
    visited = new Set();
  }

  self.setEvaluatingPaths(
    () => ({
      paths: [
        {
          path: path.slice(0, path.length - 1),
          color: EVALUATING_SEGMENT_COLOR
        },
        {
          path: path.slice(path.length - 2, path.length + 1),
          color: EVALUATING_PATH_COLOR
        }
      ]
    }),
    2
  );
  await self.sleep();

  // figure out what points are left from this point
  const available = setDifference(points, visited);

  if (available.size === 0) {
    // this must be a complete path
    const backToStart = [...path, path[0]];

    // calculate the cost of this path
    const cost = pathCost(backToStart);

    self.setEvaluatingPath(
      () => ({
        path: { path: backToStart, color: EVALUATING_SEGMENT_COLOR }
      }),
      cost
    );

    await self.sleep();

    // return both the cost and the path where we're at
    return [cost, backToStart];
  }

  let [bestCost, bestPath] = [null, null];

  // for every point yet to be visited along this path
  for (const p of available) {
    // go to that point
    visited.add(p);
    path.push(p);

    // RECURSE - go through all the possible points from that point
    const [curCost, curPath] = await dfs(points, path, visited, overallBest);

    // if that path is better, keep it
    if (bestCost === null || curCost < bestCost) {
      [bestCost, bestPath] = [curCost, curPath];

      if (overallBest === null || bestCost < overallBest) {
        // found a new best complete path
        overallBest = bestCost;
        self.setBestPath(bestPath, bestCost);
      }
    }

    // go back up and make that point available again
    visited.delete(p);
    path.pop();

    self.setEvaluatingPath(
      () => ({
        path: { path, color: EVALUATING_SEGMENT_COLOR }
      }),
      2
    );
    await self.sleep();
  }
  return [bestCost, bestPath];
};

makeSolver(dfs);
