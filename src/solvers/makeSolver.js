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
    paused: false,
    stepRequested: false
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
    while (self.solverConfig.paused && !self.solverConfig.stepRequested) {
      await new Promise(r => setTimeout(r, 50));
    }
  };


  self.sleep = async () => {
    if (self.solverConfig.paused) {
      await self.waitPause();
    }

    if (self.solverConfig.stepRequested) {
      self.solverConfig.stepRequested = false;
      return;
    }

    const ms = self.solverConfig.fullSpeed ? 0 : self.solverConfig.delay || 10;
    return new Promise(r => setTimeout(r, ms));
  };



  self.onmessage = async ({ data: action }) => {
    switch (action.type) {
      case actions.START_SOLVING:
        Object.assign(self.solverConfig, {
          delay: action.delay,
          detailLevel: action.evaluatingDetailLevel,
          fullSpeed: action.fullSpeed,
          paused: false,
          stepRequested: false
        });
        run(action.points);
        break;

      case actions.SET_DELAY:
        self.solverConfig.delay = action.delay;
        break;

      case actions.SET_EVALUATING_DETAIL_LEVEL:
        self.solverConfig.detailLevel = action.level;
        break;

      case actions.GO_FULL_SPEED:
        self.solverConfig.fullSpeed = true;
        self.solverConfig.paused = false;
        self.solverConfig.stepRequested = false;
        break;

      case actions.PAUSE:
        self.solverConfig.paused = true;
        break;

      case actions.UNPAUSE:
        self.solverConfig.paused = false;
        break;

      case actions.STEP_SOLVING:
        self.solverConfig.stepRequested = true;
        break;

      default:
        throw new Error(`invalid action sent to solver ${action.type}`);
    }
  };
};

export default makeSolver;
