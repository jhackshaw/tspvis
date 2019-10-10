/* eslint-disable no-restricted-globals */
import makeSolver from '../makeSolver';
import { pathCost } from '../cost';



const random = async points => {
  let best = Infinity;

  while (true) {
    const start = points.shift();
    const path = points.sort(() => Math.random() - 0.5);
    path.unshift(start);
    path.push(start);
    const cost = pathCost(path);

    if (cost < best) {
      best = cost;
      self.setBestPath(path, cost);
    }

    self.setEvaluatingPaths(() => ({ 
      paths: [{ path }], 
      cost 
    }));
    
    path.pop();
    await self.sleep();
  }
}

makeSolver(random);
