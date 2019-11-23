import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  OutlinedInput,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textField: {
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    marginBottom: 25,
    opacity: 1,
    '& fieldset': {
      borderRadius: 30,
    },
  },
}));

const StoreBasicInfo = ({ state, dispatch }) => {
  const classes = useStyles();

  const handleChange = e => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">店家名稱</Typography>
      <OutlinedInput
        className={classes.textField}
        value={state.storename}
        onChange={handleChange}
        name="storename"
        required
      />
      <Typography variant="h4">店家類別</Typography>
      <OutlinedInput
        className={classes.textField}
        value={state.type}
        onChange={handleChange}
        name="type"
        required
      />
      <Typography variant="h4">店家電話</Typography>
      <OutlinedInput
        className={classes.textField}
        value={state.tel}
        onChange={handleChange}
        name="tel"
        required
      />
      <Typography variant="h4">店家地址</Typography>
      <OutlinedInput
        className={classes.textField}
        value={state.address}
        onChange={handleChange}
        name="address"
        fullWidth
        required
      />
    </Container>
  );
};

StoreBasicInfo.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default StoreBasicInfo;
