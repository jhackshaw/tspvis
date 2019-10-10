import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Dialog,
         DialogContent,
         IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import * as selectors from '../store/selectors';
import * as actions from '../store/actions';
import useIntroductionInfo from '../hooks/useIntroductionInfo';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))


const IntroductionModel = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const introduction = useIntroductionInfo();
  const open = useSelector(selectors.selectSiteInfoOpen);

  const onClose = () => {
    dispatch(actions.toggleSiteInfoOpen());
  }

  return (
    <Dialog open={open}
            onClose={onClose}
            maxWidth="md"
            scroll="paper"
            keepMounted
            fullWidth
            >
      <DialogContent>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <FontAwesomeIcon icon={faWindowClose} width="0" />
          </IconButton>

        <div dangerouslySetInnerHTML={{__html: introduction }} />
      </DialogContent>
    </Dialog>
  )
}


export default IntroductionModel;
