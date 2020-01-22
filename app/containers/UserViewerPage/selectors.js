import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userViewerPage state domain
 */

const selectUserViewerPageDomain = state =>
  state.userViewerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserViewerPage
 */

const makeSelectUserViewerPage = () =>
  createSelector(
    selectUserViewerPageDomain,
    substate => substate,
  );

export default makeSelectUserViewerPage;
export { selectUserViewerPageDomain };
