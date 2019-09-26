import * as actions from './actions';

const usTop12 = [
  [-74.0059413, 40.7127837],
  [-112.0740373, 33.4483771],
  [-75.1652215, 39.9525839],
  [-121.8863286, 37.3382082],
  [-86.158068, 39.768403],
  [-87.6297982, 41.8781136],
  [-118.2436849, 34.0522342],
  [-96.7898034, 46.8771863],
  [-95.3698028, 29.7604267],
  [-96.7969879, 32.7766642],
  [-98.4936282, 29.4241219],
  [-97.7430608, 30.267153],
  [-122.6764816, 45.5230622],
  [-117.1610838, 32.715738]
]

const initialViewport = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4
}


const initialState = {
  points: usTop12.sort(() => Math.random() + 0.5),
  viewport: initialViewport,
  algorithm: 'shortestPath',
  bestPaths: [],
  bestCost: null,
  intermediatePaths: [],
  evaluatingCost: null,
  delay: 500,
  evaluatingDetailLevel: 1,
  running: false,

  pointCount: usTop12.length,
  definingPoints: false
}


export default (state=initialState, action) => {
  // console.log(initialState.points)
  switch (action.type) {
    case actions.SET_VIEWPORT_STATE:
      return {
        ...state,
        viewport: action.viewport
      }
    
    case actions.SET_ALGORITHM:
      return {
        ...state,
        algorithm: action.algorithm,
        bestPaths: [],
        bestCost: null,
        intermediatePaths: []
      }

    case actions.SET_BEST_PATHS:
      return {
        ...state,
        bestPaths: action.paths,
        bestCost: action.cost
      }

    case actions.SET_DELAY:
      return {
        ...state,
        delay: action.delay
      }
    
    case actions.SET_EVALUATING_DETAIL_LEVEL:
      return {
        ...state,
        evaluatingDetailLevel: action.level,
        intermediatePaths: action.level ? state.intermediatePaths : [],
        evaluatingCost: action.level ? state.evaluatingCost : null
      }

    case actions.SET_INTERMEDIATE_PATHS:
      return {
        ...state,
        intermediatePaths: state.evaluatingDetailLevel ? action.paths : [],
        evaluatingCost: state.evaluatingDetailLevel ? action.cost : null
      }

    case actions.START_SOLVING:
      return {
        ...state,
        running: true,
        bestPaths: [],
        pointCount: state.points.length
      }
    
    case actions.STOP_SOLVING:
      return {
        ...state,
        running: false,
        intermediatePaths: [],
        evaluatingCost: null
      }

    case actions.RESET:
      return {
        ...state,
        bestPaths: [],
        bestCost: null,
        intermediatePaths: [],
        evaluatingCost: null
      }

    case actions.SET_POINT_COUNT:
      return {
        ...state,
        pointCount: action.count
      }

    case actions.SET_POINTS:
      return {
        ...state,
        bestPaths: [],
        bestCost: null,
        intermediatePaths: [],
        evaluatingCost: null,
        points: action.points
      }

    case actions.START_DEFINING_POINTS:
      return {
        ...state,
        points: [],
        bestPaths: [],
        bestCost: null,
        intermediatePaths: [],
        evaluatingCost: null,
        definingPoints: true,
        pointCount: 0
      }
    
    case actions.ADD_DEFINED_POINT:
      return {
        ...state,
        points: [...state.points, action.point],
        pointCount: state.pointCount + 1
      }

    case actions.STOP_DEFINING_POINTS:
      return {
        ...state,
        definingPoints: false
      }
    
    case actions.SET_DEFAULT_MAP:
      return {
        ...state,
        viewport: initialViewport,
        points: usTop12,
        bestPaths: [],
        bestCost: null,
        intermediatePaths: [],
        evaluatingCost: null,
        pointCount: usTop12.length
      }

    default:
      return state
  }
}
