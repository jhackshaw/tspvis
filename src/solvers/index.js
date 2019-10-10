import random from './exhaustive/random.worker';
import depthFirstSearch from './exhaustive/depthFirstSearch.worker';
import branchAndBoundOnCost from './exhaustive/branchAndBoundOnCost.worker';

import shortestPath from './heuristic/shortestPath.worker.js';
import twoOptReciprocalExchange from './heuristic/twoOptReciprocalExchange.worker';


export default {
  random,
  depthFirstSearch,
  branchAndBoundOnCost,
  
  shortestPath,
  twoOptReciprocalExchange
}
