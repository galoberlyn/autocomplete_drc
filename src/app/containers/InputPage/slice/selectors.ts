import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.inputPage || initialState;

export const selectInputPage = createSelector([selectSlice], state => state);

export const selectSuggestions = createSelector(
  [selectSlice],
  state => state.suggestions,
);
