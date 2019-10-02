import React, { useState } from 'react';
import { Dialog,
         DialogTitle,
         DialogContentText,
         DialogContent,
         Typography,
         IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import useIsFirstLoad from '../hooks/useIsFirstLoad';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))


const IntroductionModel = props => {
  const classes = useStyles();
  const isFirstLoad = useIsFirstLoad();
  const [open, setOpen] = useState(isFirstLoad);

  const onClose = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open || isFirstLoad}
            onClose={onClose}
            maxWidth="md"
            scroll="paper"
            keepMounted
            fullWidth
            >
      <DialogTitle disableTypography className={classes.root}>
      <Typography variant="h5">Traveling Salesman Problem Visualizer</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faWindowClose} width="0" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
          <Typography variant="h6">Traveling Salesman Problem</Typography>
          <Typography variant="body2">
          The traveling salesman problem asks the question, "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?".
          It has been studied extensively in computer science and plenty of algorithms have been presented. The goal of this application is to implement as many of the algorithms as possible, with the goal of making it easy to visualize the execution of the algorithm in real-time.
          Traveling Salesman algorithms typically fall into 2 different categories, exhaustive and heuristic.
          </Typography>


          <Typography variant="h6">Exhaustive</Typography>
          <Typography variant="body2">
          Exhaustive algorithms are garunteed to find the best possible solution by evaluating every possible solution. These algorithms are typically significantly more expensive then the heuristic algorithms discussed next. The exhaustive algorithms implemented so far include:

          - depth first search: this algorithm brute forces every possible route and keeps track of which one had the cheapest cost (distance).
          </Typography>
      </DialogContent>
    </Dialog>
  )
}


export default IntroductionModel;
