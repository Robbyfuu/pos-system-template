import { User } from "../../../Interfaces";
import { logoutUserSuccess, loginSuccess } from "../login/reducer";

// import {
//   REGISTER_USER,
//   REGISTER_USER_SUCCESSFUL,
//   REGISTER_USER_FAILED,
// } from "./actionTypes"

import { createSlice } from "@reduxjs/toolkit";

interface IAccountState {
  loading?: boolean;
  registrationError?: string;
  message?: string;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}
const initialState:IAccountState = {
  registrationError: '',
  message: '',
  loading: false,
  user: undefined,
  accessToken: '',
  refreshToken: '',
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    registerUser: (state) => {
      state.loading = true;
      state.registrationError = '';
    },
    registerUserSuccessful: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.registrationError = '';
    },
    registerUserFailed: (state, action) => {
      state.user = undefined;
      state.loading = false;
      state.registrationError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginSuccess, (state, action) => {
      if(action.payload){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
      state.loading = false;
    })
    builder.addCase(logoutUserSuccess, (state) => {
      state.user = undefined;
      state.accessToken = '';
      state.refreshToken = '';
      state.loading = false;
    })
  }
});

// Exportando las acciones
export const {
  registerUser,
  registerUserSuccessful,
  registerUserFailed,
} = accountSlice.actions;

// Exportando el reducer
export default accountSlice.reducer;

