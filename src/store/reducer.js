import * as actions from './actions';

const usTop12 = [
  {position: [-74.0059413, 40.7127837]},
  {position: [-118.2436849, 34.0522342]},
  {position: [-87.6297982, 41.8781136]},
  {position: [-95.3698028, 29.7604267]},
  {position: [-75.1652215, 39.9525839]},
  {position: [-112.0740373, 33.4483771]},
  {position: [-98.4936282, 29.4241219]},
  {position: [-117.1610838, 32.715738]},
  {position: [-96.7969879, 32.7766642]},
  {position: [-121.8863286, 37.3382082]},
  {position: [-97.7430608, 30.267153]},
  {position: [-86.158068, 39.768403]},
  {position: [-122.6764816, 45.5230622]}
]

const initialViewport = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 3
}


export const initialState = {
  points: usTop12,
  viewport: initialViewport,
  algorithm: 'random',
  bestPath: {
    path: usTop12.map(p => p.position)
  }
}


export default (state, action) => {
  switch (action.type) {
    case actions.SET_VIEWPORT_STATE:
      return {
        ...state,
        viewport: action.viewport
      }

    case actions.SET_BEST_PATH:
      return {
        ...state,
        bestPath: {
          path: action.path
        }
      }

    default:
      throw new Error(`invalid action ${action.type}`)
  }
}