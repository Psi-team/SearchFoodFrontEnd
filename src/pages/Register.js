import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  OutlinedInput,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Button,
  makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { userActions } from '../redux/actions';
import AccountView from '../components/Users/AccountView';
import Loading from '../components/Common/Loading';

const useStyles = makeStyles(theme => ({
  radios: {
    flexDirection: 'row',
    paddingLeft: theme.spacing(2),
    color: theme.palette.secondary.light,
  },
}));

const yearOptions = () => {
  const nowYear = new Date().getFullYear();
  const arr = [];
  for (let i = nowYear - 100; i < nowYear; i++)
    arr.push(
      <MenuItem key={i.toString()} value={i}>
        {i}
      </MenuItem>
    );

  return arr.reverse();
};

const Register = ({ loading, register, error }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    nickname: '',
    passwd1: '',
    passwd2: '',
    birthYear: '',
    sexual: '0',
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    register({ ...state });
  };

  return (
    <AccountView handleSubmit={handleSubmit}>
      <Typography variant="h4" color="primary" align="center" paragraph>
        註冊
      </Typography>
      <RadioGroup
        aria-label="sexual"
        name="sexual"
        value={state.sexual}
        onChange={handleChange}
        className={classes.radios}
      >
        <FormControlLabel value="0" control={<Radio />} label="Male" />
        <FormControlLabel value="1" control={<Radio />} label="Female" />
      </RadioGroup>
      <OutlinedInput
        autoComplete="off"
        value={state.email}
        onChange={handleChange}
        name="email"
        placeholder="email"
        fullWidth
        required
      />
      <OutlinedInput
        autoComplete="off"
        value={state.nickname}
        onChange={handleChange}
        name="nickname"
        placeholder="暱稱"
        fullWidth
        required
      />
      <OutlinedInput
        autoComplete="off"
        type="password"
        value={state.passwd1}
        onChange={handleChange}
        name="passwd1"
        placeholder="password"
        fullWidth
        required
      />
      <OutlinedInput
        autoComplete="off"
        type="password"
        value={state.passwd2}
        onChange={handleChange}
        name="passwd2"
        placeholder="password"
        fullWidth
        required
      />
      <TextField
        select
        label={state.birthYear === '' ? '出生年' : ''}
        className={classes.textField}
        value={state.birthYear}
        name="birthYear"
        onChange={handleChange}
        InputLabelProps={{ shrink: false }}
        InputProps={{
          className: classes.input,
        }}
        variant="outlined"
        fullWidth
      >
        {yearOptions()}
      </TextField>
      {error && (
        <Typography variant="h6" color="error" align="center" paragraph>
          {error}
        </Typography>
      )}
      <Button size="large" fullWidth variant="contained" type="submit">
        送出
      </Button>
      <Loading loading={loading} />
    </AccountView>
  );
};

Register.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.string]),
  register: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  const { loading, error } = state.user;
  return { loading, error };
}

const actionCreators = {
  register: userActions.register,
};

export default connect(mapStateToProp, actionCreators)(Register);
