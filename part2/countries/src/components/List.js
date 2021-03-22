import React from "react";

const List = ({ toShow, filter }) => {
  return (
    <div>
      {toShow.length < 10 || !filter
        ? toShow
        : "Too many matches, specify another filter"}
    </div>
  );
};

export default List;
