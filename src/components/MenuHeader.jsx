import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography, IconButton, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faBriefcase,
  faDonate
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { makeStyles } from "@material-ui/styles";
import { MenuSection } from "./MenuSection";

import * as actions from "../store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  title: {
    fontSize: "1.2rem"
  }
}));

export const MenuHeader = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onOpenSiteInfo = () => {
    dispatch(actions.toggleSiteInfoOpen());
  };

  return (
    <MenuSection>
      <Grid container justify="space-between" alignItems="center">
        <Typography
          gutterBottom
          display="inline"
          variant="button"
          component="h1"
          classes={{ root: classes.title }}
        >
          <FontAwesomeIcon icon={faBriefcase} width="0" /> TSPVIS
        </Typography>
        <Typography gutterBottom display="inline" color="textSecondary">
          <Tooltip title="Source code">
            <IconButton
              target="_blank"
              href="https://github.com/jhackshaw/tspvis"
            >
              <FontAwesomeIcon icon={faGithub} size="xs" width="0" />
            </IconButton>
          </Tooltip>

          <Tooltip title="General site information">
            <IconButton onClick={onOpenSiteInfo} edge="end">
              <FontAwesomeIcon icon={faInfoCircle} size="xs" width="0" />
            </IconButton>
          </Tooltip>
        </Typography>
      </Grid>
      <Typography variant="subtitle2" color="textSecondary">
        Visualize algorithms for the traveling salesman problem. Use the
        controls below to plot points, choose an algorithm, and control
        execution.
        <br />
        (Hint: try a construction alogorithm followed by an improvement
        algorithm)
      </Typography>
    </MenuSection>
  );
};
