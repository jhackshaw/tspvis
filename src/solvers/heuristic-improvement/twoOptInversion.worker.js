/* eslint-disable no-restricted-globals */
import makeSolver from "../makeSolver";
import { pathCost } from "../cost";

import {
  EVALUATING_PATH_COLOR,
  EVALUATING_SEGMENT_COLOR
} from "../../constants";

const twoOptInversion = async path => {
  path.push(path[0]);
  let best = pathCost(path);
  let swapped = true;

  self.setBestPath(path, best);

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

        self.setEvaluatingPaths(() => ({
          paths: [
            { path: path.slice(0, pt1), color: EVALUATING_SEGMENT_COLOR },
            { path: path.slice(pt1 + 1, pt2), color: EVALUATING_SEGMENT_COLOR },
            { path: path.slice(pt2 + 1), color: EVALUATING_SEGMENT_COLOR },
            {
              path: [path[pt1 - 1], path[pt1], path[pt1 + 1]],
              color: EVALUATING_PATH_COLOR
            },
            {
              path: [path[pt2 - 1], path[pt2], path[pt2 + 1]],
              color: EVALUATING_PATH_COLOR
            }
          ],
          cost
        }));
        await self.sleep();

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

        self.setEvaluatingPaths(() => ({
          paths: [{ path, color: EVALUATING_SEGMENT_COLOR }]
        }));
        await self.sleep();
      }
    }
  }
};

makeSolver(twoOptInversion);
