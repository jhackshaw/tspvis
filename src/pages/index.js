import React, { useRef, useEffect, useCallback, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  AlgorithmModals,
  IntroductionModal,
  Layout,
  MapPlot,
  Menu,
  SEO,
  ThemeToggle
} from "../components"
import { useSolverWorker, useAlgorithmInfo } from "../hooks"
import * as selectors from "../store/selectors"
import * as actions from "../store/actions"

const IndexPage = () => {
  const mapRef = useRef(null)
  const dispatch = useDispatch()
  const [algTitle, setAlgTitle] = useState("")

  const algorithm = useSelector(selectors.selectAlgorithm)
  const algorithmInfo = useAlgorithmInfo()
  const delay = useSelector(selectors.selectDelay)
  const evaluatingDetailLevel = useSelector(
    selectors.selectEvaluatingDetailLevel
  )
  const points = useSelector(selectors.selectPoints)
  const pointCount = useSelector(selectors.selectPointCount)
  const definingPoints = useSelector(selectors.selectDefiningPoints)

  const solver = useSolverWorker(dispatch, algorithm)

  const onRandomizePoints = useCallback(() => {
    if (!definingPoints) {
      const bounds = mapRef.current.getBounds()
      dispatch(actions.randomizePoints(bounds, pointCount))
    }
  }, [mapRef, dispatch, pointCount, definingPoints])

  const start = useCallback(() => {
    dispatch(actions.startSolving(points, delay, evaluatingDetailLevel))
    solver.postMessage(
      actions.startSolvingAction(points, delay, evaluatingDetailLevel)
    )
  }, [solver, dispatch, delay, points, evaluatingDetailLevel])

  const fullSpeed = useCallback(() => {
    dispatch(actions.goFullSpeed())
    solver.postMessage(actions.goFullSpeed())
  }, [solver, dispatch])

  const stop = useCallback(() => {
    dispatch(actions.stopSolving())
    solver.terminate()
  }, [solver, dispatch])

  useEffect(() => {
    solver.postMessage(actions.setDelay(delay))
  }, [delay, solver])

  useEffect(() => {
    solver.postMessage(actions.setEvaluatingDetailLevel(evaluatingDetailLevel))
  }, [evaluatingDetailLevel, solver])

  useEffect(() => {
    const alg = algorithmInfo.find(alg => alg.solverKey === algorithm)
    setAlgTitle(alg.friendlyName)
  }, [algorithm, algorithmInfo])

  return (
    <Layout>
      <SEO subtitle={algTitle} />
      <IntroductionModal />
      <AlgorithmModals />
      <Menu
        onStart={start}
        onFullSpeed={fullSpeed}
        onStop={stop}
        onRandomizePoints={onRandomizePoints}
      />
      <MapPlot ref={mapRef}></MapPlot>
    </Layout>
  )
}

export default IndexPage
