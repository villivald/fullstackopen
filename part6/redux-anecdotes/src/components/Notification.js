import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "3px solid green",
    padding: 10,
    marginBottom: "10px",
  };
  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
