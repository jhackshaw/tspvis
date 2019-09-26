import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button, Slider } from '@material-ui/core';
import { faRandom, faSave, faMousePointer, faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MenuSection from './MenuSection';
import MenuItem from './MenuItem';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';


const MenuPointControls = ({ onRandomizePoints }) => {
  const dispatch = useDispatch();
  const pointCount = useSelector(selectors.selectPointCount);
  const running = useSelector(selectors.selectRunning);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  
  const onDefaultMap = () => {
    dispatch(actions.setDefaultMap())
  }

  const onToggleDefiningPoints = () => {
    const action = definingPoints ?
                     actions.stopDefiningPoints() :
                     actions.startDefiningPoints();
    dispatch(action)
  }

  const onPointCountChange = (_, newCount) => {
    dispatch(actions.setPointCount(newCount))
  }

  return (
    <MenuSection>
      <MenuItem title="Points">
        <ButtonGroup fullWidth variant="outlined" color="secondary" size="large" disabled={running}>
          <Button onClick={onRandomizePoints} disabled={definingPoints}>
            <FontAwesomeIcon icon={faRandom} width="0"/>
          </Button>
          <Button onClick={onToggleDefiningPoints}>
            <FontAwesomeIcon icon={definingPoints ? faSave : faMousePointer} width="0" />
          </Button>
          <Button disabled={definingPoints} onClick={onDefaultMap}>
            <FontAwesomeIcon icon={faMapMarked} width="0" />
          </Button>
        </ButtonGroup>
      </MenuItem>

      <MenuItem title="Number of points">
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
    </MenuSection>
  )
}


export default MenuPointControls;
