import React from 'react';
import {
  makeStyles,
  OutlinedInput,
  InputLabel,
  Typography,
} from '@material-ui/core';

import AddressSelect from '../Common/AddressSelect';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 20,
    margin: theme.spacing(2),
    color: '#000',
  },
  address: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
}));

const StoreBasicInfo = ({ state, setState }) => {
  const classes = useStyles();

  return (
    <>
      <InputLabel htmlFor="createStorename" className={classes.label}>
        店名
      </InputLabel>
      <OutlinedInput
        id="createStorename"
        autoComplete="off"
        value={state.storename}
        onChange={setState}
        name="storename"
        fullWidth
        required
      />
      <InputLabel htmlFor="createSlogan" className={classes.label}>
        店家標語
      </InputLabel>
      <OutlinedInput
        autoComplete="off"
        id="createSlogan"
        value={state.slogan}
        onChange={setState}
        name="slogan"
        fullWidth
        required
      />
      <InputLabel htmlFor="createTel" className={classes.label}>
        店家電話
      </InputLabel>
      <OutlinedInput
        autoComplete="off"
        value={state.tel}
        onChange={setState}
        name="tel"
        id="createTel"
        fullWidth
        required
      />
      <Typography variant="h6" color="textPrimary" className={classes.label}>
        店家住址
      </Typography>
      <div className={classes.address}>
        <AddressSelect
          city={state.city}
          district={state.district}
          handleChange={setState}
        />
        <OutlinedInput
          autoComplete="off"
          value={state.address}
          onChange={setState}
          name="address"
          placeholder="地址"
          fullWidth
          required
        />
      </div>
    </>
  );
};

export default StoreBasicInfo;
