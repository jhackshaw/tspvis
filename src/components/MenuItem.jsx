import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  item: {
    margin: `${theme.spacing(1.5)}px 0`
  }
}));

export const MenuItem = ({ children, title = "", row = false }) => {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <Grid
        item
        container
        direction={row ? "row" : "column"}
        alignItems={row ? "center" : "flex-start"}
      >
        {title && (
          <Grid item xs={12}>
            <Typography
              gutterBottom
              color="textSecondary"
              variant="button"
              component="div"
            >
              {title}
            </Typography>
          </Grid>
        )}
        {children}
      </Grid>
    </div>
  );
};
