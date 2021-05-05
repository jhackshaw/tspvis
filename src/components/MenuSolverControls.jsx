import React from "react";
import {
  ButtonGroup,
  Button,
  Slider,
  Select,
  ListSubheader,
  MenuItem as SelectItem,
  Typography,
  Switch,
  Grid,
  IconButton
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faRedo,
  faQuestion,
  faFastForward,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { useAlgorithmInfo } from "../hooks";
import * as actions from "../store/actions";
import * as selectors from "../store/selectors";

export const MenuSolverControls = ({
  onStart,
  onPause,
  onUnPause,
  onFullSpeed,
  onStop
}) => {
  const dispatch = useDispatch();
  const algorithms = useAlgorithmInfo();
  const selectedAlgorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const evaluatingDetailLevel = useSelector(
    selectors.selectEvaluatingDetailLevel
  );
  const maxEvaluatingDetailLevel = useSelector(
    selectors.selectMaxEvaluatingDetailLevel
  );
  const showBestPath = useSelector(selectors.selectShowBestPath);
  const running = useSelector(selectors.selectRunning);
  const fullSpeed = useSelector(selectors.selectFullSpeed);
  const paused = useSelector(selectors.selectPaused);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const onAlgorithmChange = event => {
    event.persist();
    onStop();
    const solverKey = event.target.value;
    const { defaults } = algorithms.find(alg => alg.solverKey === solverKey);
    dispatch(actions.setAlgorithm(solverKey, defaults));
  };

  const onDelayChange = (_, newDelay) => {
    dispatch(actions.setDelay(newDelay));
  };

  const onEvaluatingDetailLevelChange = (onLevel, offLevel) => event => {
    const level = event.target.checked ? onLevel : offLevel;
    dispatch(actions.setEvaluatingDetailLevel(level));
  };

  const onShowBestPathChange = event => {
    dispatch(actions.setShowBestPath(event.target.checked));
  };

  const onReset = () => {
    onStop();
    dispatch(actions.resetSolverState());
  };

  const onShowAlgInfo = () => {
    dispatch(actions.toggleAlgInfoOpen());
  };

  return (
    <>
      <MenuSection highlight>
        <MenuItem title="Algorithm">
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Select
                value={selectedAlgorithm}
                onChange={onAlgorithmChange}
                disabled={running || paused || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
              >
                <ListSubheader>Heuristic Construction</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-construction")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Heuristic Improvement</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "heuristic-improvement")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
                    </SelectItem>
                  ))}
                <ListSubheader>Exhaustive</ListSubheader>
                {algorithms
                  .filter(alg => alg.type === "exhaustive")
                  .map(alg => (
                    <SelectItem value={alg.solverKey} key={alg.solverKey}>
                      {alg.friendlyName}
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
          <ButtonGroup
            fullWidth
            variant="outlined"
            color="secondary"
            size="large"
          >
            <Button
              onClick={paused ? onUnPause : running ? onPause : onStart}
              disabled={definingPoints || fullSpeed}
            >
              <FontAwesomeIcon
                icon={paused ? faPlay : running ? faPause : faPlay}
                width="0"
              />
            </Button>

            <Button
              onClick={paused ? onStop : onFullSpeed}
              disabled={(!running && !paused) || definingPoints || fullSpeed}
            >
              <FontAwesomeIcon
                icon={paused ? faStop : faFastForward}
                width="0"
              />
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
            step={25}
            min={0}
            max={250}
            valueLabelDisplay="auto"
            color="secondary"
            disabled={definingPoints || fullSpeed}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection>
        <MenuItem row>
          <Grid item xs={10}>
            <Typography variant="button" color="textSecondary" component="div">
              Show Best Path
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              checked={showBestPath}
              onChange={onShowBestPathChange}
              color="secondary"
              disabled={definingPoints || fullSpeed}
              id="show-best-path"
            />
          </Grid>

          <Grid item xs={10}>
            <Typography variant="button" color="textSecondary" component="div">
              Show Evaluated Paths
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              checked={evaluatingDetailLevel > 0}
              onChange={onEvaluatingDetailLevelChange(1, 0)}
              color="secondary"
              disabled={definingPoints || fullSpeed}
              id="show-evaluating-paths"
            />
          </Grid>

          {maxEvaluatingDetailLevel > 1 && (
            <>
              <Grid item xs={10}>
                <Typography
                  variant="button"
                  color="textSecondary"
                  component="div"
                >
                  Show Evaluated Steps
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Switch
                  checked={evaluatingDetailLevel > 1}
                  onChange={onEvaluatingDetailLevelChange(2, 1)}
                  color="secondary"
                  disabled={definingPoints || fullSpeed}
                  id="show-evaluating-steps"
                />
              </Grid>
            </>
          )}
        </MenuItem>
      </MenuSection>
    </>
  );
};
