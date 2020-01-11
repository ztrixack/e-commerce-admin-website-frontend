import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminLayout state domain
 */

const selectAdminLayoutDomain = state => state.adminLayout || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminLayout
 */

const makeSelectAdminLayout = () =>
  createSelector(
    selectAdminLayoutDomain,
    substate => substate,
  );

export default makeSelectAdminLayout;
export { selectAdminLayoutDomain };
