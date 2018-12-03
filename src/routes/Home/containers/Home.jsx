import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';

import RandomCatFact from 'routes/Home/components/RandomCatFact';

const styles = theme => ({
  root: {
    height: '100vh',
    background: `url(http://thepatternlibrary.com/img/am.jpg)`,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    padding: theme.spacing.unit,
  },
});

class Home extends Component {
  componentDidMount() {
    const { fetchCatFacts } = this.props;
    fetchCatFacts();
  }

  renderRandomCatFact = () => {
    const { classes, catFactsLoading, catFacts, catFactsError } = this.props;
    if (catFactsLoading) {
      return <CircularProgress />;
    }

    if (catFactsError) {
      return (
        <Card className={classes.error}>{`Oops. Failed to fetch random cat facts due to: ${
          catFactsError.message
        }`}</Card>
      );
    }

    return <RandomCatFact facts={catFacts} />;
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item md={4} />
        <Grid item md={4} className={classes.container}>
          {this.renderRandomCatFact()}
        </Grid>
        <Grid item md={4} />
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  catFactsLoading: PropTypes.bool,
  catFacts: PropTypes.array.isRequired,
  catFactsError: PropTypes.object,
  fetchCatFacts: PropTypes.func.isRequired,
};

Home.defaultProps = {
  catFactsLoading: false,
  catFactsError: undefined,
};

export default withStyles(styles)(Home);
