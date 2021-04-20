import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ButtonGroup,
  Button,
  Slider,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  faRandom,
  faSave,
  faMousePointer,
  faMapMarked
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

// [0, 1/2, 1, 3, 12]
let cache = ["1e+0", "1e+0"];
const possRoutes = n => {
  if (n <= 2) {
    return "1e+0";
  }
  if (typeof cache[n - 1] !== "undefined") {
    return cache[n - 1];
  }

  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
    cache[i] = (result / 2).toExponential(3);
  }

  return cache[n - 1];
};

export const MenuPointControls = ({ onRandomizePoints }) => {
  const classes = useStyles();
  const [possiblePaths, setPossiblePaths] = useState("0");
  const dispatch = useDispatch();
  const pointCount = useSelector(selectors.selectPointCount);
  const running = useSelector(selectors.selectRunning);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const onDefaultMap = () => {
    dispatch(actions.setDefaultMap());
  };

  const onToggleDefiningPoints = () => {
    const action = definingPoints
      ? actions.stopDefiningPoints()
      : actions.startDefiningPoints();
    dispatch(action);
  };

  const onPointCountChange = (_, newCount) => {
    dispatch(actions.setPointCount(newCount));
  };

  useEffect(() => {
    setPossiblePaths(possRoutes(pointCount));
  }, [pointCount]);

  const [num, exp] = possiblePaths.split("e+");

  return (
    <MenuSection>
      <MenuItem title="Points">
        <ButtonGroup
          fullWidth
          variant="outlined"
          color="secondary"
          size="large"
          disabled={running}
        >
          <Button
            onClick={onRandomizePoints}
            disabled={definingPoints || pointCount < 3}
          >
            <FontAwesomeIcon icon={faRandom} width="0" />
          </Button>
          <Button onClick={onToggleDefiningPoints}>
            <FontAwesomeIcon
              icon={definingPoints ? faSave : faMousePointer}
              width="0"
            />
          </Button>
          <Button disabled={definingPoints} onClick={onDefaultMap}>
            <FontAwesomeIcon icon={faMapMarked} width="0" />
          </Button>
        </ButtonGroup>
      </MenuItem>

      <MenuItem title="Number of random points">
        <Slider
          value={pointCount}
          onChange={onPointCountChange}
          step={1}
          min={3}
          max={200}
          valueLabelDisplay="auto"
          color="secondary"
          disabled={running || definingPoints}
        />
      </MenuItem>
      <MenuItem row>
        <Grid item container justify="space-between">
          <Typography
            display="inline"
            variant="button"
            color="textSecondary"
            component="div"
          >
            Possible Paths:{" "}
          </Typography>
          <Typography
            classes={{ root: classes.grow }}
            align="right"
            display="inline"
            component="span"
          >
            {num} x 10<sup>{exp}</sup>
          </Typography>
        </Grid>
      </MenuItem>
    </MenuSection>
  );
};
