/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost, setDifference, intersects } from "../cost";

import {
  EVALUATING_PATH_COLOR,
  EVALUATING_ERROR_COLOR,
  EVALUATING_SEGMENT_COLOR
} from "../../constants";

const branchAndBoundOnCostAndCross = async (
  points,
  path = [],
  visited = null,
  overallBest = Infinity
) => {
  if (visited === null) {
    // initial call
    path = [points.shift()];
    points = new Set(points);
    visited = new Set();
  }

  // figure out which points are left
  const available = setDifference(points, visited);

  // calculate the cost, from here, to go home
  const backToStart = [...path, path[0]];
  const cost = pathCost(backToStart);

  if (path.length > 3) {
    // if this newly added edge crosses over the existing path,
    // don't continue. It's been proven that an optimal path will
    // not cross itself.
    const newSegment = [path[path.length - 2], path[path.length - 1]];
    for (let i = 1; i < path.length - 2; i++) {
      if (intersects(path[i], path[i - 1], ...newSegment)) {
        self.setEvaluatingPaths(
          () => ({
            paths: [
              {
                path: path.slice(0, path.length - 1),
                color: EVALUATING_SEGMENT_COLOR
              },
              {
                path: path.slice(path.length - 2, path.length + 1),
                color: EVALUATING_ERROR_COLOR
              }
            ],
            cost
          }),
          2
        );
        await self.sleep();

        return [null, null];
      }
    }
  }

  if (cost > overallBest) {
    // we may not be done, but have already traveled further than the best path
    // no reason to continue
    self.setEvaluatingPaths(
      () => ({
        paths: [
          {
            path: path.slice(0, path.length - 1),
            color: EVALUATING_SEGMENT_COLOR
          },
          {
            path: path.slice(path.length - 2, path.length + 1),
            color: EVALUATING_ERROR_COLOR
          }
        ],
        cost
      }),
      2
    );
    await self.sleep();

    return [null, null];
  }

  // still cheaper than the best, keep going deeper, and deeper, and deeper...
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
      ],
      cost
    }),
    2
  );
  await self.sleep();

  if (available.size === 0) {
    // at the end of the path, return where we're at
    self.setEvaluatingPath(() => ({
      path: { path: backToStart, color: EVALUATING_SEGMENT_COLOR },
      cost
    }));

    await self.sleep();
    return [cost, backToStart];
  }

  let [bestCost, bestPath] = [null, null];

  // for every point yet to be visited along this path
  for (const p of available) {
    // go to that point
    visited.add(p);
    path.push(p);

    // RECURSE - go through all the possible points from that point
    const [curCost, curPath] = await branchAndBoundOnCostAndCross(
      points,
      path,
      visited,
      overallBest
    );

    // if that path is better and complete, keep it
    if (curCost && (!bestCost || curCost < bestCost)) {
      [bestCost, bestPath] = [curCost, curPath];

      if (!overallBest || bestCost < overallBest) {
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

  await self.sleep();
  return [bestCost, bestPath];
};

makeSolver(branchAndBoundOnCostAndCross);
