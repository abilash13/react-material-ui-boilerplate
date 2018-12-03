import { bindActionCreators } from 'redux';
import { fetchCatFacts } from 'store/Home/actions';
import { getCatFactsLoading, getCatFacts, getCatFactsError } from 'store/Home/selectors';
import { connect } from 'react-redux';

import component from 'routes/Home/containers/Home';

const mapDispatchToProps = dispatch => bindActionCreators({ fetchCatFacts }, dispatch);

const mapStateToProps = state => ({
  catFactsLoading: getCatFactsLoading(state),
  catFacts: getCatFacts(state),
  catFactsError: getCatFactsError(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component);
