import React from 'react';
import {
  makeStyles,
  OutlinedInput,
  InputLabel,
  Typography,
  Button,
} from '@material-ui/core';

import AddressSelect from './AddressSelect';

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

const StoreBasicInfo = ({ state }) => {
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
        // onChange={handleChange}
        name="storename"
        fullWidth
        required
      />
      {/* <Typography variant="h6" color="textPrimary" className={classes.label}>
        販售美食種類
      </Typography>
      <Button variant="contained" color="secondary">
        click
      </Button> */}
      <InputLabel htmlFor="createSlogan" className={classes.label}>
        店家標語
      </InputLabel>
      <OutlinedInput
        autoComplete="off"
        id="createSlogan"
        value={state.slogan}
        // onChange={handleChange}
        name="storename"
        fullWidth
        required
      />
      <InputLabel htmlFor="createTel" className={classes.label}>
        店家電話
      </InputLabel>
      <OutlinedInput
        autoComplete="off"
        value={state.tel}
        // onChange={handleChange}
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
          handleChange={() => {}}
        />
        <OutlinedInput
          autoComplete="off"
          value={state.storename}
          // onChange={handleChange}
          name="storename"
          placeholder="地址"
          fullWidth
          required
        />
      </div>
    </>
  );
};

export default StoreBasicInfo;
