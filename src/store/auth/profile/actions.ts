import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG } from "./actionTypes"

export const editProfile = (user: { username: string; idx: string | number }) => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  }
}

export const profileSuccess = (msg: any) => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = (error: any) => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = (_error: undefined) => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}
