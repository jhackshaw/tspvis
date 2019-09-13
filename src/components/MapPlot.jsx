import React, { useState, useRef, useImperativeHandle } from 'react';
import DeckGL, { ScatterplotLayer } from 'deck.gl';
import MapGL from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoiaW50cmVwaWRldiIsImEiOiJjazBpa2M5YnowMHcyM21ubzgycW8zZHJmIn0.DCO2aRA6MJweC8HN-d_cgQ'; // Set your mapbox token here

const MapPlot = React.forwardRef(({ points }, ref) => {
  const mapGlRef = useRef();

  useImperativeHandle(ref, () => ({
    getBounds: () => {
      const map = mapGlRef.current.getMap();
      return map.getBounds();
    }
  }))

  const [viewportState, setViewportState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0
  });

  const onViewportChanged = viewport => {
    // console.log(viewport)
    setViewportState(viewport)
  }

  return (
    <MapGL
      {...viewportState}
      ref={ mapGlRef }
      width="100%"
      height="100%"
      maxPitch={0}
      onViewportChange={onViewportChanged}
      mapboxApiAccessToken={TOKEN}
      disableTokenWarning={true}
    >
      <DeckGL viewState={viewportState}>
        <ScatterplotLayer data={points} 
                          pickable={true}
                          opacity={0.8}
                          radiusMinPixels={5}
                          raduisMaxPixels={8}
                          getPosition={ d => d.coordinates }
                          />
      </DeckGL>
    </MapGL>
  );
})

export default MapPlot;
