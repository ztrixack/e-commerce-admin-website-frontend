/*
 *
 * Hook reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  data: null,
};

/* eslint-disable default-case, no-param-reassign */
const dataFetchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case FETCH_REQUEST:
        draft.loading = true;
        draft.data = null;
        draft.error = null;
        break;
      case FETCH_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        break;
      case FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });

export { dataFetchReducer };
