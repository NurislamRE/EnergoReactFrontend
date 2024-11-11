import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: Cookies.get("X-Username"),
    token: Cookies.get("X-Jwt-Token"),
    orgId: Cookies.get("X-OrgId"),
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      console.log(payload);
      state.user = payload.user;
      state.token = payload.token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
