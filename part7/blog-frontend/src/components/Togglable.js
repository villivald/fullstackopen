import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible} className="addNew">
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div
        className="hiddenByDefault"
        style={visible ? { display: "" } : { display: "none" }}
      >
        <div style={showWhenVisible} className="togglableContent">
          {props.children}
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleVisibility}
            style={{ marginBottom: "20px" }}
          >
            {props.cancelButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelButtonLabel: PropTypes.string.isRequired,
};

export default Togglable;
