import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  field: {
    width: '90%',
    marginTop: theme.spacing(2)
  }
}))

const MenuMetrics = ({ curBest=0.0, evaluating=0.0 }) => {
  const classes = useStyles();

  return (
      <TextField
          label="Current Best"
          // className={classes.field}
          margin="dense"
          disabled
          fullWidth
          value={ curBest }
          variant="outlined"
        />
  )
}

export default MenuMetrics;
