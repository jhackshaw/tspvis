/* eslint-disable no-restricted-globals */
import * as commands from './commands';
import * as actions from '../store/actions';


self.onmessage = function({ data }) {
  console.log(data)
  switch (data.cmd) {
    case commands.SOLVE:
      startSolving(data.points)
      break
  
    default:
      break;
  }
}

const startSolving = points => {
  let x = 0;
  while (x < 1000) {
    self.postMessage(
      actions.setBestPath(
        points.sort(
          () => Math.random() - 0.5
        ).map(
          p => p.position
        )
      )
    )
    x = x+1;
  }
}
