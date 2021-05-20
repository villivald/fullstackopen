import React from "react";

const Notification = (props) => {
  if (props === null) {
    return null;
  }
  return <div className={props.style}>{props.text}</div>;
};

export default Notification;
