import React, { useRef, useImperativeHandle, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, PathLayer } from "@deck.gl/layers";
import { LinearProgress } from "@material-ui/core";
import * as actions from "../store/actions";
import * as selectors from "../store/selectors";
import { useThemeContext } from "../context";

// not secret
const TOKEN =
  "pk.eyJ1IjoiaW50cmVwaWRldiIsImEiOiJjazBpa2M5YnowMHcyM21ubzgycW8zZHJmIn0.DCO2aRA6MJweC8HN-d_cgQ";

export const MapPlot =  React.forwardRef((props, ref) => {
  const { children } = props;
  const { muiTheme, colorMode } = useThemeContext();
  const matches = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const mapGlRef = useRef();
  const plotPoints = useSelector(selectors.selectPointsDisplay);
  const plotPaths = useSelector(selectors.selectPlotPaths);
  const viewport = useSelector(selectors.selectViewport);
  const running = useSelector(selectors.selectRunning);
  const definingPoints = useSelector(selectors.selectDefiningPoints);
  const mapStyle = useMemo(() =>
    colorMode === "dark"
      ? "mapbox://styles/mapbox/dark-v8"
      : "mapbox://styles/mapbox/light-v8"
  );
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    getBounds: () => {
      const map = mapGlRef.current.getMap();
      const { _ne, _sw } = map.getBounds();
      return {
        top: _ne.lat,
        bottom: _sw.lat,
        left: _ne.lng,
        right: _sw.lng
      };
    }
  }));

  useEffect(() => {
    if (matches) {
      dispatch(
        actions.setViewportState({
          ...viewport,
          zoom: 2
        })
      );
    }
  }, [matches, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const onViewportChanged = viewport => {
    dispatch(actions.setViewportState(viewport));
  };

  const onDefinedPoint = ({ lngLat }) => {
    dispatch(actions.addDefinedPoint(lngLat));
  };
  const layers = useMemo(() => [
    new PathLayer({
      id: "path-layer",
      data: plotPaths,
      getPath: d => d.path,
      getColor: d => d.color,
      pickable: true,
      widthMinPixels: 4,
      widthMaxPixels: 8
    }),
    new ScatterplotLayer({
      id: "scatter-layer",
      data: plotPoints,
      pickable: true,
      opacity: 0.8,
      getFillColor: p => p.color,
      radiusMinPixels: 6,
      radiusMaxPixels: 8
    })
  ], [plotPaths, plotPoints]);
  
  return (

    <MapGL
      {...viewport}
      ref={mapGlRef}
      width="100%"
      height={matches ? "50%" : "100%"}
      maxPitch={0}
      onViewportChange={onViewportChanged}
      mapboxApiAccessToken={TOKEN}
      disableTokenWarning={true}
      onNativeClick={definingPoints && onDefinedPoint}
      doubleClickZoom={false}
      mapStyle={mapStyle}
    >
      {running && <LinearProgress color="secondary" />}
      <DeckGL viewState={viewport} layers = {layers} />
        
      {children}
    </MapGL>
  );
});
