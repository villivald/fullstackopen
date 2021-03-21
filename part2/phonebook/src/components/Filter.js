import React from "react";

const Filter = (props) => {
  return (
    <div>
      filter: <input onChange={props.handleFilter} value={props.filter} />
    </div>
  );
};

export default Filter;
