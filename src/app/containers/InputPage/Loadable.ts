/**
 *
 * Asynchronously loads the component for InputPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const InputPage = lazyLoad(
  () => import('./index'),
  module => module.InputPage,
);
