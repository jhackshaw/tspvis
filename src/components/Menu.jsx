import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Divider, Hidden } from '@material-ui/core';
import MenuControls from './MenuControls';



const useStyles = makeStyles(theme => ({
  wrapper: {
    overflowY: 'auto',
    flex: '0 0 400px',
    padding: theme.spacing(2)
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))


const Menu = ({ onStart, onStop }) => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.wrapper }}>
      <Hidden mdDown>
         <MenuControls onStart={onStart}
                       onStop={onStop} />
         <Divider />
      </Hidden>

    </Paper>
  )
}

export default Menu;
