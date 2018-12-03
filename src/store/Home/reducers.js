import { FETCH_CAT_FACTS_BEGIN, FETCH_CAT_FACTS_SUCCESS, FETCH_CAT_FACTS_ERROR } from 'store/Home/constants';

const initialHomeData = {
  catFactsLoading: true,
  catFacts: [],
  catFactsError: undefined,
};

export default (state = initialHomeData, action) => {
  switch (action.type) {
    case FETCH_CAT_FACTS_BEGIN:
      return {
        ...state,
        catFactsLoading: true,
        catFactsError: undefined,
      };
    case FETCH_CAT_FACTS_SUCCESS:
      return {
        ...state,
        catFactsLoading: false,
        catFacts: action.catFacts,
      };
    case FETCH_CAT_FACTS_ERROR:
      return {
        ...state,
        catFactsLoading: false,
        catFactsError: action.error,
      };
    default:
      return state;
  }
};
