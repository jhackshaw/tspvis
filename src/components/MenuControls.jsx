import React from 'react';
import { ButtonGroup,
         Button, 
         makeStyles,
         Typography,
         Slider, 
         Switch, 
         Select,
         MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRedo } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../store/actions';
import * as selectors from '../store/selectors';


const useStyles = makeStyles(theme => ({
  item: {
    margin: `${theme.spacing(1)}px 0`
  },
  btn: {
    borderColor: theme.palette.secondary.main
  },
  btnActive: {
    color: 'white !important',
    backgroundColor: theme.palette.secondary.main
  },
  btnInactive: {
    color: theme.palette.secondary.main,
    backgroundColor: 'white',
  }
}))


const MenuControls = ({ onStart, onStop }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const algorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const showIntermediatePaths = useSelector(selectors.selectShowIntermediatePaths);
  const running = useSelector(selectors.selectRunning);

  const onAlgorithmChange = event => {
    dispatch(actions.setAlgorthim(event.target.value))
  }

  const onDelayChange = (_, newDelay) => {
    dispatch(actions.setDelay(newDelay))
  }

  const onIntermediatePathsChange = event => {
    dispatch(actions.setShowIntermediatePaths(event.target.checked))
  }

  const onReset = () => {
    dispatch(actions.reset())
  }

  return (
    <>
    <div className={classes.item}>
      <Typography gutterBottom color="textSecondary" variant="button" component="div">Algorithm</Typography>
      <Select value={algorithm}
              onChange={onAlgorithmChange}
              disabled={running}
              variant="outlined"
              fullWidth
              margin="dense"
              >
        <MenuItem value="shortestPath">Shortest Path</MenuItem>
        <MenuItem value="random">Random</MenuItem>
      </Select>
    </div>

    <div className={classes.item}>
      <Typography gutterBottom color="textSecondary" variant="button" component="div">Controls</Typography>
      <ButtonGroup fullWidth variant="outlined" color="secondary" size="large">
        <Button onClick={onStart} disabled={running}>
          <FontAwesomeIcon icon={faPlay}/>
        </Button>
        <Button onClick={onStop} disabled={!running}>
          <FontAwesomeIcon icon={faStop} />
        </Button>
        <Button disabled={running} onClick={onReset}>
          <FontAwesomeIcon icon={faRedo} />
        </Button>
      </ButtonGroup>
    </div>

    <div className={classes.item}>
      <Typography gutterBottom color="textSecondary" variant="button" component="div">Delay</Typography>
      <Slider
        value={delay}
        onChange={onDelayChange}
        step={500}
        min={0}
        max={10000}
        valueLabelDisplay="auto"
        color="secondary"
        classes={{ rail: classes.sliderRail }}
        />
    </div>

    <div className={classes.item}>
      <Typography component="div" color="textSecondary" variant="button" gutterBottom>Intermediate Paths</Typography>
      <Switch
        checked={showIntermediatePaths}
        onChange={onIntermediatePathsChange}
        color="secondary"
        />
    </div>
    </>
  )
}

export default MenuControls;
