// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, /* select, */ takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { UserAPI } from 'api';
import { ACCESS_TOKEN } from 'config/constants';

import { LOGIN_REQUEST, LOGOUT } from './constants';
import { loginSuccess, loginFailure, logoutSuccess } from './actions';

function loginApi(credential) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.login(credential);
      localStorage.setItem(ACCESS_TOKEN, JSON.stringify(response));
      resolve(response);
    } catch (e) {
      reject(e.response);
    }
  });
}
function logoutApi() {
  return new Promise(resolve => {
    localStorage.removeItem(ACCESS_TOKEN);
    resolve({});
  });
}

function* login({ credential }) {
  try {
    const result = yield call(loginApi, credential);
    yield put(loginSuccess(result));
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* logout({ options }) {
  yield call(logoutApi);
  yield put(logoutSuccess());
  if (options === undefined || options.redirect) {
    yield put(push('/'));
  }
}

export default function* userProviderSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT, logout);
}
