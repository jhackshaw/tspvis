import React from 'react';

import RandomModal from './random';
import ShortestPathModal from './shortestPath';
import DfsModal from './dfs';


export default props => {

  return (
    <>
      <RandomModal />
      <DfsModal />
      <ShortestPathModal />
    </>
  )
}
