import React, { useReducer } from 'react';
import { Grid } from '@material-ui/core';

import StoreBasicInfo from './StoreBasicInfo';
import BusinessHours from './BusinessHours';

const initState = {
  storename: '',
  tel: '',
  businessHours: {
    星期一: '09:30-18:30',
    星期二: '09:30-18:30',
    星期三: '09:30-18:30',
    星期四: '09:30-18:30',
    星期五: '09:30-18:30',
    星期六: 'off',
    星期日: 'off',
  },
  city: '',
  district: '',
  address: '',
  type: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateTime':
      return {
        ...state,
        businessHours: action.payload,
      };
    case 'storename':
      return {
        ...state,
        storename: action.payload,
      };
    case 'tel':
      return {
        ...state,
        tel: action.payload,
      };
    case 'address':
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <StoreBasicInfo state={state} dispatch={dispatch} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <BusinessHours state={state.businessHours} dispatch={dispatch} />
      </Grid>
    </Grid>
  );
};
