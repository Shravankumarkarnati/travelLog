import React, { useContext } from "react";
import PopUpContext from "../utils/context";

import API from "../utils/api";

import SelectedLog from "./selectedLog";
import Nav from "./nav";
import SearchTab from "./searchTab";
import { GoPerson } from "react-icons/go";
import CreateLog from "./createLog";

import "./styles/allLogs.scss";
import AllLogs from "./allLogs";

const SideBody = () => {
  const { context, changeContext } = useContext(PopUpContext);

  const _backBtnClick = () => {
    changeContext({
      ...context,
      current: {
        content: null,
        edit: false,
      },
    });
  };

  const _updateBtnClick = async (data) => {
    console.log(data);
    const api = new API();
    await api.updateLocation(data);
    window.location.reload(true);
    changeContext({
      ...context,
      current: {
        content: data,
        edit: false,
      },
    });
  };

  const _editBtnClick = () => {
    changeContext({
      ...context,
      current: {
        ...context.current,
        edit: true,
      },
    });
  };

  const _deleteBtnClick = async (id) => {
    const api = new API();
    await api.deleteLocation(id);
    window.location.reload(true);
  };

  const cancelBtnClick = () => {
    changeContext({
      ...context,
      current: {
        ...context.current,
        edit: false,
      },
    });
  };

  const _handleLogClick = (log) => {
    changeContext({
      ...context,
      current: {
        content: log,
        edit: false,
      },
    });
  };
  const _handleItemHover = (item) => {
    changeContext({
      ...context,
      tempLocation: item.location.coordinates,
    });
  };

  const _handleItemLeave = () => {
    changeContext({
      ...context,
      tempLocation: null,
    });
  };

  const SecondActive = () =>
    context.current.content ? (
      <SelectedLog
        log={context.current.content}
        edit={context.current.edit}
        backClick={_backBtnClick}
        editClick={_editBtnClick}
        delClick={_deleteBtnClick}
        updateClick={_updateBtnClick}
        cancelClick={cancelBtnClick}
      />
    ) : context.allLogs ? (
      <AllLogs
        allLogs={context.allLogs}
        _handleItemHover={_handleItemHover}
        _handleItemLeave={_handleItemLeave}
        _handleLogClick={_handleLogClick}
      />
    ) : null;

  return (
    <div className="sideBody">
      <header>
        <h1> Travel Log </h1>
      </header>
      <Nav />
      <main>
        {
          { 1: <SearchTab />, 2: <SecondActive />, 3: <CreateLog /> }[
            context.active
          ]
        }
      </main>
      <div className="floater" title="Login">
        <GoPerson title="Login" />
      </div>
      <footer>
        <p>Shravan Kumar Karnati &copy;</p>
      </footer>
    </div>
  );
};

export default SideBody;
