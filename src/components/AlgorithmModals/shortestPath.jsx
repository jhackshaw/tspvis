import React from 'react';
import { Typography } from '@material-ui/core';
import AlgModal from './AlgorithmModal';


const ShortestPathAlgModal = props => {

  return (
    <AlgModal shortName="shortestPath">
        <Typography gutterBottom variant="h5">Shortest Path Solver</Typography>
          <Typography gutterBottom variant="body1">
            The shortest path solver is probably the most naive of the heuristic solvers. It is referred to as a greedy algorithm in the sense that it chooses the best possible option from the current state. In this case, the best option is the closest point to the current endpoint.
          </Typography>

          <Typography gutterBottom variant="body1">
            It is a heuristic because it does not yield the best possible route, but in many cases it does give a good approximation. There are plenty of approximations (including the default for this site), where the shortest path is more expensive than the optimal route. It is, however, incredibly fast relative to the exhaustive algorithms.  
          </Typography>

          <Typography gutterBottom variant="body1" component="div">
            Execution steps
            <ol>
              <li>Set the set of available points to all of the points in the set</li>
              <li>Choose the starting point as the current path</li>
              <li>While there are points remaining</li>
              <li>Subtract the current point from the set of available points</li>
              <li>Choose the closest available point to the current point</li>
              <li>Append it to the path and set it as the current point</li>
            </ol>
          </Typography>
    </AlgModal>
  )
}

export default ShortestPathAlgModal;
