import React, { useState, useContext } from "react";
import moment from "moment";
import PopUpContext from "../utils/context";
import API from "../utils/api";

const CreateLog = () => {
  const { context, changeContext } = useContext(PopUpContext);
  const [log, setLog] = useState({
    title: "",
    imageUrl: "",
    description: "",
    rating: 1,
    visitedDate: "",
    location: { type: "Point", coordinates: context.data.cord },
  });

  const _saveClick = () => {
    if (log.imageUrl === "") {
      setLog({
        ...log,
        imageUrl: "https://via.placeholder.com/300",
      });
    }
    setLog({
      ...log,
      visitedDate: moment(log.visitedDate).format(),
    });
    const api = new API();
    (async () => {
      await api.createLocation(log);
      window.location.reload(true);
    })();
  };

  const _discardClick = () => {
    changeContext({
      ...context,
      data: {
        cord: null,
        suggest: null,
      },
      active: 2,
    });
  };

  const LogDetails = () => (
    <div className="selectedLog">
      <div className="item">
        <label htmlFor="title"> Title</label>
        <input
          type="text"
          value={log.title}
          onChange={(e) =>
            setLog({
              ...log,
              title: e.target.value,
            })
          }
          required={true}
        />
      </div>
      <div className="item">
        <label htmlFor="description"> description</label>
        <input
          type="text"
          value={log.description}
          onChange={(e) =>
            setLog({
              ...log,
              description: e.target.value,
            })
          }
        />
      </div>
      <div className="item">
        <label htmlFor="imageUrl"> image Url</label>
        <input
          type="text"
          value={log.imageUrl}
          onChange={(e) =>
            setLog({
              ...log,
              imageUrl: e.target.value,
            })
          }
        />
      </div>
      <div className="item">
        <label htmlFor="rating"> rating</label>
        <input
          type="number"
          value={log.rating}
          onChange={(e) =>
            setLog({
              ...log,
              rating: e.target.value,
            })
          }
        />
      </div>
      <div className="item">
        <label htmlFor="visitedDate"> visited Date</label>
        <input
          type="date"
          value={moment(log.visitedDate).format("YYYY-MM-DD")}
          onChange={(e) =>
            setLog({
              ...log,
              visitedDate: e.target.value,
            })
          }
          required={true}
        />
      </div>
    </div>
  );

  return (
    <div className="createLog">
      <div className="createLog--container">
        {context.data.suggest ? (
          <div className="allLogs special">
            {context.data.suggest.map((cur) => (
              <p
                className="allLogs--item suggest"
                key={cur.id}
                onClick={() => {
                  setLog({
                    ...log,
                    title: cur.place_name,
                  });
                  changeContext({
                    ...context,
                    data: {
                      ...context.data,
                      suggest: null,
                    },
                  });
                }}
              >
                {cur.place_name}
              </p>
            ))}
            <p
              className="allLogs--item suggest"
              onClick={() => {
                setLog({
                  ...log,
                  title: "",
                });
                changeContext({
                  ...context,
                  data: {
                    ...context.data,
                    suggest: null,
                  },
                });
              }}
            >
              Custom
            </p>
          </div>
        ) : (
          <LogDetails />
        )}
      </div>
      <div className="btnContainer">
        <button className="btn" onClick={_saveClick}>
          Save
        </button>
        <button className="btn" onClick={_discardClick}>
          Discard
        </button>
      </div>
    </div>
  );
};

export default CreateLog;
