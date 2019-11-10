import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, FormControl, InputLabel,
  Select, MenuItem, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { shopActions } from '../../actions';
import Dialog from '../../components/Dialog';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  addressWrap: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const CreateStorePage = ({
  county,
  district,
  error,
  storeType,
  getCountry,
  getDistrict,
  getLatLong,
  getStoreType }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    storename: '',
    tel: '',
    businessTime: '',
    city: '',
    district: '',
    address: '',
    type: {}
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCountry();
    getStoreType();
  }, [getCountry, getStoreType]);

  useEffect(() => {
    if (state.city) {
      getDistrict(state.city);
    }
  }, [state.city, getDistrict]);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  function hadnleSubmit(e) {
    e.preventDefault();
    getLatLong(state.city + state.district + state.address);
  }

  function openTypeDialog() {
    setOpen(true);
  }

  function closeTypeDialog() {
    setOpen(false);
  }

  return (
    <form
      className={classes.container}
      autoComplete='off'
      onSubmit={hadnleSubmit}
      noValidate >
      <Typography variant='h1'>新增店家</Typography>
      <TextField
        id="filled-storename-input"
        label="店名"
        type='storename'
        className={classes.textField}
        value={state.storename}
        onChange={handleChange}
        name='storename'
        margin="normal"
        variant="filled"
        required />
      <FormControl variant="outlined" className={classes.formControl} disabled>
        <InputLabel htmlFor="outlined-city-native-simple">
          店家類別
        </InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
          onClick={openTypeDialog}
        >
        </Select>
      </FormControl>
      <TextField
        id="filled-tel-input"
        label="店家電話"
        type='tel'
        className={classes.textField}
        value={state.tel}
        onChange={handleChange}
        name='tel'
        margin="normal"
        variant="filled"
        required />
      <TextField
        id="filled-tel-input"
        label="營業時間"
        type='businessTime'
        className={classes.textField}
        value={state.businessTime}
        onChange={handleChange}
        name='businessTime'
        margin="normal"
        variant="filled"
        required />
      <div className={classes.addressWrap}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-city-native-simple">
            縣市
          </InputLabel>
          <Select
            value={state.city}
            onChange={handleChange}
            inputProps={{ name: 'city', id: 'outlined-city-native-simple' }}>
            {
              county.map(({ countyname, countycode }) =>
                <MenuItem key={countycode} value={countycode}>
                  {countyname}
                </MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          disabled={district.length === 0}>
          <InputLabel htmlFor="outlined-district-native-simple">
            地區
          </InputLabel>
          <Select
            value={state.district}
            onChange={handleChange}
            inputProps={{ name: 'district', id: 'outlined-district-native-simple' }}>
            {
              district.map(({ towncode, townname }) =>
                <MenuItem key={towncode} value={towncode}>
                  {townname}
                </MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          id="filled-address-input"
          label="地址"
          type='address'
          className={classes.textField}
          value={state.address}
          onChange={handleChange}
          name='address'
          variant="filled"
          disabled={!(state.city && state.district)}
          required />
      </div>
      <Box>
        <Button
          variant="contained"
          className={classes.button}
          type='submit'>
          新增
        </Button>
      </Box>
      <Dialog
        open={open}
        title='類別種類'
        onCancel={closeTypeDialog}
        onSubmit={closeTypeDialog}
      >
        {
          Object.keys(storeType).map(key => (
            <div key={key.toString()}>
              <Typography>{key}</Typography>
              {
                storeType[key].map(type => (
                  <Typography key={type.toString()}>{type}</Typography>
                ))
              }
            </div>
          ))
        }
      </Dialog>
    </form>
  );
}

function mapStateToProp(state) {
  return {
    ...state.county,
    storeType: state.storeType
  }
}

const actionCreators = {
  getCountry: shopActions.getCountry,
  getDistrict: shopActions.getDistrict,
  getLatLong: shopActions.addressToLatLong,
  getStoreType: shopActions.getStoreType
};

export default connect(mapStateToProp, actionCreators)(CreateStorePage);