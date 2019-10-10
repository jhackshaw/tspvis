/* eslint-disable no-restricted-globals */
import makeSolver from '../makeSolver';
import { pathCost } from '../cost';

import { EVALUATING_PATH_COLOR,
         EVALUATING_ERROR_COLOR,
         EVALUATING_SEGMENT_COLOR } from '../../constants';


const setDifference = (setA, setB) => {
  const ret = new Set(setA);
  setB.forEach(p => {
    ret.delete(p)
  })
  return ret
}

const bAndBOnCost = async (points, path=[], visited=null, overallBest=Infinity) => {
  if (visited === null) {
    // initial call
    path = [points.shift()]
    points = new Set(points);
    visited = new Set();
  }

  const available = setDifference(points, visited);
  const backToStart = [...path, path[0]];
  const cost = pathCost(backToStart);
  

  if (cost > overallBest) {
    // cut this branch
    self.setEvaluatingPaths(() => ({
      paths: [
        { path: path.slice(0, path.length - 1), color: EVALUATING_SEGMENT_COLOR },
        { path: path.slice(path.length - 2, path.length + 1), color: EVALUATING_ERROR_COLOR }
      ],
      cost
    }), 2);
    await self.sleep();

    return [null, null]
  }

  else {
    // continue down this branch 
    self.setEvaluatingPaths(() => ({
      paths: [
        { path: path.slice(0, path.length - 1), color: EVALUATING_SEGMENT_COLOR },
        { path: path.slice(path.length - 2, path.length + 1), color: EVALUATING_PATH_COLOR }
      ],
      cost
    }), 2);
  }

  await self.sleep();

  if (available.size === 0) {
    // at the end of a branch
    self.setEvaluatingPath(() => ({
      path: { path: backToStart, color: EVALUATING_SEGMENT_COLOR },
      cost
    }))

    return [cost, backToStart] 
  }


  let [bestCost, bestPath] = [null, null];

  for (const p of available) {
    visited.add(p)
    path.push(p)

    // recurse
    const [curCost, curPath] = await bAndBOnCost(points, path, visited, overallBest);
    
    
    if (curCost && (!bestCost || curCost < bestCost)) {
      [bestCost, bestPath] = [curCost, curPath];

      if (!overallBest || bestCost < overallBest) {
        overallBest = bestCost
        self.setBestPath(bestPath, bestCost);
      }
    }

    visited.delete(p)
    path.pop();

    self.setEvaluatingPath(() => ({
      path: { path, color: EVALUATING_SEGMENT_COLOR }
    }), 2)
    await self.sleep();

  }

  await self.sleep()
  return [bestCost, bestPath]
}



makeSolver(bAndBOnCost);
