import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

//Include Both Helper File with needed methods
import {
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";

// initialize relavant method of both Auth

// Is user register successfull then direct plot user in redux.
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/src/Interfaces";

function* registerUser({ payload: { user } }: PayloadAction<{ user: User }>) {
  console.log("using the following url for registration: ");
  try {
    console.log("Trying to register user (within try block)");
    const response: ResponseType = yield call(postJwtRegister, "/post-jwt-register", user);
    yield put(registerUserSuccessful(response));
  } catch (error) {
    console.log("There was an error registering: ", error);
    yield put(registerUserFailed(error));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER as any, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
