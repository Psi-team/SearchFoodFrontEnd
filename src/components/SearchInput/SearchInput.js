import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
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
  // const [addressDisplay, setAddressDisplay] = useState('none');
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
  // const toggleAddress = (e, isFocus) => {
  //   setAddressDisplay(isFocus ? 'block' : 'none');
  // };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="搜尋店家"
        inputProps={{ 'aria-label': '搜尋店家' }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={handleClick}
        color="inherit"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="inherit"
        className={classes.iconButton}
        aria-label="directions"
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
