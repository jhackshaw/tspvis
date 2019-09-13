import React from 'react';
import { XYPlot,
  FlexibleXYPlot,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis 
} from 'react-vis';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '90%',
    height: '90%',
    padding: theme.spacing(3)
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      flex: '0 0 50vh',
      position: 'relative'
    }
  }
}))


const Plot = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper classes={{root: classes.wrapper}}>
        <FlexibleXYPlot xDomain={[0, 100]} yDomain={[0,100]}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis />
          <YAxis />
          { children }
        </FlexibleXYPlot>
      </Paper>
    </div>
  )
}

export default Plot;
