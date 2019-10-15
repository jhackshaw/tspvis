import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Divider } from '@material-ui/core';
import MenuHeader from './MenuHeader';
import MenuSolverControls from './MenuSolverControls';
import MenuMetrics from './MenuMetrics';
import MenuPointControls from './MenuPointControls';



const useStyles = makeStyles(theme => ({
  wrapper: {
    overflowY: 'auto',
    flex: '0 0 400px',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alginItems: 'flex-start'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))


const Menu = ({ onStart, onFullSpeed, onStop, onRandomizePoints }) => {
  const classes = useStyles();


  return (
    <Paper classes={{ root: classes.wrapper }}>
        <MenuHeader />
        <Divider />
        <MenuMetrics />
        <Divider />
        <MenuSolverControls onStart={onStart}
                            onStop={onStop}
                            onFullSpeed={onFullSpeed} />
        <Divider />
        <MenuPointControls onRandomizePoints={onRandomizePoints} />
    </Paper>
  )
}

export default Menu;
