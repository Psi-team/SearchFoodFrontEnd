import React, { useEffect } from 'react';
import { MenuItem, TextField, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { shopActions } from '../../actions';

const useStyles = makeStyles(() => ({
  textField: {
    width: 100,
    '& > label': {
      color: 'rgba(0,0,0,0.4)',
    },
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
      <TextField
        select
        label={district === '' ? '區' : ''}
        className={classes.textField}
        value={district}
        name="district"
        onChange={handleChange}
        InputLabelProps={{ shrink: false }}
        InputProps={{
          // disableUnderline: true,
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
