export const SOLVE = 'SOLVE';
export const STOP = 'STOP';


export const startSolving = points => ({
  cmd: SOLVE,
  points
})

export const stopSolving = () => ({
  cmd: STOP
})