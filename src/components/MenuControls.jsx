import React from 'react';
import { ButtonGroup,
         Button, 
         makeStyles,
         Typography,
         Slider } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles(theme => ({
  btnsRoot: {
    width: '100%'
  }
}))

const MenuControls = ({ onStart, onStop, delay, onDelayChange }) => {
  const classes = useStyles()

  return (
    <>
    <ButtonGroup variant="outlined" classes={{root: classes.btnsRoot}}>
      <Button onClick={onStart}>
        <FontAwesomeIcon icon={faPlay}/>
      </Button>
      <Button onClick={onStop}>
        <FontAwesomeIcon icon={faStop} />
      </Button>
    </ButtonGroup>

    <Typography gutterBottom>Delay</Typography>
    <Slider
      value={delay}
      onChange={onDelayChange}
      step={1}
      marks
      min={0}
      max={10000}
      valueLabelDisplay="auto"
    />
    </>
  )
}

export default MenuControls;
