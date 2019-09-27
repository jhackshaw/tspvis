import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import * as selectors from '../store/selectors';

import MenuSection from './MenuSection';
import MenuItem from './MenuItem';


const MenuMetrics = props => {
  const best = useSelector(selectors.selectBestCostDisplay);
  const evaluating = useSelector(selectors.selectEvaluatingCostDisplay);

  return (
    <MenuSection>
      <MenuItem row>
        <Grid item xs={6}>
          <Typography variant="button" color="textSecondary" component="div">Current Best: </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="button" fullWidth align="right">{ best }</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="button">km</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="button" color="textSecondary" component="div">Evaluating: </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="button" fullWidth align="right">{ evaluating }</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="button">km</Typography>
        </Grid>
      </MenuItem>
    </MenuSection>
  )
}

export default MenuMetrics;
