import React, { useRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeckGL, { ScatterplotLayer, PathLayer } from 'deck.gl';
import MapGL from 'react-map-gl';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import { LinearProgress } from '@material-ui/core';

const TOKEN = 'pk.eyJ1IjoiaW50cmVwaWRldiIsImEiOiJjazBpa2M5YnowMHcyM21ubzgycW8zZHJmIn0.DCO2aRA6MJweC8HN-d_cgQ';


const MapPlot = React.forwardRef((props, ref) => {
  const mapGlRef = useRef();
  const plotPoints = useSelector(selectors.selectPlotPoints);
  const plotPaths = useSelector(selectors.selectPlotPaths);
  const viewport = useSelector(selectors.selectViewport);
  const running = useSelector(selectors.selectRunning);
  const dispatch = useDispatch()

  useImperativeHandle(ref, () => ({
    getBounds: () => {
      const map = mapGlRef.current.getMap();
      return map.getBounds();
    }
  }))

  const onViewportChanged = viewport => {
    dispatch(actions.setViewportState(viewport))
  }

  return (
    <MapGL
      {...viewport}
      ref={mapGlRef}
      width="100%"
      height="100%"
      maxPitch={0}
      onViewportChange={onViewportChanged}
      mapboxApiAccessToken={TOKEN}
      disableTokenWarning={true}
    >
      { running &&
        <LinearProgress color="secondary" />
      }
      <DeckGL viewState={viewport}>
        <PathLayer id='path-layer'
                   data={plotPaths}
                   getPath={d => d.path}
                   getWidth={5}
                   getColor={d => d.color}
                   widthUnit='pixels'
                   pickable={true}
                   widthMinPixels={2}
                   widthMaxPixels={4}
                   />
        <ScatterplotLayer id="scatter-layer"
                          data={plotPoints}
                          pickable={true}
                          opacity={0.8}
                          getFillColor={p => p.color}
                          radiusMinPixels={6}
                          raduisMaxPixels={8}
                          />
      </DeckGL>
    </MapGL>
  );
})

export default MapPlot;
