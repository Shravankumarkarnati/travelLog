import React from "react";
import moment from "moment";

const AllLogs = ({
  allLogs,
  _handleItemHover,
  _handleItemLeave,
  _handleLogClick,
}) => {
  return (
    <div className="allLogs">
      {allLogs.map((cur) => {
        return (
          <p
            className="allLogs--item"
            key={cur._id}
            onClick={() => _handleLogClick(cur)}
            onMouseEnter={() => _handleItemHover(cur)}
            onMouseLeave={() => _handleItemLeave()}
          >
            <span className="title">{cur.title}</span>
            <span className="date">
              {moment(cur.visitedDate).format("Do MMMM YYYY")}
            </span>
          </p>
        );
      })}
    </div>
  );
};

export default AllLogs;
