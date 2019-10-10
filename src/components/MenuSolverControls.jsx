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
         IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRedo, faQuestion } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import MenuSection from './MenuSection';
import MenuItem from './MenuItem';
import useAlgorithmInfo from '../hooks/useAlgorithmInfo';




const MenuSolverControls = ({ onStart, onStop }) => {
  const dispatch = useDispatch()
  const algorithms = useAlgorithmInfo();
  const selectedAlgorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const evaluatingDetailLevel = useSelector(selectors.selectEvaluatingDetailLevel);
  const maxEvaluatingDetailLevel = useSelector(selectors.selectMaxEvaluatingDetailLevel);
  const showBestPath = useSelector(selectors.selectShowBestPath);
  const running = useSelector(selectors.selectRunning);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const onAlgorithmChange = event => {
    dispatch(actions.setAlgorithm(event.target.value))
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
            <Select value={selectedAlgorithm}
                    onChange={onAlgorithmChange}
                    disabled={running || definingPoints}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    >
              <ListSubheader>Exhaustive</ListSubheader>
              { algorithms.filter(alg => alg.class === "exhaustive")
                          .map(alg => (
                <SelectItem value={alg.solverKey}
                            key={alg.solverKey}
                            >
                  { alg.friendlyName }
                </SelectItem>
              ))}
              <ListSubheader>Heuristic</ListSubheader>
              { algorithms.filter(alg => alg.class === "heuristic")
                          .map(alg => (
                <SelectItem value={alg.solverKey}
                            key={alg.solverKey}
                            >
                  { alg.friendlyName }
                </SelectItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={1}>
            <Typography align="right" color="textSecondary">
              <IconButton edge="end" onClick={onShowAlgInfo}>
                <FontAwesomeIcon icon={faQuestion} size="xs" />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </MenuItem>

      <MenuItem title="Controls">
        <ButtonGroup fullWidth variant="outlined" color="secondary" size="large">
          <Button onClick={onStart} disabled={running || definingPoints} classes={{root: "gtm-start-solving", label: "gtm-start-solving"}}>
            <FontAwesomeIcon icon={faPlay} width="0" className="gtm-start-solving" />
          </Button>
          <Button onClick={onStop} disabled={!running || definingPoints}  classes={{root: "gtm-stop-solving", label: "gtm-stop-solving"}}>
            <FontAwesomeIcon icon={faStop} width="0" className="gtm-stop-solving" />
          </Button>
          <Button onClick={onReset} disabled={running || definingPoints}  classes={{root: "gtm-reset-paths", label: "gtm-reset-paths"}}>
            <FontAwesomeIcon icon={faRedo} width="0" className="gtm-reset-paths" />
          </Button>
        </ButtonGroup>
      </MenuItem>

      <MenuItem title="Delay">
        <Slider
          value={delay}
          onChange={onDelayChange}
          step={100}
          min={0}
          max={5000}
          valueLabelDisplay="auto"
          color="secondary"
          disabled={definingPoints}
          />
      </MenuItem>

      <MenuItem row>
        <Grid item xs={8}>
          <Typography variant="button" color="textSecondary" component="div">
            Best Path
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Switch
            checked={showBestPath}
            onChange={onShowBestPathChange}
            color="secondary"
            disabled={definingPoints}
            id="show-best-path"
            />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="button" color="textSecondary" component="div">
            Intermediate Paths
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Switch
            checked={evaluatingDetailLevel > 0}
            onChange={onEvaluatingDetailLevelChange(1, 0)}
            color="secondary"
            disabled={definingPoints}
            id="show-evaluating-paths"
            />
        </Grid>

        { maxEvaluatingDetailLevel > 1 &&
          <>
          <Grid item xs={8}>
            <Typography variant="button" color="textSecondary" component="div">
              All Steps
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Switch
              checked={evaluatingDetailLevel > 1}
              onChange={onEvaluatingDetailLevelChange(2, 1)}
              color="secondary"
              disabled={definingPoints}
              id="show-evaluating-steps"
              />
          </Grid>
          </>
        }
      </MenuItem>

    </MenuSection>
  )
}

export default MenuSolverControls;
