import React from 'react';
import { CardHeader, Avatar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))


const MenuHeader = props => {
  const classes = useStyles();

  return (
    <CardHeader title="TSP visualizer"
                subheader="visualize various solutions to the traveling salesman problem"
                avatar={
                  <Avatar>
                    <FontAwesomeIcon icon={ faBriefcase } />
                  </Avatar>
                }
                classes={{root: classes.root}} />
  )
}


export default MenuHeader;
