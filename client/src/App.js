import React, { useState, useContext } from "react";
import "./app.scss";
import MainBody from "./components/mainBody";
import SideBody from "./components/sideBody";

import PopUpContext from "./utils/context";

function App() {
  const context = useContext(PopUpContext);
  const changeContext = (newContext) =>
    setState({
      context: newContext,
      changeContext,
    });
  const [state, setState] = useState({
    context,
    changeContext,
  });

  return (
    <PopUpContext.Provider value={state}>
      <MainBody />
      <SideBody />
    </PopUpContext.Provider>
  );
}

export default App;
