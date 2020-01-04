import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField, Divider, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import useMountEffect from '../../helpers/useMountEffect';
import { externalActions } from '../../redux/actions';

const useStyles = makeStyles(theme => ({
  textField: {
    width: 75,
    '& div': {
      padding: theme.spacing(0.5),
    },
    '& label': {
      transform: 'translate(50%, 50%)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 65,
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
  addressInfo,
  getCounty,
  getDistrict,
  city,
  district,
  handleChange,
}) => {
  const classes = useStyles();
  useMountEffect(() => {
    if (addressInfo.county.length === 0) {
      getCounty();
    }
  });

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
        <MenuItem key="countyAll" value="">
          全部
        </MenuItem>
        {addressInfo.county.map(({ countyname, countycode }) => (
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
        <MenuItem key="districtAll" value="">
          全部
        </MenuItem>
        {addressInfo.district.map(({ towncode, townname }) => (
          <MenuItem key={towncode} value={townname.join()}>
            {townname.join()}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

AddressSelect.propTypes = {
  addressInfo: PropTypes.shape({
    county: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.object])
    ),
    district: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.object])
    ),
  }),
  getCounty: PropTypes.func.isRequired,
  getDistrict: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  return {
    addressInfo: {
      county: state.externalInfo.county,
      district: state.externalInfo.district,
    },
  };
}

const actionCreators = {
  getCounty: externalActions.getCounty,
  getDistrict: externalActions.getDistrict,
};

export default connect(mapStateToProp, actionCreators)(AddressSelect);
