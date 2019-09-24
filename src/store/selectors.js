import { createSelector } from 'reselect';

export const selectAlgorithm = state => state.algorithm;

export const selectDelay = state => state.delay;

export const selectShowIntermediatePaths = state => state.showIntermediatePaths;

export const selectPoints = state => state.points;

export const selectBestPath = state => state.bestPath;

export const selectIntermediatePaths = state => state.intermediatePaths;

export const selectViewport = state => state.viewport;

export const selectRunning = state => state.running;

export const selectPlotPoints = createSelector(
  selectPoints,
  points => points.map((p, idx) => ({ 
    position: p, 
    color: idx === 0 ? [255, 87, 34] : [41, 121, 255] 
  }))
)

export const selectPlotBestPath = createSelector(
  selectBestPath,
  path => ({ 
    path, 
    color: [0, 0, 0, 255]
  })
)

export const selectPlotIntermediatePaths = createSelector(
  selectIntermediatePaths,
  paths => paths.map(path => ({ 
    path, 
    color: [255, 87, 34]
  }))
)

export const selectPlotPaths = createSelector(
  selectPlotBestPath, selectPlotIntermediatePaths,
  (bestPath, intermediatePaths) => [bestPath, ...intermediatePaths]
)
