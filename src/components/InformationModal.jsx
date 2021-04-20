import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  root: {
    zIndex: "10000 !important"
  }
}));

export const InformationModal = ({ open, onClose, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      scroll="paper"
      keepMounted
      disablePortal
      fullWidth
      classes={{ root: classes.root, paper: classes.root }}
    >
      <DialogContent>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faWindowClose} width="0" />
        </IconButton>

        {children}
      </DialogContent>
    </Dialog>
  );
};
