import React from "react";
import { RiMapPinRangeLine } from "react-icons/ri";
import { Marker } from "react-map-gl";

const TempMarker = ({ cord }) => {
  return (
    <div>
      <Marker className="marker" longitude={cord[0]} latitude={cord[1]}>
        <div className="svg-container red">
          <RiMapPinRangeLine />
        </div>
      </Marker>
    </div>
  );
};

export default TempMarker;
