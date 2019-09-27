/* eslint-disable no-restricted-globals */
import * as actions from '../store/actions';
import * as utils from './utils';
import { EVALUATING_PATH_COLOR,
         EVALUATING_SEGMENT_COLOR } from '../constants';


let DELAY = 0;
let EVALUATING_DETAIL_LEVEL = 0;

self.onmessage = function({ data: action }) {
  switch (action.type) {
    case actions.START_SOLVING:
      DELAY = action.delay;
      EVALUATING_DETAIL_LEVEL = action.evaluatingDetailLevel;
      runner(action.points)
      break;
    
    case actions.SET_DELAY:
      DELAY = action.delay;
      break;

    case actions.SET_EVALUATING_DETAIL_LEVEL:
      EVALUATING_DETAIL_LEVEL = action.level
      break;

    default:
      throw new Error(`invalid action sent to solver ${action.type}`);
  }
}

const runner = async points => {
  await dfs(points)
  self.postMessage(actions.stopSolving())
  self.terminate()
}

const setDifference = (setA, setB) => {
  const ret = new Set(setA);
  setB.forEach(p => {
    ret.delete(p)
  })
  return ret
}

const sleep = async () => {
  await utils.sleep(DELAY || 10)
}

const dfs = async (points, path=[], visited=null, overallBest=null) => {
  if (visited === null) {
    // initial call
    path = [points.shift()]
    points = new Set(points);
    visited = new Set();
  }

  const available = setDifference(points, visited);
  const backToStart = [...path, path[0]];
  const cost = utils.pathCost(backToStart);

  if (EVALUATING_DETAIL_LEVEL > 1 && path.length > 2) {
    self.postMessage(actions.setEvaluatingPaths([
      { path: path.slice(0, path.length - 1), color: EVALUATING_SEGMENT_COLOR },
      { path: path.slice(path.length - 2, path.length + 1), color: EVALUATING_PATH_COLOR }
    ], cost))
    await sleep();
  }

  // console.log(overallBest, cost)
  if (overallBest && (cost > overallBest)) {
    // cut this branch
    console.log('CUT!!!!', overallBest, cost)
    return [null, null]
  }

  if (available.size === 0) {
    if (EVALUATING_DETAIL_LEVEL) {
      self.postMessage(actions.setEvaluatingPaths([
        { path: backToStart, color: EVALUATING_SEGMENT_COLOR }
      ], cost))
    }

    return [cost, backToStart] 
  }


  let [bestCost, bestPath] = [null, null];

  for (const p of available) {
    visited.add(p)
    path.push(p)

    const [curCost, curPath] = await dfs(points, path, visited, overallBest);
    
    console.log(curCost)
    if (curCost && (!bestCost || curCost < bestCost)) {
      bestCost = curCost;
      bestPath = curPath;

      if (!overallBest || bestCost < overallBest) {
        overallBest = bestCost
        self.postMessage(actions.setBestPath(bestPath, bestCost))
      }
    }

    visited.delete(p)
    path.pop();
  }

  await sleep()
  return [bestCost, bestPath]
}
