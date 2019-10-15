import gtmEmit from './emitCustomEvent';
export const SET_VIEWPORT_STATE = 'SET_VIEWPORT_STATE';

export const RESET_EVALUATING_STATE = 'RESET_EVALUATING_STATE';
export const RESET_BEST_PATH_STATE = 'RESET_BEST_PATH_STATE';

export const SET_ALGORITHM = 'SET_ALGORITHM';
export const SET_DELAY = 'SET_DELAY';
export const SET_EVALUATING_DETAIL_LEVEL = 'SET_EVALUATING_DETAIL_LEVEL';
export const SET_SHOW_BEST_PATH = 'SET_SHOW_BEST_PATH';
export const START_SOLVING = 'START_SOLVING';
export const GO_FULL_SPEED = 'GO_FULL_SPEED';
export const STOP_SOLVING = 'STOP_SOLVING';

export const SET_BEST_PATH = 'SET_BEST_PATH';
export const SET_EVALUATING_PATHS = 'SET_EVALUATING_PATHS';

export const START_DEFINING_POINTS = 'START_DEFINING_POINTS';
export const ADD_DEFINED_POINT = 'ADD_DEFINED_POINT';
export const STOP_DEFINING_POINTS = 'STOP_DEFINING_POINTS';
export const SET_POINT_COUNT = 'SET_POINT_COUNT';
export const SET_POINTS = 'SET_POINTS';
export const SET_DEFAULT_MAP = 'SET_DEFAULT_MAP';

export const TOGGLE_SITE_INFO_OPEN = 'TOGGLE_SITE_INFO_OPEN';
export const TOGGLE_ALG_INFO_OPEN = 'TOGGLE_ALG_INFO_OPEN';


const getRandomPoint = (max, min) => (
  Math.random() * (max - min) + min
)


//
// BASIC UI
//
export const toggleSiteInfoOpen = () => (dispatch, getState) => {
  const { siteInfoOpen } = getState();
  if (!siteInfoOpen) {
    gtmEmit({ event: 'open-site-info' })
  }
  dispatch({
    type: TOGGLE_SITE_INFO_OPEN
  })
}

export const toggleAlgInfoOpen = () => (dispatch, getState) => {
  const { algorithm, algInfoOpen } = getState();
  if (!algInfoOpen) {
    gtmEmit({
      event: 'open-algorithm-info',
      algorithm
    })
  }
  dispatch({
    type: TOGGLE_ALG_INFO_OPEN
  })
}


//
// MAP INTERACTION
//
export const setViewportState = viewport => ({
  type: SET_VIEWPORT_STATE,
  viewport
})


//
// SOLVER CONTROLS
//
const resetEvaluatingStateAction = () => ({
  type: RESET_EVALUATING_STATE
})

const resetBestPathStateAction = () => ({
  type: RESET_BEST_PATH_STATE
})

const setAlgorithmAction = (algorithm, defaults) => ({
  type: SET_ALGORITHM,
  algorithm,
  defaults
})

export const startSolvingAction = (points, delay, evaluatingDetailLevel) => ({
  type: START_SOLVING,
  points,
  delay,
  evaluatingDetailLevel,
  fullSpeed: false
})

export const goFullSpeedAction = () => ({
  type: GO_FULL_SPEED
})

export const stopSolvingAction = () => ({
  type: STOP_SOLVING
})

export const setAlgorithm = (algorithm, defaults={}) => dispatch => {
  gtmEmit({
    event: 'select-algorithm',
    algorithm
  })
  dispatch(resetEvaluatingStateAction())
  dispatch(setAlgorithmAction(algorithm, defaults))  
}

export const setDelayAction = delay => ({
  type: SET_DELAY,
  delay
})

export const setDelay = delay => dispatch => {
  gtmEmit({
    event: 'set-delay',
    delay
  })
  dispatch(setDelayAction(delay));
}

export const setEvaluatingDetailLevel = level => ({
  type: SET_EVALUATING_DETAIL_LEVEL,
  level
})

export const setShowBestPath = show => ({
  type: SET_SHOW_BEST_PATH,
  show
})

export const resetSolverState = () => dispatch => {
  gtmEmit({ event: 'reset-solver' })
  dispatch(resetEvaluatingStateAction())
  dispatch(resetBestPathStateAction())
}

export const startSolving = (...args) => (dispatch, getState) => {
  const { algorithm } = getState();
  gtmEmit({
    event: 'start-solving',
    algorithm
  })
  dispatch(resetEvaluatingStateAction())
  dispatch(startSolvingAction(...args))
}

export const goFullSpeed = () => (dispatch, getState) => {
  gtmEmit({
    event: 'go-full-speed'
  })
  dispatch(goFullSpeedAction());
}

export const stopSolving = () => dispatch => {
  gtmEmit({ event: 'stop-solving' })
  dispatch(resetEvaluatingStateAction())
  dispatch(stopSolvingAction())
}



//
// SOLVER ACTIONS
//
export const setEvaluatingPath = (path, cost) => ({
  type: SET_EVALUATING_PATHS,
  paths: [
    path
  ],
  cost
})


export const setEvaluatingPaths = (paths, cost) => ({
  type: SET_EVALUATING_PATHS,
  paths,
  cost
})

export const setBestPath = (path, cost) => ({
  type: SET_BEST_PATH,
  path,
  cost
})


//
// POINT CONTROLS
//

const setDefaultMapAction = () => ({
  type: SET_DEFAULT_MAP
})

const setPointsAction = points => ({
    type: SET_POINTS,
    points
})

const setPointCountAction = count => ({
  type: SET_POINT_COUNT,
  count
})

const startDefiningPointsAction = () => ({
  type: START_DEFINING_POINTS
})

const stopDefiningPointsAction = () => ({
  type: STOP_DEFINING_POINTS
})

export const startDefiningPoints = () => dispatch => {
  gtmEmit({
    event: 'start-defining-points'
  })
  dispatch(resetSolverState())
  dispatch(startDefiningPointsAction())
}

export const addDefinedPoint = point => ({
  type: ADD_DEFINED_POINT,
  point
})

export const stopDefiningPoints = () => (dispatch, getState) => {
  const { pointCount } = getState()
  gtmEmit({
    event: 'stop-defining-points',
    pointCount
  })
  dispatch(stopDefiningPointsAction());
}

export const setPointCount = count => dispatch => {
  gtmEmit({
    event: 'set-point-count',
    pointCount: count
  })
  dispatch(resetSolverState())
  dispatch(setPointCountAction(count))
}

export const randomizePoints = bounds => (dispatch, getState) => {
  const { pointCount } = getState()
  const { top, bottom, left, right } = bounds;
  const points = Array.from({ length: pointCount }).map(
    _ => [getRandomPoint(right, left), getRandomPoint(top, bottom) ]
  )

  gtmEmit({
    event: 'randomize-points',
    pointCount
  })
  dispatch(setPointsAction(points))
}

export const setDefaultMap = (...args) => dispatch => {
  gtmEmit({
    event: 'set-default-map'
  })
  dispatch(resetSolverState())
  dispatch(setDefaultMapAction())
}





