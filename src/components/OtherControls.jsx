import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
import { ThemeToggle } from "./ThemeToggle";

export const OtherControls = props => {
  return (
    <MenuSection>
      <MenuItem row>
        <Grid item xs={10}>
          <Typography variant="button" color="textSecondary" component="div">
            Dark Mode
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <ThemeToggle />
        </Grid>
      </MenuItem>
    </MenuSection>
  );
};
