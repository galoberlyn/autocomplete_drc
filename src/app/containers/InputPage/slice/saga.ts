import { call, put, takeLatest } from 'redux-saga/effects';
import { inputPageActions as actions, inputPageActions } from '.';
import { getSuggestions } from './api';

function* suggestionsSaga(actions) {
  const { payload } = actions;
  try {
    const result = yield call(getSuggestions, payload);
    yield put(inputPageActions.getSuggestionsSuccess(result.data));
  } catch (error) {
    console.log(error);
  }
}

export function* inputPageSaga() {
  yield takeLatest(actions.onChangeReducer.type, suggestionsSaga);
}
