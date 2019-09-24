/* eslint-disable no-restricted-globals */
import * as actions from '../store/actions';
import * as utils from './utils';


self.onmessage = function({ data }) {
  console.log(data)
  const { points, delay } = data;
  run(points, delay)
}

const run = async (points, delay) => {
  let best = null;
  while (true) {
    const nextPath = points.sort(() => Math.random() - 0.5);
    const cost = utils.pathCost(nextPath);
    if (best === null || cost < best) {
      best = cost;
      self.postMessage(actions.setBestPath(nextPath, cost));
    }
    await utils.sleep(delay)
  }
}
