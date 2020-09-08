import React from "react";
import { FaMapPin } from "react-icons/fa";
import { Marker } from "react-map-gl";

const TempMarker = ({ cord }) => {
  return (
    <div>
      <Marker className="marker" longitude={cord[0]} latitude={cord[1]}>
        <div className="svg-container highlight">
          <FaMapPin />
        </div>
      </Marker>
    </div>
  );
};

export default TempMarker;
