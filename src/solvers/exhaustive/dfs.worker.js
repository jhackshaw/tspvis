/* eslint-disable no-restricted-globals */
import makeSolver from '../makeSolver';
import { pathCost } from '../cost';

import { EVALUATING_PATH_COLOR,
         EVALUATING_SEGMENT_COLOR } from '../../constants';


const setDifference = (setA, setB) => {
  const ret = new Set(setA);
  setB.forEach(p => {
    ret.delete(p)
  })
  return ret
}

const dfs = async (points, path=[], visited=null, overallBest=null) => {
  if (visited === null) {
    // initial call
    path = [points.shift()]
    points = new Set(points);
    visited = new Set();
  }

  self.setEvaluatingPaths(() => ({
    paths: [
      { path: path.slice(0, path.length - 1), color: EVALUATING_SEGMENT_COLOR },
      { path: path.slice(path.length - 2, path.length + 1), color: EVALUATING_PATH_COLOR }
    ]
  }), 2)
  await self.sleep();


  const available = setDifference(points, visited);

  if (available.size === 0) {
    // evaluate a complete path
    const backToStart = [...path, path[0]];
    const cost = pathCost(backToStart);

    self.setEvaluatingPath(() => ({
      path: { path: backToStart, color: EVALUATING_SEGMENT_COLOR }
    }), cost);

    await self.sleep();

    return [cost, backToStart] 
  }


  let [bestCost, bestPath] = [null, null];

  for (const p of available) {
    visited.add(p)
    path.push(p)

    // recurse
    const [curCost, curPath] = await dfs(points, path, visited, overallBest);
    
    if (bestCost === null || curCost < bestCost) {
      [bestCost, bestPath] = [curCost, curPath];
      
      if (overallBest === null || bestCost < overallBest) {
        // found a new best complete path
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
  return [bestCost, bestPath]
}


makeSolver(dfs);
