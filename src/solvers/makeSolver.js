/* eslint-disable no-restricted-globals */
import * as actions from "../store/actions";

const wrapSolver = solver => async (...args) => {
  await solver(...args);
  self.postMessage(actions.stopSolvingAction());
};

export const makeSolver = solver => {
  const run = wrapSolver(solver);

  self.solverConfig = {
    detailLevel: 0,
    delay: 10,
    fullSpeed: false,
    paused: false
  };

  self.setBestPath = (...args) => {
    self.postMessage(actions.setBestPath(...args));
  };

  self.setEvaluatingPaths = (getPaths, level = 1) => {
    if (self.solverConfig.detailLevel >= level) {
      const { paths, cost } = getPaths();
      self.postMessage(actions.setEvaluatingPaths(paths, cost));
    }
  };

  self.setEvaluatingPath = (getPath, level = 1) => {
    if (self.solverConfig.detailLevel >= level) {
      const { path, cost } = getPath();
      self.postMessage(actions.setEvaluatingPath(path, cost));
    }
  };

  self.waitPause = async () => {
    while (self.solverConfig.paused) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  self.sleep = async () => {
    if (self.solverConfig.paused) {
      return await self.waitPause();
    }
    const duration = self.solverConfig.fullSpeed
      ? 0
      : self.solverConfig.delay || 10;
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  };

  self.onmessage = async ({ data: action }) => {
    switch (action.type) {
      case actions.START_SOLVING:
        self.solverConfig.delay = action.delay;
        self.solverConfig.detailLevel = action.evaluatingDetailLevel;
        self.solverConfig.fullSpeed = action.fullSpeed;
        run(action.points);
        break;

      case actions.SET_DELAY:
        self.solverConfig.delay = action.delay;
        break;

      case actions.SET_EVALUATING_DETAIL_LEVEL:
        self.solverConfig.detailLevel = action.level;
        break;

      case actions.GO_FULL_SPEED:
        self.solverConfig.evaluatingDetailLevel = 0;
        self.solverConfig.fullSpeed = true;
        break;

      case actions.PAUSE:
        self.solverConfig.paused = true;
        break;

      case actions.UNPAUSE:
        self.solverConfig.paused = false;
        break;

      default:
        throw new Error(`invalid action sent to solver ${action.type}`);
    }
  };
};

export default makeSolver;
