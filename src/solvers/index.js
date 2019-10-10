import random from './exhaustive/random.worker.js';
import dfs from './exhaustive/dfs.worker.js';
import bAndBOnCost from './exhaustive/bAndBOnCost.worker.js';

import shortestPath from './heuristic/shortestPath.worker.js';
import twoOptReciprocalExchange from './heuristic/twoOptReciprocalExchange.worker.js';

export default {
  random,
  dfs,
  bAndBOnCost,
  
  shortestPath,
  twoOptReciprocalExchange
}
