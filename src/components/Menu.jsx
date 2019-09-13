import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, ListItem, ListItemText, ListSubheader, Divider } from '@material-ui/core';
import MenuHeader from './MenuHeader';
import MenuMetrics from './MenuMetrics';



const useStyles = makeStyles(theme => ({
  wrapper: {
    overflowY: 'auto',
    flex: '0 0 400px'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))


const SideDrawer = ({ randomizePoints }) => {
  const classes = useStyles();


  return (
    <Paper classes={{ root: classes.wrapper }}>
        <MenuHeader />
        <Divider />

        <MenuMetrics />
      
        <Divider />
        <ListItem button onClick={randomizePoints}>
          Randomize
        </ListItem>
        <ListItem>
          <ListItemText>Current: </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>Best: </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Current: </ListItemText>
        </ListItem>
    </Paper>
  )
}

export default SideDrawer;
