import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import useMountEffect from '../../helpers/useMountEffect';
import AddressSelect from './AddressSelect';
import { shopActions } from '../../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 450,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  address: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchInput = ({ className, searchStores }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const params = new URLSearchParams(location.search);
  const [state, setState] = useState({
    foodType: params.get('foodType') || '',
    city: params.get('city') || '',
    district: params.get('district') || '',
  });
  const searchData = () => {
    if (state.foodType === '' && state.city === '' && state.district === '') {
      return;
    }

    searchStores({ ...state, city: state.city.split('-')[1] || '' });
  };

  useMountEffect(() => searchData());

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    searchData();
    history.push(
      `/search?foodType=${state.foodType}&city=${state.city}&district=${state.district}`
    );
  };

  return (
    <Paper className={`${classes.root} ${className}`}>
      <InputBase
        value={state.foodType}
        onChange={handleChange}
        name="foodType"
        className={classes.input}
        placeholder="搜尋店家"
        inputProps={{ 'aria-label': '搜尋店家' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <div className={classes.address}>
        <AddressSelect
          city={state.city}
          district={state.district}
          handleChange={handleChange}
        />
      </div>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="inherit"
        className={classes.iconButton}
        onClick={handleClick}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  searchStores: PropTypes.func.isRequired,
};

const actionCreators = {
  searchStores: shopActions.searchStores,
};

export default connect(null, actionCreators)(SearchInput);
