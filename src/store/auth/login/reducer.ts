/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAction, User } from "../../../Interfaces";

const initialState = {
  error: "",
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, _action) => {
      state.loading = true;
    },
    loginSuccess: (state, _action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
      state.loading = false;
      state.error = "";

    },
    logoutUser: (state, _action) => {
      // Aquí puedes realizar alguna acción si es necesario cuando se inicia el logout
      state = {
        ...state,
        loading: true,
      };
      return state;
    },
    logoutUserSuccess: (state) => {
      // Aquí puedes realizar alguna acción si es necesario cuando el logout es exitoso
      state = {
        ...state,
        loading: false,        
      };
      return state;
    },
    apiError: (state, action: IAction) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loginUser,
  loginSuccess,
  logoutUser,
  logoutUserSuccess,
  apiError,
} = loginSlice.actions;

export default loginSlice.reducer;

// Legacy code:
// const login = (state = initialState, action: IAction) => {
//   switch (action.type) {
//     case LOGIN_USER:
//       state = {
//         ...state,
//         loading: true,
//       }
//       break
//     case LOGIN_SUCCESS:
//       console.log({state}, {action})
//       state = {
//         ...state,
//         response : action.payload,
//         loading: false,
//       }
//       break
//     case LOGOUT_USER:
//       state = { ...state }
//       break
//     case LOGOUT_USER_SUCCESS:
//       state = { ...state }
//       break
//     case API_ERROR:
//       state = { ...state, error: action.payload, loading: false }
//       break
//     default:
//       state = { ...state }
//       break
//   }
//   return state
// }

// export default login
