import React, { useState } from 'react';
import { InputBase, makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import AddressSelect from '../AddressSelect';
import { shopActions } from '../../actions';

const useStyles = makeStyles(theme => ({
  search: {
    // position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.65),
    // },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  address: {},
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 3, 1, 1),
    transition: theme.transitions.create('width'),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: 150,
      // '&:focus': {
      //   width: 200,
      // },
    },
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

    searchStore(state);
  };
  // const toggleAddress = (e, isFocus) => {
  //   setAddressDisplay(isFocus ? 'block' : 'none');
  // };

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="搜尋食物"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={state.name}
        // onFocus={e => toggleAddress(e, true)}
        onChange={handleChange}
        name="foodType"
        inputProps={{ 'aria-label': 'search' }}
      />
      <div className={classes.address}>
        <AddressSelect
          city={state.city}
          district={state.district}
          handleChange={handleChange}
        />
      </div>
      <div className={classes.searchIcon} onClick={handleClick}>
        <SearchIcon />
      </div>
    </div>
  );
};

const actionCreators = {
  searchStore: shopActions.searchStoreData,
};

export default connect(null, actionCreators)(SearchInput);
