import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "3px solid green",
    padding: 10,
    marginBottom: "10px",
  };
  return props.notification && <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
