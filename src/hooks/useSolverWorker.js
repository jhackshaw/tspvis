import { useState } from "react";
import solvers from '../solvers';


export default onSolverMessage => {
  const [solver, setSolver] = useState();

  const stopWork = () => {
    if (solver) {
      solver.terminate();
    }
  }

  const startWork = (algorithm, data) => {
    stopWork();
    const worker = new solvers[algorithm]();
    worker.onmessage = ({data}) => onSolverMessage(data);
    worker.onerror = console.error;

    setSolver(worker);
    worker.postMessage(data)


    setTimeout(() => {
      worker.postMessage({ test: 'asdf' })
    }, 5000)
  }

  return {
    startWork,
    stopWork
  }
}
