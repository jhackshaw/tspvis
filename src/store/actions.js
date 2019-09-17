export const SET_VIEWPORT_STATE = 'SET_VIEWPORT_STATE';
export const SET_BEST_PATH = 'SET_BEST_PATH';


export const setViewportState = viewport => ({
  type: SET_VIEWPORT_STATE,
  viewport
})

export const setBestPath = path => ({
  type: SET_BEST_PATH,
  path
})
