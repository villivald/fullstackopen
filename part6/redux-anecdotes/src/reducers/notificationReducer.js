export const showNotification = (notificationText) => ({
  type: "SHOW",
  data: notificationText,
});

export const hideNotification = () => ({
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
