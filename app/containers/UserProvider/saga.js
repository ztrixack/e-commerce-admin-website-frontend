// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, /* select, */ takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { UserAPI } from 'api';
import { AUTHENTICATION } from 'config/constants';

import { LOGIN_REQUEST, LOGOUT, GET_USER_REQUEST } from './constants';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  getUser,
  getUserSuccess,
  getUserFailure,
} from './actions';

function loginApi(credential) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.signin(credential);
      localStorage.setItem(AUTHENTICATION, JSON.stringify(response));
      resolve(response);
    } catch (e) {
      reject(e.response);
    }
  });
}
function logoutApi() {
  return new Promise(resolve => {
    localStorage.removeItem(AUTHENTICATION);
    resolve({});
  });
}

function* login({ credential }) {
  try {
    const result = yield call(loginApi, credential);
    yield put(loginSuccess(result));
    yield put(getUser());
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

function* getUserInfo() {
  try {
    const result = yield call(UserAPI.findById, { id: 'me' });
    yield put(getUserSuccess(result));
  } catch (e) {
    yield put(getUserFailure(e.response));
  }
}

export default function* userProviderSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(GET_USER_REQUEST, getUserInfo);
}
