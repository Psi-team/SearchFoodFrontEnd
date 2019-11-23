import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles(() => ({
  item: {
    height: 80,
    // margin: 10,
  },
  timeInput: {
    margin: '0 5%',
  },
  cross: {
    cursor: 'pointer',
    minWidth: 'auto',
    margin: 10,
  },
}));

const BusinessHours = ({ state, dispatch }) => {
  const classes = useStyles();

  const handleChange = e => {
    const [day, timeType] = e.target.name.split('-');
    const oldDayTime = state[day].split('-');
    let newDayTime = '';
    if (timeType === 'start') {
      newDayTime = e.target.value + '-' + oldDayTime[1];
    } else {
      newDayTime = oldDayTime[0] + '-' + e.target.value;
    }
    dispatch({ type: 'updateTime', payload: { ...state, [day]: newDayTime } });
  };

  const clearTimeClick = key => {
    dispatch({ type: 'updateTime', payload: { ...state, [key]: 'off' } });
  };

  const refreshTimeClick = key => {
    dispatch({
      type: 'updateTime',
      payload: { ...state, [key]: '09:30-21:30' },
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">營業時間</Typography>
      <List className={classes.root}>
        {Object.entries(state).map(([key, val]) => {
          const [startTime, endTime] = val.split('-');
          return (
            <ListItem key={key} className={classes.item}>
              <ListItemText primary={key} />
              {val === 'off' ? (
                <ListItemText primary="休息" />
              ) : (
                <>
                  <TextField
                    label="營業開始"
                    type="time"
                    name={`${key}-start`}
                    value={startTime}
                    onChange={handleChange}
                    className={classes.timeInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 1800, // 30 min
                    }}
                  />
                  <TextField
                    label="營業結束"
                    type="time"
                    name={`${key}-end`}
                    value={endTime}
                    onChange={handleChange}
                    className={classes.timeInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 1800, // 30 min
                    }}
                  />
                </>
              )}

              <Tooltip title="清除">
                <ListItemIcon
                  className={classes.cross}
                  onClick={() => clearTimeClick(key)}
                >
                  <CancelIcon />
                </ListItemIcon>
              </Tooltip>
              <Tooltip title="重設">
                <ListItemIcon
                  className={classes.cross}
                  onClick={() => refreshTimeClick(key)}
                >
                  <RefreshIcon />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

BusinessHours.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default BusinessHours;
