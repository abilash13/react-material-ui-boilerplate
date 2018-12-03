import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
});

class RandomCatFacts extends Component {
  state = {
    index: 0,
  };

  incrementIndex = () => {
    const { facts } = this.props;
    this.setState(prevState => {
      if (prevState.index + 1 === facts.length) {
        return { index: 0 };
      }
      return { index: prevState.index + 1 };
    });
  };

  render() {
    const { classes, facts } = this.props;
    const { index } = this.state;
    const fact = facts[index].text;

    return (
      <Card className={classes.card}>
        <CardHeader title="Random Cat Facts" />
        <CardContent>
          <Typography component="p">{fact}</Typography>
        </CardContent>
        <CardActions>
          <Button variat="contained" size="small" onClick={this.incrementIndex}>
            Another Random Cat Fact
          </Button>
        </CardActions>
      </Card>
    );
  }
}

RandomCatFacts.propTypes = {
  classes: PropTypes.object.isRequired,
  facts: PropTypes.array.isRequired,
};

export default withStyles(styles)(RandomCatFacts);
