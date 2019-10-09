import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import * as selectors from '../store/selectors';

import MenuSection from './MenuSection';
import MenuItem from './MenuItem';


const MenuMetrics = props => {
  const best = useSelector(selectors.selectBestCostDisplay);
  const evaluating = useSelector(selectors.selectEvaluatingCostDisplay);
  const startedRunningAt = useSelector(selectors.selectStartedRunningAt);
  const [runningFor, setRunningFor] = useState(0);

  useEffect(() => {
    if (startedRunningAt) {
      const interval = setInterval(() => {
        setRunningFor(Math.floor((Date.now() - startedRunningAt) / 1000))
      }, 1000)
      return () => clearInterval(interval);
    }
  }, [startedRunningAt])

  return (
    <MenuSection>
      <MenuItem row>
        <Grid item xs={6}>
          <Typography variant="button" color="textSecondary" component="div">Current Best: </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="button">{ best }</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="button">km</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="button" color="textSecondary" component="div">Evaluating: </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="button">{ evaluating }</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="button">km</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="button" color="textSecondary" component="div">Running For: </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="button">{ runningFor || '' }</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="button">s</Typography>
        </Grid>
      </MenuItem>
    </MenuSection>
  )
}

export default MenuMetrics;
