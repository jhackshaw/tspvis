import React, { useState, useEffect } from "react"
import { MarkSeries, LineSeries } from 'react-vis';
import Layout from "../components/Layout"
import Plot from '../components/Plot';
import Menu from "../components/Menu";


function getRandomInt(min=0, max=100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomPoints(count) {
  return Array.from({ length: count }).map(_ => ({
    x: getRandomInt(),
    y: getRandomInt()
  }))
}


const IndexPage = () => {
  const [data, setData] = useState(randomPoints(10));

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
      <Menu />
      <Plot>
        <MarkSeries data={data} />
        {/* <LineSeries data={data} /> */}
      </Plot>
    </Layout>
  )
}
  


export default IndexPage
