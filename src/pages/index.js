import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/Layout"
import MapPlot from '../components/MapPlot';
import Menu from "../components/Menu";


const worldBounds = [
  [-180, 180], [-90, 90]
]

const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min
}


const randomPoints = (ne, sw, count=12) => {
  const { lat: upperLat, lon: upperLon } = ne;
  const { lat: lowerLat, lon: lowerLon } = sw;

  return Array.from({ length: count }).map(_ => ({
    coordinates: [
      getRandomFloat(lowerLon, upperLon),
      getRandomFloat(upperLat, lowerLat)
    ]
  }))
}


const IndexPage = () => {
  const [points, setPoints] = useState(randomPoints(...worldBounds));
  const mapRef = useRef(null)

  const randomizePoints = () => {
    const { _ne, _sw } = mapRef.current.getBounds();
    setPoints(randomPoints(_ne, _sw))
  }

  useEffect(() => {
    const to = setInterval(() => {
      setData(randomPoints(10))
    }, 1000);
    return () => {
      clearInterval(to)
    }
  })

  return (
    <Layout>
      <Menu randomizePoints={randomizePoints} />
      <MapPlot ref={mapRef}
               points={points} />
               
    </Layout>
  )
}
  


export default IndexPage
