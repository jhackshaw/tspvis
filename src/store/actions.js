export const SET_VIEWPORT_STATE = 'SET_VIEWPORT_STATE';
export const SET_ALGORITHM = 'SET_ALGORITHM';
export const SET_DELAY = 'SET_DELAY';
export const SET_EVALUATING_DETAIL_LEVEL = 'SET_EVALUATING_DETAIL_LEVEL';
export const SET_BEST_PATHS = 'SET_BEST_PATHS';
export const SET_INTERMEDIATE_PATHS = 'SET_INTERMEDIATE_PATHS';
export const SET_POINT_COUNT = 'SET_POINT_COUNT';
export const SET_POINTS = 'SET_POINTS';
export const SET_DEFAULT_MAP = 'SET_DEFAULT_MAP';
export const START_SOLVING = 'START_SOLVING';
export const STOP_SOLVING = 'STOP_SOLVING';
export const START_DEFINING_POINTS = 'START_DEFINING_POINTS';
export const STOP_DEFINING_POINTS = 'STOP_DEFINING_POINTS';
export const ADD_DEFINED_POINT = 'ADD_DEFINED_POINT';
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

export const setEvaluatingDetailLevel = level => ({
  type: SET_EVALUATING_DETAIL_LEVEL,
  level
})

export const setBestPath = (path, cost) => ({
  type: SET_BEST_PATHS,
  paths: [path],
  cost
})

export const setBestPaths = (paths, cost) => ({
  type: SET_BEST_PATHS,
  paths,
  cost
})

export const setIntermediatePath = (path, cost) => ({
  type: SET_INTERMEDIATE_PATHS,
  paths: [path],
  cost
})

export const setIntermediatePaths = (paths, cost) => ({
  type: SET_INTERMEDIATE_PATHS,
  paths: paths,
  cost
})

export const startSolving = (points, delay, evaluatingDetailLevel) => ({
  type: START_SOLVING,
  points,
  delay,
  evaluatingDetailLevel
})

export const stopSolving = () => ({
  type: STOP_SOLVING
})

export const reset = () => ({
  type: RESET
})


export const setPointCount = count => ({
  type: SET_POINT_COUNT,
  count
})

const getRandomPoint = (max, min) => (
  Math.random() * (max - min) + min
)

export const randomizePoints = (bounds, pointCount) => {
  const { top, bottom, left, right } = bounds;
  const points = Array.from({ length: pointCount }).map(
    _ => [getRandomPoint(right, left), getRandomPoint(top, bottom) ]
  )
  return {
    type: SET_POINTS,
    points
  }
}

export const startDefiningPoints = () => ({
  type: START_DEFINING_POINTS
})

export const addDefinedPoint = point => ({
  type: ADD_DEFINED_POINT,
  point
})

export const stopDefiningPoints = () => ({
  type: STOP_DEFINING_POINTS
})

export const setDefaultMap = () => ({
  type: SET_DEFAULT_MAP
})