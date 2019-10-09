import React from 'react';
import { Typography } from '@material-ui/core';
import AlgModal from './AlgorithmModal';


const RandomAlgModal = props => {

  return (
    <AlgModal shortName="random">
       <Typography gutterBottom variant="h5">Random Solver</Typography>
          <Typography gutterBottom variant="body1">
          The random solver is strictly used for benchmarking, demonstrating, etc. It is not really a realistic approach to solving the traveling salesman problem.
          </Typography>

          <Typography gutterBottom variant="body1">
          The random solver is technically exhaustive because there is no real endpoint. It continually chooses a random path and compares it to the current best path. Theoretically, if it ran forever, it would encounter every possible path and thus have the best solution.
          </Typography>

          <Typography gutterBottom variant="body1" component="div">
            Execution steps
            <ol>
              <li>Randomly sort the list of points creating a random path</li>
              <li>Determine if the new path is cheaper than the current best path</li>
              <li>If so, set the best path to the current path</li>
              <li>Repeat forever</li>
            </ol>
          </Typography>
    </AlgModal>
  )
}

export default RandomAlgModal;
