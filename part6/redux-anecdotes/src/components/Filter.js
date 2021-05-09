import React from "react";
import { connect } from "react-redux";
import { filterText } from "../reducers/filterReducer";

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    props.filterText(event.target.value);
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filterText })(Filter);
