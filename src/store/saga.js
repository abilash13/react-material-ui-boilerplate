import { all } from 'redux-saga/effects';
import HomeSagas from 'store/Home/sagas';

function* rootSaga() {
  yield all([HomeSagas]); // eslint-disable-line redux-saga/no-unhandled-errors
}

export default rootSaga;
