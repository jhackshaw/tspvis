import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import * as selectors from '../store/selectors';

import MenuSection from './MenuSection';
import MenuItem from './MenuItem';


const MenuMetrics = props => {
  const best = useSelector(selectors.selectDisplayBestCost);
  const evaluating = useSelector(selectors.selectDisplayEvaluatingCost);

  return (
    <MenuSection>
      <MenuItem row>
        <Grid item xs={5}>
          <Typography variant="button" color="textSecondary" component="div">Current Best: </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="button">{ best }</Typography>
        </Grid>
      </MenuItem>
      <MenuItem row>
        <Grid item xs={5}>
          <Typography variant="button" color="textSecondary" component="div">Evaluating: </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="button">{ evaluating }</Typography>
        </Grid>
      </MenuItem>
    </MenuSection>
  )
}

export default MenuMetrics;
