import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(10)}px 0`,
  },
  textField: {
    margin: theme.spacing(1),
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    marginBottom: 25,
    opacity: 1,
    height: 50,
    '& fieldset': {
      borderRadius: 30,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 300,
    '& fieldset': {
      borderRadius: 30,
    },
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: 30,
    border: '1px solid rgba(0,0,0,0.23)',
    width: 200,
    height: 50,
    marginBottom: 25,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  typeMajorText: {
    userSelect: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}));

const StoreBasicInfo = ({ state, setState, storeInfo }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentTypes, setCurrentTypes] = useState({
    parent: '',
    children: [],
  });
  const originType = useRef(state.type);
  const handleChange = e => {
    setState({ type: e.target.name, payload: e.target.value });
  };

  const openDialog = () => setOpen(true);

  const confirmDialog = isConfirm => {
    if (!isConfirm) {
      setState({ type: 'type', payload: originType.current });
    } else {
      originType.current = state.type;
    }
    setOpen(false);
  };

  const handleParentClick = parent => {
    setCurrentTypes({ parent, children: storeInfo.storeType[parent] });
  };

  const handleParentChange = e => {
    handleParentClick(e.target.name);

    const oldTypes = state.type;
    if (
      !oldTypes[e.target.name] ||
      oldTypes[e.target.name].length !==
        storeInfo['storeType'][e.target.name].length
    ) {
      setState({
        type: 'type',
        payload: {
          ...oldTypes,
          [e.target.name]: storeInfo['storeType'][e.target.name],
        },
      });
    } else {
      setState({
        type: 'type',
        payload: {
          ...oldTypes,
          [e.target.name]: [],
        },
      });
    }
  };

  const handleChildrenChange = (parent, children) => {
    const oldTypes = state.type;
    let newChildren = [];
    if (oldTypes[parent] && oldTypes[parent].includes(children)) {
      newChildren = oldTypes[parent].filter(kid => kid !== children);
    } else {
      newChildren = [...(oldTypes[parent] || []), children];
    }
    setState({ type: 'type', payload: { ...oldTypes, [parent]: newChildren } });
  };

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h5" gutterBottom={true}>
          店家名稱
        </Typography>
        <OutlinedInput
          className={classes.textField}
          value={state.storename}
          onChange={handleChange}
          name="storename"
          required
        />
        <Typography variant="h5" gutterBottom={true}>
          店家類別
        </Typography>
        <ButtonBase
          className={classes.button}
          onClick={openDialog}
          variant="outlined"
          component="div"
        >
          {Object.values(state.type).join('')}
        </ButtonBase>
        <Typography variant="h5" gutterBottom={true}>
          店家電話
        </Typography>
        <OutlinedInput
          className={classes.textField}
          value={state.tel}
          onChange={handleChange}
          name="tel"
          required
        />
        <Typography variant="h5" gutterBottom={true}>
          店家地址
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-city-native-simple">縣市</InputLabel>
          <Select
            className={classes.select}
            value={state.city}
            onChange={handleChange}
            inputProps={{ name: 'city' }}
          >
            {storeInfo.county.map(({ countyname, countycode }) => (
              <MenuItem key={countycode} value={`${countycode}-${countyname}`}>
                {countyname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-city-native-simple">區</InputLabel>
          <Select
            className={classes.select}
            value={state.district}
            onChange={handleChange}
            inputProps={{ name: 'district' }}
          >
            {storeInfo.district.map(({ towncode, townname }) => (
              <MenuItem key={towncode} value={townname}>
                {townname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <OutlinedInput
          className={classes.textField}
          value={state.address}
          onChange={handleChange}
          name="address"
          fullWidth
          required
        />
      </Container>
      <Dialog open={open} fullScreen={true}>
        <DialogTitle>店家類別</DialogTitle>
        <DialogContent>
          <DialogContentText>大類</DialogContentText>
          {Object.keys(storeInfo.storeType).map(majorType => (
            <DialogContentText key={majorType} component="span">
              <Checkbox
                checked={
                  state['type'][majorType]
                    ? state['type'][majorType].length ===
                      storeInfo['storeType'][majorType].length
                    : false
                }
                onChange={handleParentChange}
                name={majorType}
                color="primary"
              />
              <Typography
                className={classes.typeMajorText}
                onClick={() => handleParentClick(majorType)}
                component="span"
                variant="subtitle1"
              >
                {majorType}
              </Typography>
            </DialogContentText>
          ))}
          <DialogContentText>細項</DialogContentText>
          {currentTypes.children.map(type => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={
                    state['type'][currentTypes.parent]
                      ? state['type'][currentTypes.parent].includes(type)
                      : false
                  }
                  onChange={() =>
                    handleChildrenChange(currentTypes.parent, type)
                  }
                  color="primary"
                />
              }
              label={type}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => confirmDialog(false)}>
            Disagree
          </Button>
          <Button color="primary" onClick={() => confirmDialog(true)}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

StoreBasicInfo.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  return {
    storeType: state.storeType,
    createStore: state.createStore,
  };
}

export default connect(mapStateToProp)(StoreBasicInfo);
