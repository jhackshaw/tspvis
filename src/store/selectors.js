import { createSelector } from "reselect";
import {
  START_POINT_COLOR,
  POINT_COLOR,
  BEST_PATH_COLOR,
  EVALUATING_PATH_COLOR
} from "../constants";

//
// FOR UI
//
export const selectSiteInfoOpen = state => state.siteInfoOpen;
export const selectAlgInfoOpen = state => state.algInfoOpen;

//
//  FOR SOLVER CONTROLS
//
export const selectAlgorithm = state => state.algorithm;

export const selectDelay = state => state.delay;

export const selectEvaluatingDetailLevel = state => state.evaluatingDetailLevel;

export const selectMaxEvaluatingDetailLevel = state =>
  state.maxEvaluatingDetailLevel;

export const selectRunning = state => state.running;

export const selectFullSpeed = state => state.fullSpeed;

export const selectPaused = state => state.paused;

export const selectStartedRunningAt = state => state.startedRunningAt;

//
// FOR POINT CONTROLS
//
export const selectDefiningPoints = state => state.definingPoints;

export const selectPointCount = state => state.pointCount;

//
// FOR PLOT
//

export const selectViewport = state => state.viewport;

export const selectPoints = state => state.points;
export const selectPointsDisplay = createSelector(selectPoints, points =>
  points.map((p, idx) => ({
    position: p,
    color: idx === 0 ? START_POINT_COLOR : POINT_COLOR
  }))
);

export const selectShowBestPath = state => state.showBestPath;
export const selectBestPath = state => state.bestPath;
export const selectBestPathDisplay = createSelector(
  selectBestPath,
  selectShowBestPath,
  (path, show) => ({
    path: show ? path : [],
    color: BEST_PATH_COLOR,
    width: 20
  })
);

export const selectBestCost = state => state.bestCost;
export const selectBestCostDisplay = createSelector(selectBestCost, cost =>
  cost ? cost.toFixed(2) : ""
);

export const selectEvaluatingPaths = state => state.evaluatingPaths;
export const selectEvaluatingPathsDisplay = createSelector(
  selectEvaluatingPaths,
  paths =>
    paths.map(({ path, color }) => ({
      path,
      color: color || EVALUATING_PATH_COLOR,
      width: 5
    }))
);

export const selectEvaluatingCost = state => state.evaluatingCost;
export const selectEvaluatingCostDisplay = createSelector(
  selectEvaluatingCost,
  cost => (cost ? cost.toFixed(2) : "")
);

export const selectPlotPaths = createSelector(
  selectBestPathDisplay,
  selectEvaluatingPathsDisplay,
  (bestPath, evaluatingPaths) => [...evaluatingPaths, bestPath]
);
