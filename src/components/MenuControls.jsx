import React from 'react';
import { ButtonGroup,
         Button, 
         makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles(theme => ({
  btnsRoot: {
    width: '100%'
  }
}))

const MenuControls = ({ onStart, onStop }) => {
  const classes = useStyles()

  return (
    <ButtonGroup variant="outlined" classes={{root: classes.btnsRoot}}>
      <Button>
        <FontAwesomeIcon icon={faPlay}
                         onClick={onStart} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faStop}
                         onClick={onStop} />
      </Button>
    </ButtonGroup>
  )
}

export default MenuControls;
