import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { inputPageSaga } from './saga';
import { InputPageState } from './types';

export const initialState: InputPageState = {
  inputReducer: '',
  suggestions: [],
};

const slice = createSlice({
  name: 'inputPage',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    onChangeReducer(state, action: PayloadAction<string>) {
      state.inputReducer = action.payload;
    },
    getSuggestionsSuccess(state, action: PayloadAction<Array<any>>) {
      state.suggestions = action.payload;
    },
  },
});

export const { actions: inputPageActions } = slice;

export const useInputPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: inputPageSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useInputPageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
