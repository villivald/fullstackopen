import React from "react";

const Notification = (props) => {
  return (
    <div className={props.style}>
      {props.text} {props.name}
    </div>
  );
};

export default Notification;
