import * as actions from './actions';

const usTop12 = [
  [-74.0059413, 40.7127837],
  [-118.2436849, 34.0522342],
  [-87.6297982, 41.8781136],
  [-95.3698028, 29.7604267],
  [-75.1652215, 39.9525839],
  [-112.0740373, 33.4483771],
  [-98.4936282, 29.4241219],
  [-117.1610838, 32.715738],
  [-96.7969879, 32.7766642],
  [-121.8863286, 37.3382082],
  [-97.7430608, 30.267153],
  [-86.158068, 39.768403],
  [-122.6764816, 45.5230622]
]

const initialViewport = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 3
}


const initialState = {
  points: usTop12,
  viewport: initialViewport,
  algorithm: 'random',
  bestPath: [],
  delay: 500,
  running: false
}


export default (state=initialState, action) => {
  switch (action.type) {
    case actions.SET_VIEWPORT_STATE:
      return {
        ...state,
        viewport: action.viewport
      }

    case actions.SET_BEST_PATH:
      return {
        ...state,
        bestPath: action.path
      }

    case actions.SET_DELAY:
      return {
        ...state,
        delay: action.delay
      }

    case actions.STARTING_WORK:
      return {
        ...state,
        running: true
      }
    
    case actions.STOPPING_WORK:
      return {
        ...state,
        running: false
      }

    default:
      return state
  }
}