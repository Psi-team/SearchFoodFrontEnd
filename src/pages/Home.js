import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container } from '@material-ui/core';
import { connect } from 'react-redux';

// import { userActions } from '../../actions';
// import useMountEffect from '../../helpers/useMountEffect';
import SearchInput from '../components/Common/SearchInput';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  search: {
    margin: 'auto',
  },
}));

const Home = ({ getUserLocation }) => {
  const classes = useStyles();
  // useMountEffect(() => getUserLocation());

  return (
    <Container className={classes.root}>
      <SearchInput className={classes.search} />
    </Container>
  );
};

Home.propTypes = {
  getUserLocation: PropTypes.func.isRequired,
};

const actionCreators = {
  getUserLocation: () => {}, //userActions.getUserLocation,
};

export default connect(null, actionCreators)(Home);
