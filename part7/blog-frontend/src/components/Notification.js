import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { notificationText, notificationType } = useSelector(
    (state) => state.notification
  );

  return (
    notificationText && (
      <div
        style={{
          backgroundColor: "rgb(197, 188, 188)",
          fontSize: "1.5rem",
          width: "30%",
          color: `${notificationType}`,
          borderRadius: "4px",
          marginBottom: "2%",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: `${notificationType}`,
        }}
      >
        {notificationText}
      </div>
    )
  );
};

export default Notification;
