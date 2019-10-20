import React from 'react';
import { ButtonGroup,
         Button,
         Slider, 
         Select,
         ListSubheader,
         MenuItem as SelectItem,
         Typography,
         Switch,
         Grid,
         IconButton, 
         Tooltip} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRedo, faQuestion, faFastForward } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import MenuSection from './MenuSection';
import MenuItem from './MenuItem';
import useAlgorithmInfo from '../hooks/useAlgorithmInfo';




const MenuSolverControls = ({ onStart, onFullSpeed, onStop }) => {
  const dispatch = useDispatch()
  const algorithms = useAlgorithmInfo();
  const selectedAlgorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const evaluatingDetailLevel = useSelector(selectors.selectEvaluatingDetailLevel);
  const maxEvaluatingDetailLevel = useSelector(selectors.selectMaxEvaluatingDetailLevel);
  const showBestPath = useSelector(selectors.selectShowBestPath);
  const running = useSelector(selectors.selectRunning);
  const fullSpeed = useSelector(selectors.selectFullSpeed);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const onAlgorithmChange = event => {
    const solverKey = event.target.value;
    const { defaults } = algorithms.find(alg => alg.solverKey === solverKey);
    dispatch(actions.setAlgorithm(solverKey, defaults))
  }

  const onDelayChange = (_, newDelay) => {
    dispatch(actions.setDelay(newDelay))
  }

  const onEvaluatingDetailLevelChange = (onLevel, offLevel) => event => {
    const level = event.target.checked ? onLevel : offLevel;
    dispatch(actions.setEvaluatingDetailLevel(level))
  }

  const onShowBestPathChange = event => {
    dispatch(actions.setShowBestPath(event.target.checked))
  }

  const onReset = () => {
    dispatch(actions.resetSolverState())
  }

  const onShowAlgInfo = () => {
    dispatch(actions.toggleAlgInfoOpen());
  }

  return (
    <MenuSection>
      <MenuItem title="Algorithm">
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Tooltip title="Select an algorithm">
              <Select value={selectedAlgorithm}
                      onChange={onAlgorithmChange}
                      disabled={running || definingPoints}
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      >
                <ListSubheader>Heuristic Construction</ListSubheader>
                { algorithms.filter(alg => alg.type === "heuristic-construction")
                            .map(alg => (
                  <SelectItem value={alg.solverKey}
                              key={alg.solverKey}
                              >
                    { alg.friendlyName }
                  </SelectItem>
                ))}
                <ListSubheader>Heuristic Improvement</ListSubheader>
                { algorithms.filter(alg => alg.type === "heuristic-improvement")
                            .map(alg => (
                  <SelectItem value={alg.solverKey}
                              key={alg.solverKey}
                              >
                    { alg.friendlyName }
                  </SelectItem>
                ))}
                <ListSubheader>Exhaustive</ListSubheader>
                { algorithms.filter(alg => alg.type === "exhaustive")
                            .map(alg => (
                  <SelectItem value={alg.solverKey}
                              key={alg.solverKey}
                              >
                    { alg.friendlyName }
                  </SelectItem>
                ))}
              </Select>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Typography align="right" color="textSecondary">
              <Tooltip title={`Information about selected algorithm`}>
                <IconButton edge="end" onClick={onShowAlgInfo}>
                  <FontAwesomeIcon icon={faQuestion} size="xs" />
                </IconButton>
              </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </MenuItem>

      <MenuItem title="Controls">
        <ButtonGroup fullWidth variant="outlined" color="secondary" size="large">
          <Tooltip title={running ? 'Go full speed (cannot undo)' : 'Start solving'}>
            <Button onClick={running ? onFullSpeed : onStart} disabled={definingPoints || fullSpeed}>
              <FontAwesomeIcon icon={running ? faFastForward : faPlay} width="0" />
            </Button>
          </Tooltip>
          <Tooltip title="Stop solving">
            <Button onClick={onStop} disabled={!running || definingPoints}>
              <FontAwesomeIcon icon={faStop} width="0" />
            </Button>
          </Tooltip>
          <Tooltip title="Rest solver state">
            <Button onClick={onReset} disabled={running || definingPoints}>
              <FontAwesomeIcon icon={faRedo} width="0" />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </MenuItem>

      <MenuItem title="Delay">
        <Tooltip title="Change delay between solver steps">
          <Slider
            value={delay}
            onChange={onDelayChange}
            step={100}
            min={0}
            max={5000}
            valueLabelDisplay="auto"
            color="secondary"
            disabled={definingPoints || fullSpeed}
            />
        </Tooltip>
      </MenuItem>

      <MenuItem row>
        <Grid item xs={10}>
          <Typography variant="button" color="textSecondary" component="div">
            Best Path
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Plot the current best path">
            <Switch
              checked={showBestPath}
              onChange={onShowBestPathChange}
              color="secondary"
              disabled={definingPoints || fullSpeed}
              id="show-best-path"
              />
          </Tooltip>
        </Grid>

        <Grid item xs={10}>
          <Typography variant="button" color="textSecondary" component="div">
            Intermediate Paths
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Show the paths being evaluated by the algorithm">
            <Switch
              checked={evaluatingDetailLevel > 0}
              onChange={onEvaluatingDetailLevelChange(1, 0)}
              color="secondary"
              disabled={definingPoints || fullSpeed}
              id="show-evaluating-paths"
              />
          </Tooltip>
        </Grid>

        { maxEvaluatingDetailLevel > 1 &&
          <>
          <Grid item xs={10}>
            <Typography variant="button" color="textSecondary" component="div">
              All Steps
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Show more detail for the evaluated paths">
              <Switch
                checked={evaluatingDetailLevel > 1}
                onChange={onEvaluatingDetailLevelChange(2, 1)}
                color="secondary"
                disabled={definingPoints || fullSpeed}
                id="show-evaluating-steps"
                />
            </Tooltip>
          </Grid>
          </>
        }
      </MenuItem>

    </MenuSection>
  )
}

export default MenuSolverControls;
