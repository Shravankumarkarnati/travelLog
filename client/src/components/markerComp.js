import React, { useContext } from "react";
import { FaMapPin } from "react-icons/fa";
import { Marker } from "react-map-gl";
import PopUpContext from "../utils/context";
import "./styles/markerComp.scss";

const MarkerComp = ({ locations }) => {
  const { context, changeContext } = useContext(PopUpContext);
  return (
    <div>
      {context.data.cord ? (
        <Marker
          className="marker"
          longitude={context.data.cord[0]}
          latitude={context.data.cord[1]}
        >
          <div className="svg-container">
            <FaMapPin />
          </div>
        </Marker>
      ) : null}
      {Object.values(locations).map((cur) => {
        return (
          <Marker
            className="marker"
            longitude={cur.location.coordinates[0]}
            latitude={cur.location.coordinates[1]}
            key={cur._id}
          >
            <div
              className="svg-container"
              onClick={() => {
                changeContext({
                  ...context,
                  current: {
                    ...context.current,
                    content: cur,
                    edit: false,
                  },
                });
              }}
            >
              <FaMapPin />
            </div>
          </Marker>
        );
      })}
    </div>
  );
};

export default MarkerComp;
