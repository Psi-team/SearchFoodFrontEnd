import React, { useState, useReducer, useRef } from 'react';
import {
  Grid,
  OutlinedInput,
  makeStyles,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { shopActions, externalActions } from '../redux/actions';
import useMountEffect from '../helpers/useMountEffect';
import AddressSelect from '../components/AddressSelect';
import UploadImage from '../components/UploadImage';
import BusinessHours from '../components/BusinessHours';

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
    case 'city':
      return {
        ...state,
        city: action.payload,
      };
    case 'district':
      return {
        ...state,
        district: action.payload,
      };
    case 'type':
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
  },
  address: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 30,
    border: '1px solid #ccc',
    backgroundColor: '#F9F9F9',
    '& fieldset': {
      display: 'none',
    },
  },
  images: {
    display: 'flex',
    alignItems: 'center',
  },
  businessHours: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const CreateStorePage = ({ getStoreType, types, postStoreData }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useReducer(reducer, initState);
  const history = useHistory();
  const classes = useStyles();

  useMountEffect(() => {
    if (types.length === 0) {
      getStoreType();
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    setOpen(true);
    postStoreData({ ...state, city: state.city.split('-')[1] });
  };

  const backToHomePage = e => {
    setOpen(false);
    history.push('/');
  };

  const staySamePage = e => {
    setOpen(false);
  };

  return (
    <Paper component={Container} className={classes.root} spacing={3}>
      <Typography variant="h3" paragraph align="center">
        新增店家
      </Typography>
      <Grid container>
        <Grid item md={6} className={classes.container}>
          <OutlinedInput
            autoComplete="off"
            value={state.storename}
            // onChange={handleChange}
            name="storename"
            placeholder="店名"
            fullWidth
            required
          />
          <OutlinedInput
            autoComplete="off"
            value={state.storename}
            // onChange={handleChange}
            name="storename"
            placeholder="slogan"
            fullWidth
            required
          />
          <OutlinedInput
            autoComplete="off"
            value={state.storename}
            // onChange={handleChange}
            name="storename"
            placeholder="電話"
            fullWidth
            required
          />
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
          <div className={classes.images}>
            <UploadImage
              uniqueId="logoImage"
              btnName="Logo"
              handleChange={() => {}}
            />
          </div>
          <div className={classes.images}>
            <UploadImage
              uniqueId="pictureImage"
              btnName="店家照片"
              appendCallback={() => {}}
              removeCallback={() => {}}
            />
          </div>
        </Grid>
        <Grid item md={6} className={classes.businessHours}>
          <Typography variant="h5" paragraph align="center">
            營業時間
          </Typography>
          <BusinessHours state={state.businessHours} setState={setState} />
        </Grid>
      </Grid>
    </Paper>
  );
};

function mapStateToProp(state) {
  return {
    loading: state.storeType.loading,
    types: state.storeType.types,
    error: state.storeType.error,
  };
}

const actionCreators = {
  getStoreType: shopActions.getStoreType,
  postStoreData: shopActions.postStoreData,
};

export default connect(mapStateToProp, actionCreators)(CreateStorePage);
