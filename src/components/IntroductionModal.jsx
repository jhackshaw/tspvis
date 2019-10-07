import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Dialog,
         DialogContent,
         Typography,
         IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import * as selectors from '../store/selectors';
import * as actions from '../store/actions';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))


const IntroductionModel = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector(selectors.selectSiteInfoOpen);

  const onClose = () => {
    dispatch(actions.toggleSiteInfoOpen());
  }

  return (
    <Dialog open={open}
            onClose={onClose}
            maxWidth="md"
            scroll="paper"
            keepMounted
            fullWidth
            >
      <DialogContent>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <FontAwesomeIcon icon={faWindowClose} width="0" />
          </IconButton>
          <Typography gutterBottom variant="h5">Traveling Salesman Problem</Typography>
          <Typography gutterBottom variant="body1">
          The traveling salesman problem (TSP) asks the question, "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?".
          </Typography>
          <Typography gutterBottom variant="body1">
          It has been studied extensively in computer science and plenty of algorithms have been devised, generally classified as exhaustive or heuristic.
          </Typography>

          <Typography gutterBottom variant="h6">Exhaustive</Typography>
          <Typography variant="body1">
          Exhaustive algorithms will always find the best possible solution by evaluating every possible path. These algorithms are typically significantly more expensive then the heuristic algorithms discussed next. The exhaustive algorithms implemented so far include:

          <ul>
            <li>Random Paths</li>
            <li>Depth First Search (Brute Force)</li>
            <li>Branch and Bound (Cost)</li>
            <li>Branch and Bound (Cost, crossings)</li>
          </ul>
          </Typography>

          <Typography gutterBottom variant="h6">Heuristic</Typography>
          <Typography variant="body1">
          Heuristic algorithms attempt to find a good approximation of the optimal path within a more <i>reasonable</i> amount of time. The heuristic algorithms implemented so far include:
          </Typography>

          <ul>
            <li>Shortest Path</li>
            <li>2-Opt Substitution</li>
          </ul>
      </DialogContent>
    </Dialog>
  )
}


export default IntroductionModel;
