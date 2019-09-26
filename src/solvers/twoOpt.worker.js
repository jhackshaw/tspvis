/* eslint-disable no-restricted-globals */
import * as actions from '../store/actions';
import * as utils from './utils';


let DELAY = 0;
let EVALUATING_DETAIL_LEVEL = 0;

self.onmessage = function({ data: action }) {
  switch (action.type) {
    case actions.START_SOLVING:
      DELAY = action.delay;
      EVALUATING_DETAIL_LEVEL = action.evaluatingDetailLevel;
      twoOpt(action.points)
      break;
    
    case actions.SET_DELAY:
      DELAY = action.delay;
      break;

    case actions.SET_EVALUATING_DETAIL_LEVEL:
      EVALUATING_DETAIL_LEVEL = action.level
      console.log(EVALUATING_DETAIL_LEVEL)
      break;

    default:
      throw new Error(`invalid action sent to solver ${action.type}`);
  }
}

// const swap = (path, pt1, pt2) => {
//   const A = path[pt1];
//   const B = path[pt2];
//   path[pt1] = B;
//   path[pt2] = A;
// }

const twoOpt = async path => {
  let swapped = true;
  path.push(path[0])
  let best = utils.pathCost(path);
  self.postMessage(actions.setBestPath(path, best))
  
  while (swapped) {
    swapped = false
    for (let pt1=1; pt1<path.length-1; pt1++) {
      for (let pt2=pt1+1; pt2<path.length-1; pt2++) {
        // swap(path, pt1, pt2);
        [path[pt1], path[pt2]] = [path[pt2], path[pt1]]

        const cost = utils.pathCost(path);

        if (EVALUATING_DETAIL_LEVEL) {
          self.postMessage(actions.setBestPaths([
            path.slice(0, pt1),
            path.slice(pt1+1, pt2),
            path.slice(pt2+1)
          ], best))
          self.postMessage(actions.setIntermediatePaths([
            [path[pt1-1], path[pt1], path[pt1+1]],
            [path[pt2-1], path[pt2], path[pt2+1]]
          ], cost))
          await utils.sleep(DELAY || 10)
        }

        if (cost < best) {
          swapped = true;
          best = cost;
        } else {
          [path[pt1], path[pt2]] = [path[pt2], path[pt1]]
        }

        self.postMessage(actions.setBestPath(path, best));
        self.postMessage(actions.setIntermediatePaths([]))
        await utils.sleep(DELAY || 10)
      }
    }
  }

  self.postMessage(actions.stopSolving())
  self.terminate()
}
