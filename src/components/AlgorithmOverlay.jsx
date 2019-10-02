import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import * as selectors from '../store/selectors';


const useStyles = makeStyles(theme => ({
  root: {
    width: '400px'
  }
}))


const AlgorithmOverlay = props => {
  const dispatch = useDispatch();
  const algorithm = useSelector(selectors.selectAlgorithm);
  const showAlgorithm = useSelector(selectors.selectShowAlgorithmInfo);

  return (
    <div>
      { showAlgorithm &&
        <Card>
          <CardHeader title={ algorithm } />
          <CardContent>
            This is some test content to display the information regarding a specifig algorithm
          </CardContent>
        </Card>
        
      }
    </div>
  )

}


export default AlgorithmOverlay;
