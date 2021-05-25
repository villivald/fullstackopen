/* eslint-disable indent */

export const showNotification = (notificationText, time, notificationType) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW",
      data: { notificationText, notificationType },
      time: setTimeout(() => dispatch(hideNotification()), time * 1000),
    });
  };
};

const hideNotification = () => ({
  type: "HIDE",
});

const initialState = {
  notificationText: null,
  notificationType: "red",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW":
      return action.data;
    case "HIDE":
      return { notificationType: "transparent", ...initialState };
    default:
      return state;
  }
};

export default reducer;
