import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return state;
    },
  },
});

let timeoutId;
export const showNotification = (message, cssClassName) => {
  return async (dispatch) => {
    clearTimeout(timeoutId);
    const notification = {
      message,
      cssClassName,
    };
    dispatch(setNotification(notification));
    timeoutId = setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
};

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
