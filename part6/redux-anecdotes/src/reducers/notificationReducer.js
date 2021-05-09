export const showNotification = (notificationText, time) => {
  window.clearTimeout(window.timeout);

  return async (dispatch) => {
    dispatch({
      type: "SHOW",
      data: notificationText,
    });

    window.timeout = setTimeout(
      () => dispatch(hideNotification()),
      time * 1000
    );
  };
};

const hideNotification = () => ({
  type: "HIDE",
});

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW":
      return action.data;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

export default reducer;
