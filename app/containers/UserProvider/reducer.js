/*
 *
 * UserProvider reducer
 *
 */
import produce from 'immer';
import { ACCESS_TOKEN } from 'config/constants';
import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
} from './constants';

export const initialState = {
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN),
  data: false,
  error: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const userProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case LOGIN_REQUEST:
        draft.loading = true;
        draft.error = false;
        draft.isAuthenticated = false;
        draft.data = false;
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
        break;
      case LOGIN_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;

      case LOGOUT:
        draft.loading = true;
        draft.error = false;
        break;
      case LOGOUT_SUCCESS:
        draft.loading = false;
        draft.isAuthenticated = false;
        draft.data = false;
        break;

      default:
        break;
    }
  });

export default userProviderReducer;
