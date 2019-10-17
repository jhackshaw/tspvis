/* eslint-disable no-restricted-globals */
import makeSolver from '../makeSolver';
import { pathCost, distance } from '../cost';


const arbitraryInsertion = async points => {
  // from the starting point
  const path = [points.shift()];

  // first go to the nearest point 
  points.sort((a, b) => (
    distance(path[0], b) -
    distance(path[0], a)
  ));
  path.push(points.pop());

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost: pathCost(path)
  }))

  // randomly sort points - this is the order they will be added
  // to the path
  points.sort(() => Math.random() - 0.5);

  while (points.length > 0) {
    // get the next point to add
    const nextPoint = points.pop();

    // find the point p in the path that minimizes the distance
    // (p => nextPoint) + (nextPoint -> p+1)
    let [bestCost, bestIdx] = [Infinity, null];
    for (let i=1; i<path.length; i++) {
      const insertionCost = pathCost([
        path[i-1], nextPoint, path[i]
      ])
      if (insertionCost < bestCost) {
        [bestCost, bestIdx] = [insertionCost, i];
      }
    }

    // insert that point where it's cheapest
    path.splice(bestIdx, 0, nextPoint);


    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost: pathCost(path)
    }))

    await self.sleep();
  }

  // return to start after visiting all other points
  path.push(path[0]);
  const cost = pathCost(path);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost
  }))
  await self.sleep();

  self.setBestPath(path, cost)

}

makeSolver(arbitraryInsertion);
