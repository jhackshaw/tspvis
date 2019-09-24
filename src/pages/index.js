import React, { useRef } from "react"
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
  const points = useSelector(selectors.selectPoints);

  const { startWork, stopWork } = useSolverWorker(dispatch);

  const start = () => {
    dispatch(actions.startingWork())
    startWork(algorithm, { points, delay })
  }

  const stop = () => {
    dispatch(actions.stoppingWork())
    stopWork()
  }

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
