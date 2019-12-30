import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const WEEKDAYORDER = {
  星期一: 0,
  星期二: 1,
  星期三: 2,
  星期四: 3,
  星期五: 4,
  星期六: 5,
  星期日: 6,
};
const useStyles = makeStyles(theme => ({
  timeContainer: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    '& > div': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const BusinessHours = ({ state, setState }) => {
  const CHECKEDLISTINITSTATE = Object.keys(state).reduce(
    (accu, curr) => ({ ...accu, [curr]: false }),
    {}
  );
  const TIMEINITSTATE = { start: '09:00', end: '21:00' };
  const classes = useStyles();
  const [checkedList, setCheckedList] = useState(CHECKEDLISTINITSTATE);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(TIMEINITSTATE);
  const handleCheckboxChange = e => {
    setCheckedList({ ...checkedList, [e.target.name]: e.target.checked });
  };

  const toggleDialog = (isConfirm = false) => {
    if (isConfirm) {
      const newTime =
        time.start === '' && time.end === ''
          ? 'off'
          : `${time.start}-${time.end}`;

      const changedList = Object.keys(checkedList)
        .filter(_ => checkedList[_])
        .reduce(
          (accu, curr) => ({
            ...accu,
            [curr]: newTime,
          }),
          {}
        );

      setState({
        target: {
          name: 'businessHours',
          value: {
            ...state,
            ...changedList,
          },
        },
      });
      // reset state
      setCheckedList(CHECKEDLISTINITSTATE);
      setTime(TIMEINITSTATE);
    }

    setOpen(!open);
  };

  const handleTimeChange = e => {
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  const setOffday = () => {
    setTime({ start: '', end: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="body2" align="center">
        (多選可一次設置多天時間)
      </Typography>
      <List>
        {Object.entries(state)
          .map(([key, value], idx) => {
            const labelId = `checkbox-list-label-${key}`;
            return (
              <ListItem key={key} role={undefined}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkedList[key]}
                    name={key}
                    onChange={handleCheckboxChange}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${key}: ${value}`} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => toggleDialog(false)}
                    disabled={!checkedList[key]}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
          .sort((a, b) => (WEEKDAYORDER[a.key] > WEEKDAYORDER[b.key] ? 1 : -1))}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent className={classes.timeContainer}>
          <TextField
            id="time"
            label="起"
            type="time"
            fullWidth
            value={time.start}
            name="start"
            onChange={handleTimeChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1800, // 30 min
            }}
          />
          <TextField
            id="time"
            label="迄"
            type="time"
            fullWidth
            name="end"
            onChange={handleTimeChange}
            value={time.end}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1800, // 30 min
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={setOffday}
            fullWidth
          >
            休息
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialog(false)} color="primary">
            取消
          </Button>
          <Button onClick={() => toggleDialog(true)} color="primary" autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

BusinessHours.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
};

export default BusinessHours;
