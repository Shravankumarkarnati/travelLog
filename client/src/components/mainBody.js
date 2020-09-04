import React, { useEffect, useContext } from "react";
import PopUpContext from "../utils/context";

import Map from "./map";
import MarkerComp from "./markerComp";
import TempMarker from "./tempMarker";

import API from "../utils/api";

const MainBody = () => {
  const { context, changeContext } = useContext(PopUpContext);

  const _dbClick = async (e) => {
    const cord = e.lngLat;
    const api = new API();
    const suggest = await api.getAddressWithCord(cord);
    changeContext({
      ...context,
      active: 3,
      data: {
        cord,
        suggest,
      },
    });
  };

  useEffect(() => {
    (async () => {
      const api = new API();
      const loc = await api.getAllLocations();
      changeContext({ ...context, allLogs: loc });
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Map onDblClick={_dbClick}>
      {context.allLogs ? <MarkerComp locations={context.allLogs} /> : null}
      {context.tempLocation ? <TempMarker cord={context.tempLocation} /> : null}
    </Map>
  );
};

export default MainBody;
