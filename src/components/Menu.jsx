import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Paper, Divider, Hidden } from '@material-ui/core';
import MenuControls from './MenuControls';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';



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
  const delay = useSelector(selectors.selectDelay);
  const dispatch = useDispatch()

  const onDelayChange = (_, newDelay) => {
    dispatch(actions.setDelay(newDelay))
  }

  return (
    <Paper classes={{ root: classes.wrapper }}>
      <Hidden mdDown>
         <MenuControls onStart={onStart}
                       onStop={onStop}
                       onDelayChange={onDelayChange}
                       delay={delay} />
         <Divider />
      </Hidden>
    </Paper>
  )
}

export default Menu;
