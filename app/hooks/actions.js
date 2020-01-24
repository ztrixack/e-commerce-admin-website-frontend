/*
 *
 * Hooks actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetch() {
  return {
    type: FETCH_REQUEST,
  };
}
export function fetchSuccess(result) {
  return {
    type: FETCH_SUCCESS,
    data: result,
  };
}
export function fetchFailure(error) {
  return {
    type: FETCH_FAILURE,
    error,
  };
}
