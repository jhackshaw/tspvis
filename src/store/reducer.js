import * as actions from "./actions";
import { UPDATE_POINTS } from '../store/actionTypes';

const usTop12 = [
  [9.1916, 45.4642],
  [9.1743, 45.4609],
  [9.1708, 45.4656],
  [9.1801, 45.4653],
  [9.1856, 45.4575],
  [9.1855, 45.4542],
  [9.1975, 45.4613],
  [9.1897, 45.4636],
  [9.1983, 45.4651],
  [9.1993, 45.4672]
];

const initialViewport = {
  latitude: 45.4642,
  longitude: 9.1916,
  zoom: 12
};

const initialState = {
  points: usTop12.sort(() => Math.random() + 0.5),
  viewport: initialViewport,
  algorithm: "convexHull",
  delay: 100,
  evaluatingDetailLevel: 2,
  maxEvaluatingDetailLevel: 2,
  showBestPath: true,

  bestPath: [],
  bestDisplaySegments: [],
  bestCost: null,

  evaluatingPaths: [],
  evaluatingCost: null,
  running: false,
  fullSpeed: false,
  paused: false,
  startedRunningAt: null,

  pointCount: usTop12.length,
  definingPoints: false,

  siteInfoOpen: false,
  algInfoOpen: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_SITE_INFO_OPEN:
      return {
        ...state,
        siteInfoOpen: !state.siteInfoOpen
      };

    case actions.TOGGLE_ALG_INFO_OPEN:
      return {
        ...state,
        algInfoOpen: !state.algInfoOpen
      };

    case actions.SET_VIEWPORT_STATE:
      return {
        ...state,
        viewport: action.viewport
      };

    case actions.RESET_EVALUATING_STATE:
      return {
        ...state,
        evaluatingPaths: [],
        evaluatingCost: null
      };

    case actions.RESET_BEST_PATH_STATE:
      return {
        ...state,
        bestPath: [],
        bestCost: null
      };

    //
    // SOLVER CONTROLS
    //
    case actions.SET_ALGORITHM:
      return {
        ...state,
        ...action.defaults,
        algorithm: action.algorithm
      };

    case actions.SET_DELAY:
      return {
        ...state,
        delay: action.delay
      };

    case actions.SET_EVALUATING_DETAIL_LEVEL:
      return {
        ...state,
        evaluatingDetailLevel: action.level,
        evaluatingPaths: action.level ? state.evaluatingPaths : [],
        evaluatingCost: action.level ? state.evaluatingCost : null
      };

    case actions.SET_SHOW_BEST_PATH:
      return {
        ...state,
        showBestPath: action.show
      };

    case actions.START_SOLVING:
      return {
        ...state,
        showBestPath: false,
        running: true,
        startedRunningAt: Date.now(),
        pointCount: state.points.length
      };

    case actions.GO_FULL_SPEED:
      return {
        ...state,
        showBestPath: true,
        evaluatingDetailLevel: 0,
        evaluatingPaths: [],
        fullSpeed: true
      };

    case actions.PAUSE:
      return {
        ...state,
        paused: true,
        running: false
      };

    case actions.UNPAUSE:
      return {
        ...state,
        paused: false,
        running: true
      };

    case actions.STOP_SOLVING:
      return {
        ...state,
        points:
          state.bestPath.length > 0
            ? state.bestPath.slice(0, state.bestPath.length - 1)
            : state.points,
        showBestPath: true,
        running: false,
        paused: false,
        fullSpeed: false,
        startedRunningAt: null
      };

    //
    // SOLVER ACTIONS
    //
    case actions.SET_EVALUATING_PATHS:
      return {
        ...state,
        evaluatingPaths: state.evaluatingDetailLevel ? action.paths : [],
        evaluatingCost: state.evaluatingDetailLevel ? action.cost : null
      };

    case actions.SET_BEST_PATH:
      return {
        ...state,
        bestPath: action.path,
        bestCost: action.cost
      };

    //
    // POINT CONTROLS
    //
    case actions.SET_POINT_COUNT:
      return {
        ...state,
        pointCount: action.count
      };

    case actions.SET_POINTS:
      return {
        ...state,
        points: action.points
      };

    case actions.START_DEFINING_POINTS:
      return {
        ...state,
        points: [],
        definingPoints: true,
        pointCount: 0
      };

    case actions.ADD_DEFINED_POINT:
      return {
        ...state,
        points: [...state.points, action.point],
        pointCount: state.pointCount + 1
      };

    case actions.STOP_DEFINING_POINTS:
      return {
        ...state,
        definingPoints: false
      };

    case actions.SET_DEFAULT_MAP:
      return {
        ...state,
        viewport: initialViewport,
        points: usTop12,
        pointCount: usTop12.length
      };

    case UPDATE_POINTS:
      return {
        ...state,
        points: action.payload,
        pointCount: action.payload.length,
      };

    default:
      return state;
  }
};

export default reducer;
