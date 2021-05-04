import React from "react";
import { useDispatch } from "react-redux";
import { filterText } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    dispatch(filterText(event.target.value));
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
