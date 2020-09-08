import React, { useState } from "react";
import moment from "moment";
import "./styles/selectedLog.scss";

const SelectedLog = ({
  log,
  edit,
  backClick,
  editClick,
  delClick,
  updateClick,
  cancelClick,
}) => {
  const [editDetails, setEditDetails] = useState({
    ...log,
  });

  return (
    <div className={edit ? "selectedLog edit" : "selectedLog"}>
      <div className="item">
        <label htmlFor="title"> Title</label>
        <input
          type="text"
          value={editDetails.title}
          readOnly={!edit}
          onChange={(e) =>
            setEditDetails({ ...editDetails, title: e.target.value })
          }
        />
      </div>
      <div className="item">
        <label htmlFor="description"> description</label>
        <input
          type="text"
          value={editDetails.description}
          readOnly={!edit}
          onChange={(e) =>
            setEditDetails({ ...editDetails, description: e.target.value })
          }
        />
      </div>
      <div className="item">
        <label htmlFor="imageUrl"> image Url</label>
        <input
          type="text"
          value={editDetails.imageUrl}
          readOnly={!edit}
          onChange={(e) =>
            setEditDetails({ ...editDetails, imageUrl: e.target.value })
          }
        />
      </div>
      <div className="item">
        <label htmlFor="rating"> rating</label>
        <input
          type="number"
          value={editDetails.rating}
          readOnly={!edit}
          onChange={(e) =>
            setEditDetails({ ...editDetails, rating: e.target.value })
          }
        />
      </div>
      <div className="item">
        <label htmlFor="visitedDate"> visited Date</label>
        <input
          type="date"
          value={moment(editDetails.visitedDate).format("YYYY-MM-DD")}
          readOnly={!edit}
          onChange={(e) =>
            setEditDetails({
              ...editDetails,
              visitedDate: moment(e.target.value).format(),
            })
          }
        />
      </div>
      <div className="btnContainer">
        {edit ? (
          <>
            <button className="btn" onClick={cancelClick}>
              Cancel
            </button>
            <button className="btn" onClick={() => updateClick(editDetails)}>
              Update
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={backClick}>
              Back
            </button>
            <button className="btn" onClick={editClick}>
              Edit
            </button>
            <button className="btn" onClick={() => delClick(log._id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectedLog;
