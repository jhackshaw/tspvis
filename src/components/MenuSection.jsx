import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(2),
    // backgroundColor: ({ highlight = false }) =>
    //   highlight ? theme.palette.grey[100] : theme.palette.paper,
    border: ({ highlight = false }) =>
      highlight ? `2px solid ${theme.palette.secondary.main}` : "none",
    borderRadius: "10px"
  }
}));

export const MenuSection = ({ children, ...rest }) => {
  const classes = useStyles(rest);

  return (
    <div className={classes.section}>
      <Grid container direction="column" wrap="nowrap">
        {children}
      </Grid>
    </div>
  );
};
