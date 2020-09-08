import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ onDblClick, children }) => {
  const [viewport, setViewport] = useState({
    width: "75vw",
    flexGrow: 1,
    height: "100vh",
    longitude: -98.35,
    latitude: 39.5,
    zoom: 4,
  });

  return (
    <ReactMapGL
      className="mapBox"
      mapboxApiAccessToken="pk.eyJ1IjoidGhlLW11dGFudCIsImEiOiJja2VqaTJtb20xcHRqMzFqeTdhbjhxZGVwIn0.WHABj0QVsLs3aVXfx8QrKg"
      {...viewport}
      // mapStyle="mapbox://styles/mapbox/streets-v11"
      mapStyle="mapbox://styles/the-mutant/ckeu37zzz9mur19mgz2fda2dz"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={onDblClick}
    >
      {children}
    </ReactMapGL>
  );
};

export default Map;
