/* eslint-disable @typescript-eslint/no-explicit-any */
import { message, notification } from "antd";

import { call, put, takeEvery } from "redux-saga/effects";


import { apiError, loginSuccess, logoutUserSuccess , loginUser as actionLoginUser , logoutUser as actionLogoutUser } from "./reducer"


import {
  postJwtLogin,
} from "../../../helpers/fakebackend_helper";

import { UserResponse } from "../../../Interfaces";

interface action {
  payload: {
    user?: Record<string, unknown>,
    history: (path: string) => void,
  }
}

function* loginUser({ payload: { user, history } } : action  ) {
  try {
    if(!user) return;
      const response: UserResponse = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
      if(response.user){
        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginSuccess(response));
        notification.success({
          message: "Bienvenido",
          description: "Has iniciado sesión correctamente",
          type: "success",
          duration: 2
        });

        history('/dashboard');
      }
  } catch (error) {

    notification.error({
      message: "Inicio de sesión incorrecto",
      description: "Verifique sus credenciales",
      type: "error",
      duration: 3
    });
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }: action) {
  try {
    localStorage.removeItem("authUser");
    yield put (logoutUserSuccess());
    notification.info({
      message: "Cierre de sesión",
      description: "Has cerrado sesión correctamente",
      type: "info",
      duration: 2
    });

    history('/login');
  } catch (error) {
    notification.error({
      message: "Cierre de sesión incorrecto",
      description: "Contacte al administrador",
      type: "error",
      duration: 3
    });
    yield put(apiError(error));
  }
}



function* authSaga() {
  yield takeEvery(actionLoginUser, loginUser);
  yield takeEvery(actionLogoutUser, logoutUser);
}

export default authSaga;
