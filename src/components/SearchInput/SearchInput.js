import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import AddressSelect from '../AddressSelect';
import { shopActions } from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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

const SearchInput = ({ searchStore }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    foodType: '',
    city: '',
    district: '',
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = e => {
    if (state.foodType === '' && state.city === '' && state.district === '') {
      return;
    }

    // searchStore(state);
  };

  return (
    <Paper className={classes.root}>
      <InputBase
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

const actionCreators = {
  searchStore: shopActions.searchStoreData,
};

export default connect(null, actionCreators)(SearchInput);
