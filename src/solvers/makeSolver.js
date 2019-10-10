/* eslint-disable no-restricted-globals */
import * as actions from '../store/actions';


const wrapSolver = solver => async (...args) => {
  console.log('calling solver')
  await solver(...args);
  console.log('solver finished')
  self.postMessage(actions.stopSolvingAction());
  self.terminate();
}


export const makeSolver = solver => {
  const run = wrapSolver(solver);

  self.solverConfig = {
    detailLevel: 0,
    delay: 10
  };


  self.setBestPath = (...args) => {
    self.postMessage(actions.setBestPath(...args))
  }

  self.setEvaluatingPaths = (getPaths, level=0) => {
    if (self.solverConfig.detailLevel >= level) {
      const { paths, cost } = getPaths();
      self.postMessage(actions.setEvaluatingPaths(paths, cost));
    }
  }

  self.setEvaluatingPath = (getPath, level=0) => {
    if (self.solverConfig.detailLevel >= level) {
      const { path, cost } = getPath();
      self.postMessage(actions.setEvaluatingPath(path, cost)); 
    }
  }

  self.sleep = () => {
    const duration = self.solverConfig.delay || 10;
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  }

  self.onmessage = async ({ data: action }) => {
    switch (action.type) {
      case actions.START_SOLVING:

        self.solverConfig.delay = action.delay;
        self.solverConfig.detailLevel = action.evaluatingDetailLevel;
        run(action.points)
        break;
      
      case actions.SET_DELAY:
        self.solverConfig.delay = action.delay;
        break;
  
      case actions.SET_EVALUATING_DETAIL_LEVEL:
        self.solverConfig.detailLevel = action.level
        break;
  
      default:
        throw new Error(`invalid action sent to solver ${action.type}`);
    }
  };
};


export default makeSolver;
