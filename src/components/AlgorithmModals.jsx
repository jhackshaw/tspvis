import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Dialog,
         DialogContent,
         IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import useAlgorithmInfo from '../hooks/useAlgorithmInfo';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))


const AlgorithmModals = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const algorithms = useAlgorithmInfo();
  const selectedAlgorithm = useSelector(selectors.selectAlgorithm);
  const open = useSelector(selectors.selectAlgInfoOpen);

  const onClose = () => {
    dispatch(actions.toggleAlgInfoOpen());
  }

  return (
    <>
    { algorithms.map(alg => (
      <Dialog key={alg.solverKey} 
              open={open && selectedAlgorithm === alg.solverKey}
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

          <div dangerouslySetInnerHTML={{__html: alg.html }} />
        </DialogContent>
      </Dialog>
    ))}
    </>
  )
}


export default AlgorithmModals;
