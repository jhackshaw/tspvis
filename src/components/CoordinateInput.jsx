import React, { useState } from 'react';
import {ButtonGroup, Button, TextField} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { updatePoints } from '../store/actions';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';

const CoordinateInput = () => {
  const [coordinates, setCoordinates] = useState('');
  const dispatch = useDispatch();
  const viewport = useSelector(selectors.selectViewport);

  const handleUpdate = () => {
    console.log('Raw coordinates input:', coordinates);

    const parsedCoordinates = coordinates
      .split('\n')
      .map(line => {
        const [lat, lng] = line.split(',').map(coord => parseFloat(coord.trim()));
        if (
          isNaN(lat) ||
          isNaN(lng) ||
          lat < -90 ||
          lat > 90 ||
          lng < -180 ||
          lng > 180
        ) {
          console.error(`Invalid coordinate: ${line}`);
          return null;
        }
        return [lat, lng];
      })
      .filter(coord => coord !== null);

    console.log('Parsed coordinates:', parsedCoordinates);

    if (parsedCoordinates.length > 0) {
      dispatch(updatePoints(parsedCoordinates));
      const [firstLng, firstLat] = parsedCoordinates[0];
      console.log('Updating viewport to:', {
        latitude: firstLat,
        longitude: firstLng,
        zoom: 10
      });
      dispatch(
        actions.setViewportState({
          ...viewport,
          latitude: firstLat,
          longitude: firstLng,
          zoom: 10
        })
      );
    } else {
      console.error('No valid coordinates provided.');
    }
  };

  return (
    <>
      <TextField
        placeholder="Enter coordinates (lat,lng) one per line"
        value={coordinates}
        onChange={e => setCoordinates(e.target.value)}
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        color="secondary"
      />
      <br />
      <ButtonGroup
          fullWidth
          variant="outlined"
          color="secondary"
          size="large"
      >
        <Button
          onClick={handleUpdate}
        >
          Update Coordinates
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CoordinateInput;