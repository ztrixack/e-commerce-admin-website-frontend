import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProvider state domain
 */

const selectUserProviderDomain = state => state.userProvider || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserProvider
 */

const makeSelectUserProvider = () =>
  createSelector(
    selectUserProviderDomain,
    substate => substate,
  );

export default makeSelectUserProvider;
export { selectUserProviderDomain };
