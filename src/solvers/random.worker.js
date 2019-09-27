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
  let best = null;
  while (true) {
    const start = points.shift();
    const path = points.sort(() => Math.random() - 0.5);
    path.unshift(start);
    path.push(start);
    const cost = utils.pathCost(path);

    if (best === null || cost < best) {
      best = cost;
      self.postMessage(actions.setBestPath(path, cost));
    }

    if (EVALUATING_DETAIL_LEVEL) {
      self.postMessage(actions.setEvaluatingPath(path, cost))
    }
    
    path.pop();
    await utils.sleep(DELAY || 10)
  }
}
