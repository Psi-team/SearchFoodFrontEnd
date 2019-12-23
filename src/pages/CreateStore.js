import React, { useState, useReducer, useEffect } from 'react';
import {
  Grid,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { shopActions, externalActions } from '../redux/actions';
import useMountEffect from '../helpers/useMountEffect';
// import StoreBasicInfo from '../components/StoreBasicInfo';
// import BusinessHours from '../components/BusinessHours';

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
  buttons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#F9F9F9',
    border: '1px solid #707070',
    borderRadius: '30px',
    font: 'Bold 24px/32px Microsoft JhengHei',
    letterSpacing: '3.2px',
    color: '#4F576D',
  },
  submit: {
    backgroundColor: '#4F576D',
    color: '#F9F9F9',
    '&:hover': {
      color: '#000',
    },
  },
}));

const CreateStorePage = ({
  getCounty,
  getDistrict,
  getStoreType,
  addressInfo,
  types,
  postStoreData,
}) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useReducer(reducer, initState);
  const history = useHistory();
  const classes = useStyles();
  useMountEffect(() => {
    if (addressInfo.county.length === 0) {
      getCounty();
    }

    if (types.length === 0) {
      getStoreType();
    }
  });
  // useEffect(() => {
  //   getCounty();
  //   getStoreType();
  // }, [getCounty, getStoreType]);

  // useEffect(() => {
  //   if (state.city) {
  //     getDistrict(state.city.split('-')[0]);
  //   }
  // }, [state.city, getDistrict]);

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
        <Grid item md={6}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
          quisquam iste dolorum dolorem perspiciatis. Porro qui nesciunt officia
          voluptas asperiores ut reprehenderit dicta magni nostrum, iste
          perspiciatis similique! Voluptate, eos.
        </Grid>
        <Grid item md={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          cupiditate mollitia natus sed hic minus reprehenderit, explicabo aut
          eveniet, libero, necessitatibus suscipit quis doloribus fuga. Dolor,
          deleniti consequuntur. Natus, delectus.
        </Grid>
      </Grid>
    </Paper>
  );
  // return addressInfo.loading ? (
  //   <CircularProgress />
  // ) : (
  //   <>
  //     <form onSubmit={handleSubmit} noValidate>
  //       <Grid container>
  //         <Grid item xs={12} sm={6}>
  //           <StoreBasicInfo
  //             state={state}
  //             setState={setState}
  //             storeInfo={addressInfo}
  //           />
  //         </Grid>
  //         <Grid item xs={12} sm={6}>
  //           <BusinessHours state={state.businessHours} setState={setState} />
  //         </Grid>
  //         <div className={classes.buttons}>
  //           <Button variant="contained" className={classes.button}>
  //             取消
  //           </Button>
  //           <Button
  //             variant="contained"
  //             className={`${classes.button} ${classes.submit}`}
  //             type="submit"
  //           >
  //             送出
  //           </Button>
  //         </div>
  //       </Grid>
  //     </form>
  //     <Dialog open={open}>
  //       {/* TODO: 建立成功繼續新增的話，欄位需清空，另需加入loading */}
  //       {createStore.error ? (
  //         <>
  //           <DialogTitle>{createStore.error}</DialogTitle>
  //           <DialogActions>
  //             <Button color="primary" onClick={backToHomePage}>
  //               取消建立
  //             </Button>
  //             <Button color="primary" autoFocus onClick={staySamePage}>
  //               修改
  //             </Button>
  //           </DialogActions>
  //         </>
  //       ) : (
  //         <>
  //           <DialogTitle>新增成功</DialogTitle>
  //           <DialogActions>
  //             <Button color="primary" onClick={staySamePage}>
  //               繼續新增
  //             </Button>
  //             <Button color="primary" autoFocus onClick={backToHomePage}>
  //               返回主頁
  //             </Button>
  //           </DialogActions>
  //         </>
  //       )}
  //     </Dialog>
  //   </>
  // );
};

function mapStateToProp(state) {
  return {
    addressInfo: state.externalInfo,
    loading: state.storeType.loading,
    types: state.storeType.types,
    error: state.storeType.error,
  };
}

const actionCreators = {
  getCounty: externalActions.getCounty,
  getDistrict: externalActions.getDistrict,
  getStoreType: shopActions.getStoreType,
  postStoreData: shopActions.postStoreData,
};

export default connect(mapStateToProp, actionCreators)(CreateStorePage);
