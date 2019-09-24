export const SET_VIEWPORT_STATE = 'SET_VIEWPORT_STATE';
export const SET_BEST_PATH = 'SET_BEST_PATH';
export const SET_DELAY = 'SET_DELAY';
export const STARTING_WORK = 'STARTING_WORK';
export const STOPPING_WORK = 'STOPPING_WORK';


export const setViewportState = viewport => ({
  type: SET_VIEWPORT_STATE,
  viewport
})

export const setBestPath = path => ({
  type: SET_BEST_PATH,
  path
})

export const setDelay = delay => ({
  type: SET_DELAY,
  delay
})

export const startingWork = () => ({
  type: STARTING_WORK
})

export const stoppingWork = () => ({
  type: STOPPING_WORK
})