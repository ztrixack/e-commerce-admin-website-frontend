import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userEditorPage state domain
 */

const selectUserEditorPageDomain = state =>
  state.userEditorPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserEditorPage
 */

const makeSelectUserEditorPage = () =>
  createSelector(
    selectUserEditorPageDomain,
    substate => substate,
  );

export default makeSelectUserEditorPage;
export { selectUserEditorPageDomain };
