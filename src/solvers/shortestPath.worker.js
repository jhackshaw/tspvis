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
      run(action.points)
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

const run = async points => {
  const path = [points[0]];
  const remaining = points.slice(1);
  while (remaining.length > 0) {
    // sort remaining points in place by their distance to last point in path
    remaining.sort((a, b) => (
      utils.haversine(path[path.length - 1], b) -
      utils.haversine(path[path.length - 1], a)
    ));

    path.push(remaining.pop());

    if (EVALUATING_DETAIL_LEVEL) {
      self.postMessage(actions.setIntermediatePath(path, utils.pathCost(path)))
    }

    await utils.sleep(DELAY || 10)
  }

  path.push(path[0]);
  const cost = utils.pathCost(path);
  if (EVALUATING_DETAIL_LEVEL) {
    self.postMessage(actions.setIntermediatePath(path, cost))
  }
  self.postMessage(actions.setBestPath(path, cost));
  self.postMessage(actions.stopSolving());
  self.terminate();
}
