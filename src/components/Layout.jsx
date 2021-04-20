import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    flexDirection: "row"
  },
  [theme.breakpoints.down("sm")]: {
    container: {
      justifyContent: "flex-end",
      flexDirection: "column-reverse"
    }
  }
}));

export const Layout = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};
