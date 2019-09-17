import React, { useRef, useReducer } from "react"
import Layout from "../components/Layout"
import MapPlot from '../components/MapPlot';
import Menu from "../components/Menu";

import useSolverWorker from '../hooks/useSolverWorker';
import StoreProvider from '../store/provider';
import reducer, { initialState } from '../store/reducer';



const IndexPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef(null)

  const { points, algorithm } = state;


  const { start } = useSolverWorker(dispatch, algorithm, {});
  

  return (
    <StoreProvider.Provider value={{dispatch, state}}>
      <Layout>
        <Menu onStart={() => start(points)} />
        <MapPlot ref={mapRef}
                />
      </Layout>
    </StoreProvider.Provider>
  )
}
  


export default IndexPage
