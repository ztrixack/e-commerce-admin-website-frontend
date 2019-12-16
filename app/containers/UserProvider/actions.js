/*
 *
 * UserProvider actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function login(credential) {
  return {
    type: LOGIN_REQUEST,
    credential,
  };
}
export function loginSuccess(result) {
  return {
    type: LOGIN_SUCCESS,
    data: result,
  };
}
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function logout(options) {
  return {
    type: LOGOUT,
    options,
  };
}
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
