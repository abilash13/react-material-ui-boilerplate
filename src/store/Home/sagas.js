import { takeEvery, call, select, put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from 'store/Home/actions';
import { getCatFactsEndpoint } from 'store/AppConfig/selectors';
import { FETCH_CAT_FACTS } from 'store/Home/constants';

function* fetchCatFacts() {
  try {
    yield put(actions.fetchCatFactsBegin());
    const endpoint = yield select(getCatFactsEndpoint);
    const response = yield call(axios.get, endpoint);
    const catfacts = response.data.all;
    yield put(actions.fetchCatFactsSuccess(catfacts));
  } catch (error) {
    yield put(actions.fetchCatFactsError(error));
  }
}

export default [takeEvery(FETCH_CAT_FACTS, fetchCatFacts)];
