import React, { useContext } from "react";
import PopUpContext from "../utils/context";

import API from "../utils/api";

import CreateLog from "./createLog";
import SelectedLog from "./selectedLog";
import Nav from "./nav";
import SearchTab from "./searchTab";

import "./styles/allLogs.scss";

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

  const _handleLogClick = (log) => {
    changeContext({
      ...context,
      current: {
        content: log,
        edit: false,
      },
    });
  };

  return (
    <div className="sideBody">
      <header>
        <h1> Travel Log </h1>
      </header>
      <Nav />
      <main>
        {context.active === 1 ? <SearchTab /> : null}
        {context.active === 2 ? (
          context.current.content ? (
            <SelectedLog
              log={context.current.content}
              edit={context.current.edit}
              backClick={_backBtnClick}
              editClick={_editBtnClick}
              delClick={_deleteBtnClick}
              updateClick={_updateBtnClick}
            />
          ) : context.allLogs ? (
            <div className="allLogs">
              {context.allLogs.map((cur) => {
                return (
                  <p
                    className="allLogs--item"
                    key={cur._id}
                    onClick={() => _handleLogClick(cur)}
                  >
                    <span className="title">{cur.title}</span>
                    <span className="date">
                      {cur.visitedDate.split("T")[0]}
                    </span>
                  </p>
                );
              })}
            </div>
          ) : null
        ) : null}
        {context.active === 3 ? <CreateLog /> : null}
      </main>
      <footer>
        <p>Shravan Kumar Karnati &copy;</p>
      </footer>
    </div>
  );
};

export default SideBody;
