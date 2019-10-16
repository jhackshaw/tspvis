import React from 'react';
import Helmet from 'react-helmet';


const SEO = ({ subtitle }) => {

  return (

    <Helmet title={`${subtitle} | Traveling Salesman Problem`}>
      <meta name="description" content="Interactive solver for the traveling salesman problem to visualize different algorithms. Includes various Heuristic and Exhaustive algorithms." />
    </Helmet>
  )
}

export default SEO;
