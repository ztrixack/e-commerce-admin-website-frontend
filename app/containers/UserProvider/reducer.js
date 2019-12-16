/*
 *
 * UserProvider reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  ACCESS_TOKEN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
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

      case GET_USER_REQUEST:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        break;
      case GET_USER_SUCCESS:
        draft.loading = false;
        draft.data = action.result;
        break;
      case GET_USER_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });

export default userProviderReducer;
