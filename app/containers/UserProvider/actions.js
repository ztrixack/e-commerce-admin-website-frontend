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
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
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

export function getUser() {
  return {
    type: GET_USER_REQUEST,
  };
}
export function getUserSuccess(result) {
  return {
    type: GET_USER_SUCCESS,
    result,
  };
}
export function getUserFailure(error) {
  return {
    type: GET_USER_FAILURE,
    error,
  };
}
