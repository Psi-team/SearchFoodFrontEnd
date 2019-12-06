import React, { useEffect } from 'react';
import { MenuItem, TextField, Divider, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { shopActions } from '../../actions';

const useStyles = makeStyles(theme => ({
  textField: {
    width: 70,
    [theme.breakpoints.down('sm')]: {
      width: 50,
    },
    '& > div': {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    '& .Mui-focused': {
      backgroundColor: 'transparent',
    },
    '& fieldset, & svg': {
      display: 'none',
    },
  },
  divider: {
    height: 28,
    margin: theme.spacing(0.5),
  },
  input: {
    color: '#4F576D',
  },
}));

const AddressSelect = ({
  storeInfo,
  getCounty,
  getDistrict,
  city,
  district,
  handleChange,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCounty();
  }, [getCounty]);

  useEffect(() => {
    if (city !== '') {
      getDistrict(city.split('-')[0]);
    }
  }, [city, getDistrict]);

  return (
    <>
      <TextField
        select
        label={city === '' ? '縣市' : ''}
        className={classes.textField}
        value={city}
        name="city"
        onChange={handleChange}
        InputLabelProps={{ shrink: false }}
        InputProps={{
          className: classes.input,
        }}
        variant="outlined"
      >
        {storeInfo.county.map(({ countyname, countycode }) => (
          <MenuItem key={countycode} value={`${countycode}-${countyname}`}>
            {countyname}
          </MenuItem>
        ))}
      </TextField>
      <Divider className={classes.divider} orientation="vertical" />
      <TextField
        select
        label={district === '' ? '區' : ''}
        className={classes.textField}
        value={district}
        name="district"
        onChange={handleChange}
        InputLabelProps={{ shrink: false }}
        InputProps={{
          className: classes.input,
        }}
        variant="outlined"
        disabled={city ? false : true}
      >
        {storeInfo.district.map(({ towncode, townname }) => (
          <MenuItem key={towncode} value={townname}>
            {townname}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

function mapStateToProp(state) {
  return {
    storeInfo: {
      county: state.storeInfo.county,
      district: state.storeInfo.district,
    },
  };
}

const actionCreators = {
  getCounty: shopActions.getCounty,
  getDistrict: shopActions.getDistrict,
};

export default connect(mapStateToProp, actionCreators)(AddressSelect);
