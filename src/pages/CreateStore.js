import React, { useState, useReducer, useRef } from 'react';
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
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { shopActions, externalActions } from '../redux/actions';
import useMountEffect from '../helpers/useMountEffect';
import StoreBasicInfo from '../components/StoreBasicInfo';
import StoreAdvancedInfo from '../components/StoreAdvancedInfo';
import BusinessHours from '../components/BusinessHours';
const STEPS = ['店家基本資料', '店家照片', '店家營業時間'];
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
}));

const CreateStorePage = ({ getStoreType, types, postStoreData }) => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useReducer(reducer, initState);
  const match = useMediaQuery('(min-width: 600px)');
  const history = useHistory();
  const classes = useStyles();

  useMountEffect(() => {
    if (Object.keys(types).length === 0) {
      getStoreType();
    }
  });

  const backStep = () => {
    setActiveStep(activeStep - 1);
  };

  const nextStep = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setOpen(true);
    postStoreData({ ...state, city: state.city.split('-')[1] });
  };

  return (
    <Paper component={Container} className={classes.root} spacing={3}>
      <Typography variant="h3" paragraph align="center">
        新增店家
      </Typography>
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
                下一步
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
            <StoreBasicInfo state={state} />
          ) : activeStep === 1 ? (
            <StoreAdvancedInfo match={match} types={types} />
          ) : (
            <BusinessHours state={state.businessHours} setState={() => {}} />
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
