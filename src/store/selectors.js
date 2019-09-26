import { createSelector } from 'reselect';

export const selectAlgorithm = state => state.algorithm;

export const selectDelay = state => state.delay;

export const selectEvaluatingDetailLevel = state => state.evaluatingDetailLevel;

export const selectPoints = state => state.points;

export const selectBestPaths = state => state.bestPaths;

export const selectBestCost = state => state.bestCost;

export const selectEvaluatingCost = state => state.evaluatingCost;

export const selectIntermediatePaths = state => state.intermediatePaths;

export const selectViewport = state => state.viewport;

export const selectRunning = state => state.running;

export const selectDefiningPoints = state => state.definingPoints;

export const selectPointCount = state => state.pointCount;

export const selectDisplayBestCost = createSelector(
  selectBestCost,
  cost => cost ? cost.toFixed(2) : 'N/A' 
)

export const selectDisplayEvaluatingCost = createSelector(
  selectEvaluatingCost,
  cost => cost ? cost.toFixed(2) : 'N/A'
)

export const selectPlotPoints = createSelector(
  selectPoints,
  points => points.map((p, idx) => ({ 
    position: p, 
    color: idx === 0 ? [255, 87, 34] : [41, 121, 255] 
  }))
)

export const selectPlotBestPaths = createSelector(
  selectBestPaths,
  paths => paths.map(path => ({ 
    path, 
    color: [0, 0, 0, 200],
    width: 20,
    dashes: [0, 0]
  }))
)

export const selectPlotIntermediatePaths = createSelector(
  selectIntermediatePaths,
  paths => paths.map(path => ({ 
    path, 
    color: [255, 87, 34],
    width: 5,
    dashes: [3, 2]
  }))
)

export const selectPlotPaths = createSelector(
  selectPlotBestPaths, selectPlotIntermediatePaths,
  (bestPath, intermediatePaths) => [...bestPath, ...intermediatePaths]
)
