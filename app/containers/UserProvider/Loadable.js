/**
 *
 * Asynchronously loads the component for UserProvider
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
