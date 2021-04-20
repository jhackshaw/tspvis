import * as actions from "./actions";

const usTop12 = [
  [-73.85835427500902, 40.56507951957753],
  [-77.54976052500858, 38.772432514145194],
  [-78.91206521250587, 42.66742768420476],
  [-70.95796365000933, 42.66742768420476],
  [-80.27436990000314, 26.176558881220437],
  [-84.4052292750001, 34.108547937473524],
  [-82.55952615000031, 28.24770207922181],
  [-84.66890115000008, 30.089457425014395],
  [-89.89839333750201, 29.746655988569763],
  [-96.62202615000125, 32.640688397241334],
  [-95.3036667750014, 29.287759374472813],
  [-97.76460427500368, 30.089457425014395],
  [-101.89546365000065, 34.97727964358472],
  [-112.22261208749687, 33.23080293029681],
  [-111.38765114999953, 35.01327961148759],
  [-115.56245583750162, 36.08588188690158],
  [-118.63862771249869, 33.999320468363095],
  [-117.2323777124963, 32.97311239658548],
  [-123.12104958749816, 38.222145234071036],
  [-124.26362771250061, 41.13019627380825],
  [-120.13276833749595, 39.72528830651809],
  [-111.82710427499693, 41.13019627380825],
  [-105.2353073999977, 39.961475963760066],
  [-87.43745583749975, 41.69048709677229],
  [-93.1064011499991, 45.29144400095841],
  [-90.20601052499944, 38.772432514145194],
  [-117.27632302500142, 47.50341272285311],
  [-122.72554177499823, 45.8757982618686],
  [-122.81343240000076, 48.152468818056875]
];

const initialViewport = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4
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

export default (state = initialState, action) => {
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

    default:
      return state;
  }
};
