export const SET_VIEWPORT_STATE = 'SET_VIEWPORT_STATE';
export const SET_ALGORITHM = 'SET_ALGORITHM';
export const SET_DELAY = 'SET_DELAY';
export const SET_SHOW_INTERMEDIATE_PATHS = 'SET_SHOW_INTERMEDIATE_PATHS';
export const SET_BEST_PATH = 'SET_BEST_PATH';
export const SET_INTERMEDIATE_PATHS = 'SET_INTERMEDIATE_PATHS';
export const START_SOLVING = 'START_SOLVING';
export const STOP_SOLVING = 'STOP_SOLVING';
export const RESET = 'RESET';


export const setViewportState = viewport => ({
  type: SET_VIEWPORT_STATE,
  viewport
})

export const setAlgorthim = algorithm => ({
  type: SET_ALGORITHM,
  algorithm
})

export const setDelay = delay => ({
  type: SET_DELAY,
  delay
})

export const setShowIntermediatePaths = show => ({
  type: SET_SHOW_INTERMEDIATE_PATHS,
  show
})

export const setBestPath = path => ({
  type: SET_BEST_PATH,
  path
})

export const setIntermediatePath = path => ({
  type: SET_INTERMEDIATE_PATHS,
  paths: [path]  
})

export const startSolving = (points, delay, showIntermediatePaths) => ({
  type: START_SOLVING,
  points,
  delay,
  showIntermediatePaths
})

export const stopSolving = () => ({
  type: STOP_SOLVING
})

export const reset = () => ({
  type: RESET
})



