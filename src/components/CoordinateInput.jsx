import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePoints } from '../store/actions';

const CoordinateInput = () => {
  const [coordinates, setCoordinates] = useState('');
  const dispatch = useDispatch();

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
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter coordinates (lat,lng) one per line"
        value={coordinates}
        onChange={e => setCoordinates(e.target.value)}
        rows={10}
        cols={30}
      />
      <button onClick={handleUpdate}>Update Coordinates</button>
    </div>
  );
};

export default CoordinateInput;