import React from 'react';
import { Typography } from '@material-ui/core';
import AlgModal from './AlgorithmModal';


const DfsModal = props => {

  return (
    <AlgModal shortName="dfs">
      <Typography gutterBottom variant="h5">Depth First Search Solver</Typography>
        <Typography gutterBottom variant="body1">
          The depth first search solver can be equated to a brute force solver. It will recursively evaluate every possible solution to the problem, thereby brute forcing the best possible solution. The cost associated with evaluating these solutions grows exponentially with the number of points in the set.  
        </Typography>

        <Typography gutterBottom variant="body1">
          It is exhaustive because every possible solution is evaluated.  
        </Typography>

        <Typography gutterBottom variant="body1" component="div">
          Execution steps
          <ol>
            <li>From the starting point</li>
            <li>For each other point in the remaining points to be visited</li>
            <li>Subtract the starting point from the remaining points</li>
            <li>Visit every other point</li>
            <li>If the current solution is a complete path</li>
            <li>Return the path cost</li>
          </ol>
        </Typography>
    </AlgModal>
  )
}

export default DfsModal;
