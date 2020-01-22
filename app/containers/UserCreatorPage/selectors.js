import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userCreatorPage state domain
 */

const selectUserCreatorPageDomain = state =>
  state.userCreatorPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserCreatorPage
 */

const makeSelectUserCreatorPage = () =>
  createSelector(
    selectUserCreatorPageDomain,
    substate => substate,
  );

export default makeSelectUserCreatorPage;
export { selectUserCreatorPageDomain };
