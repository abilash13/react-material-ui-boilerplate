import {
  FETCH_CAT_FACTS,
  FETCH_CAT_FACTS_BEGIN,
  FETCH_CAT_FACTS_SUCCESS,
  FETCH_CAT_FACTS_ERROR,
} from 'store/Home/constants';

export const fetchCatFacts = () => ({
  type: FETCH_CAT_FACTS,
});

export const fetchCatFactsBegin = () => ({
  type: FETCH_CAT_FACTS_BEGIN,
});

export const fetchCatFactsSuccess = catFacts => ({
  type: FETCH_CAT_FACTS_SUCCESS,
  catFacts,
});

export const fetchCatFactsError = error => ({
  type: FETCH_CAT_FACTS_ERROR,
  error,
});
