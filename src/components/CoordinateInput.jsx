import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePoints } from '../store/actions';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';

const CoordinateInput = () => {
  const [coordinates, setCoordinates] = useState('');
  const dispatch = useDispatch();
  const viewport = useSelector(selectors.selectViewport);

  const handleUpdate = () => {
    const parsedCoordinates = coordinates
      .split('\n')
      .map(line => {
        const [lat, lng] = line.split(',').map(coord => parseFloat(coord.trim()));
        return [lat, lng];
      })
      .filter(coord => !isNaN(coord[0]) && !isNaN(coord[1]));

    if (parsedCoordinates.length > 0) {
      dispatch(updatePoints(parsedCoordinates));
      const [firstLat, firstLng] = parsedCoordinates[0];
      dispatch(actions.setViewportState({
        ...viewport,
        latitude: firstLat,
        longitude: firstLng,
        zoom: 10
      }));
    }
  };

  return (
    <>
      <textarea
        placeholder="Enter coordinates (lat,lng) one per line"
        value={coordinates}
        onChange={e => setCoordinates(e.target.value)}
        rows={10}
        cols={30}
        style={{
          width: '100%',
          padding: '8px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxSizing: 'border-box',
          marginBottom: '10px'
        }}
      />
      <button
        onClick={handleUpdate}
        className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedOutlined MuiButtonGroup-groupedOutlinedHorizontal MuiButtonGroup-groupedOutlinedSecondary MuiButton-outlinedSecondary MuiButton-outlinedSizeLarge MuiButton-sizeLarge MuiButton-fullWidth"
      >
        Update Coordinates
      </button>
    </>
  );
};

export default CoordinateInput;