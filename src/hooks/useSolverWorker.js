import { useState, useEffect } from "react";
import solvers from '../solvers';
import * as solverCommands from '../solvers/commands';


export default (dispatch, algorithm) => {
  const [solver, setSolver] = useState();

  const terminateSolver = () => {
    if (solver) {
      solver.terminate()
    }
  }

  useEffect(() => {
    const worker = new solvers[algorithm]();

    worker.onmessage = ({ data }) => {
      dispatch(data)
    };

    worker.onerror = e => {
      console.log(e.message)
    };

    setSolver(worker);
    return terminateSolver;
  }, [algorithm])

  const start = points => {
    solver.postMessage(solverCommands.startSolving(points))
  }

  return {
    solver,
    start
  }
}
