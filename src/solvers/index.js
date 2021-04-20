import random from "./exhaustive/random.worker";
import depthFirstSearch from "./exhaustive/depthFirstSearch.worker";
import branchAndBoundOnCost from "./exhaustive/branchAndBoundOnCost.worker";
import branchAndBoundOnCostAndCross from "./exhaustive/branchAndBoundOnCostAndCross.worker";

import nearestNeighbor from "./heuristic-construction/nearestNeighbor.worker";
import arbitraryInsertion from "./heuristic-construction/arbitraryInsertion.worker";
import nearestInsertion from "./heuristic-construction/nearestInsertion.worker";
import furthestInsertion from "./heuristic-construction/furthestInsertion.worker";
import convexHull from "./heuristic-construction/convexHull.worker";
import simulatedAnnealing from "./heuristic-construction/simulatedAnnealing.worker";

import twoOptInversion from "./heuristic-improvement/twoOptInversion.worker";
import twoOptReciprocalExchange from "./heuristic-improvement/twoOptReciprocalExchange.worker";

export default {
  random,
  depthFirstSearch,
  branchAndBoundOnCost,
  branchAndBoundOnCostAndCross,

  nearestNeighbor,
  arbitraryInsertion,
  furthestInsertion,
  nearestInsertion,
  convexHull,
  simulatedAnnealing,

  twoOptInversion,
  twoOptReciprocalExchange
};
