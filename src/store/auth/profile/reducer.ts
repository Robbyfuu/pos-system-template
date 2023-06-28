// import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG } from "./actionTypes";
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  error: "",
  success: "",
};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
      editProfile: (_state) => {
          // Aquí puedes realizar alguna acción si es necesario cuando se inicia la edición
      },
      profileSuccess: (state, action) => {
          state.success = action.payload;
      },
      profileError: (state, action) => {
          state.error = action.payload;
      },
      // resetProfileFlag: (state) => {
      //     state.success = null;
      // }
  }
});
// Exporta los action creators que fueron generados automáticamente
export const { editProfile, profileSuccess, profileError } = profileSlice.actions;

// Exporta el reducer
export default profileSlice.reducer;

// Legacy code
// const profile = (state = initialState, action) => {
//   switch (action.type) {
//     case EDIT_PROFILE:
//       state = { ...state };
//       break;
//     case PROFILE_SUCCESS:
//       state = { ...state, success: action.payload };
//       break;
//     case PROFILE_ERROR:
//       state = { ...state, error: action.payload };
//       break;
//     case RESET_PROFILE_FLAG:
//       state = { ...state, success: null };
//       break;
//     default:
//       state = { ...state };
//       break;
//   }
//   return state;
// };

// export default profile;
