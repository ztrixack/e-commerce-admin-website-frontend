import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the staffLayout state domain
 */

const selectStaffLayoutDomain = state => state.staffLayout || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StaffLayout
 */

const makeSelectStaffLayout = () =>
  createSelector(
    selectStaffLayoutDomain,
    substate => substate,
  );

export default makeSelectStaffLayout;
export { selectStaffLayoutDomain };
