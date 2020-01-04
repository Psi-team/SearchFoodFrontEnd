import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MobileStepper,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { shopActions } from '../redux/actions';
import useMountEffect from '../helpers/useMountEffect';
import StoreBasicInfo from '../components/Stores/StoreBasicInfo';
import StoreAdvancedInfo from '../components/Stores/StoreAdvancedInfo';
import BusinessHours from '../components/Stores/BusinessHours';
import Loading from '../components/Common/Loading';

const STEPS = ['店家基本資料', '店家進階資料', '店家營業時間'];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
      marginBottom: theme.spacing(7),
    },
  },
  content: {
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    display: 'flex',
    flexDirection: 'column',
  },
  btns: {
    display: 'flex',
    justifyContent: 'center',
    '& > button': {
      margin: theme.spacing(2),
    },
  },
  success: {
    fontSize: 24,
    textAlign: 'center',
  },
}));

const CreateStorePage = ({
  getStoreType,
  types,
  error,
  createStore,
  success,
  loading,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
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
    types: {},
    logo: null,
    images: null,
    slogan: '',
  });
  const match = useMediaQuery('(min-width: 600px)');
  const classes = useStyles();
  const history = useHistory();

  useMountEffect(() => {
    if (Object.keys(types).length === 0) {
      getStoreType();
    }
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    createStore({ ...state, city: state.city.split('-')[1] });
  };

  const backStep = () => {
    setActiveStep(activeStep - 1);
  };

  const nextStep = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 2) {
      handleSubmit();
    }
  };

  const backHomepage = () => {
    history.push('/');
  };

  return (
    <>
      <Paper component={Container} className={classes.root} spacing={3}>
        <Loading loading={loading} />
        <Typography variant="h3" paragraph align="center">
          新增店家
        </Typography>
        {error && (
          <Typography variant="h6" color="error" align="center" paragraph>
            {error}
          </Typography>
        )}
        <Container>
          {match ? (
            <Stepper activeStep={activeStep} alternativeLabel>
              {STEPS.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <MobileStepper
              activeStep={activeStep}
              steps={3}
              variant="text"
              backButton={
                <Button
                  onClick={backStep}
                  variant="outlined"
                  color="primary"
                  disabled={activeStep === 0}
                >
                  上一步
                </Button>
              }
              nextButton={
                <Button onClick={nextStep} variant="outlined" color="primary">
                  {activeStep === 2 ? '送出' : '下一步'}
                </Button>
              }
            >
              {STEPS.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </MobileStepper>
          )}
          <Container className={classes.content}>
            {activeStep === 0 ? (
              <StoreBasicInfo state={state} setState={handleChange} />
            ) : activeStep === 1 ? (
              <StoreAdvancedInfo
                match={match}
                types={types}
                state={state}
                setState={handleChange}
              />
            ) : (
              <BusinessHours
                state={state.businessHours}
                setState={handleChange}
              />
            )}
          </Container>
          {match && (
            <div className={classes.btns}>
              {activeStep !== 0 && (
                <Button onClick={backStep} variant="outlined" color="primary">
                  上一步
                </Button>
              )}
              <Button onClick={nextStep} variant="outlined" color="primary">
                {activeStep === 2 ? '送出' : '下一步'}
              </Button>
            </div>
          )}
        </Container>
      </Paper>
      <Dialog open={success} fullWidth>
        <DialogContent>
          <DialogContentText className={classes.success}>
            新增成功
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.btns}>
          <Button variant="contained" color="secondary" onClick={backHomepage}>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CreateStorePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  types: PropTypes.objectOf(PropTypes.array).isRequired,
  error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  success: PropTypes.bool.isRequired,
  getStoreType: PropTypes.func.isRequired,
  createStore: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  return {
    loading: state.createStore.loading || state.storeType.loading,
    types: state.storeType.types,
    error: state.createStore.error,
    success: state.createStore.success,
  };
}

const actionCreators = {
  getStoreType: shopActions.getStoreType,
  createStore: shopActions.createStore,
};

export default connect(mapStateToProp, actionCreators)(CreateStorePage);
