import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import Layout from "../components/Layout"
import MapPlot from '../components/MapPlot';
import Menu from "../components/Menu";

import useSolverWorker from '../hooks/useSolverWorker';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';


const IndexPage = () => {
  const mapRef = useRef(null)
  const dispatch = useDispatch();
  const algorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const showIntermediatePaths = useSelector(selectors.selectShowIntermediatePaths);
  const points = useSelector(selectors.selectPoints);

  const solver = useSolverWorker(dispatch, algorithm);

  const start = () => {
    const action = actions.startSolving(points, delay, showIntermediatePaths);
    dispatch(action)
    solver.postMessage(action)
  }

  const stop = () => {
    dispatch(actions.stopSolving())
    solver.terminate();
  }

  useEffect(() => {
    solver.postMessage(actions.setDelay(delay))
  }, [delay, solver])

  useEffect(() => {
    solver.postMessage(actions.setShowIntermediatePaths(showIntermediatePaths))
  }, [showIntermediatePaths, solver])

  return (
    <Layout>
      <Menu onStart={start}
            onStop={stop} />
      <MapPlot ref={mapRef}
              />
    </Layout>
  )
}

export default IndexPage
