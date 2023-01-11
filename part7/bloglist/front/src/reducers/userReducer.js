import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { showNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const userLoggedIn = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userLoggedIn)
      );
      blogService.setToken(userLoggedIn.token);
      dispatch(setUser(userLoggedIn));
    } catch (exception) {
      dispatch(showNotification("wrong username or password", "danger"));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
    blogService.setToken(null);
  };
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
