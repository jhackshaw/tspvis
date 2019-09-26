import React from 'react';
import { ButtonGroup,
         Button, 
         Slider, 
         Select,
         ListSubheader,
         MenuItem as SelectItem,
         Typography,
         Switch,
         Grid} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRedo } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import MenuSection from './MenuSection';
import MenuItem from './MenuItem';



const MenuSolverControls = ({ onStart, onStop }) => {
  const dispatch = useDispatch()
  const algorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const evaluatingDetailLevel = useSelector(selectors.selectEvaluatingDetailLevel);
  const running = useSelector(selectors.selectRunning);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const onAlgorithmChange = event => {
    dispatch(actions.setAlgorthim(event.target.value))
  }

  const onDelayChange = (_, newDelay) => {
    dispatch(actions.setDelay(newDelay))
  }

  const onEvaluatingDetailLevelChange = (onLevel, offLevel) => event => {
    const level = event.target.checked ? onLevel : offLevel;
    dispatch(actions.setEvaluatingDetailLevel(level))
  }

  const onReset = () => {
    dispatch(actions.reset())
  }

  return (
    <MenuSection>
      <MenuItem title="Algorithm">
        <Select value={algorithm}
                onChange={onAlgorithmChange}
                disabled={running || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
                >
          <ListSubheader>Exhaustive</ListSubheader>
          <SelectItem value="random">Random</SelectItem>
          <SelectItem value="dfs">Depth First Search</SelectItem>
          <ListSubheader>Heuristic</ListSubheader>
          <SelectItem value="shortestPath">Shortest Path</SelectItem>
          <SelectItem value="twoOpt">2 Opt</SelectItem>
        </Select>
      </MenuItem>

      <MenuItem title="Controls">
        <ButtonGroup fullWidth variant="outlined" color="secondary" size="large">
          <Button onClick={onStart} disabled={running || definingPoints}>
            <FontAwesomeIcon icon={faPlay} width="0"/>
          </Button>
          <Button onClick={onStop} disabled={!running || definingPoints}>
            <FontAwesomeIcon icon={faStop} width="0" />
          </Button>
          <Button onClick={onReset} disabled={running || definingPoints}>
            <FontAwesomeIcon icon={faRedo} width="0" />
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

      <MenuItem row title="Show Intermediate Steps">
        <Grid item xs={6}>
          <Typography variant="button" color="textSecondary" component="div">
            Full Paths
          </Typography>
          <Switch
            checked={evaluatingDetailLevel > 0}
            onChange={onEvaluatingDetailLevelChange(1, 0)}
            color="secondary"
            disabled={definingPoints}
            />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="button" color="textSecondary" component="div">
            All Steps
          </Typography>
          <Switch
            checked={evaluatingDetailLevel > 1}
            onChange={onEvaluatingDetailLevelChange(2, 1)}
            color="secondary"
            disabled={definingPoints}
            />
        </Grid>
      </MenuItem>
    </MenuSection>
  )
}

export default MenuSolverControls;
