import { useState, useEffect } from "react";
import solvers from "../solvers";

export const useSolverWorker = (onSolverMessage, algorithm) => {
  const [solver, setSolver] = useState();

  const resetSolver = () => {
    if (solver) {
      solver.terminate();
    }
    const worker = new solvers[algorithm]();
    worker.onmessage = ({ data }) => onSolverMessage(data);
    worker.onerror = console.error;
    setSolver(worker);
  };

  useEffect(resetSolver, [algorithm, onSolverMessage]);

  const postMessage = data => {
    if (solver) {
      solver.postMessage(data);
    }
  };

  return {
    postMessage,
    terminate: resetSolver
  };
};
