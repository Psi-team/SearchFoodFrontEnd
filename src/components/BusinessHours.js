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
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({}));

const BusinessHours = ({ state, setState }) => {
  const classes = useStyles();
  const initState = Object.keys(state).reduce(
    (accu, curr) => ({ ...accu, [curr]: false }),
    {}
  );
  const [checkedList, setCheckedList] = useState(initState);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({ start: '09:00', end: '21:00' });
  const handleCheckboxChange = e => {
    setCheckedList({ ...checkedList, [e.target.name]: e.target.checked });
  };

  const toggleDialog = (isConfirm = false) => {
    if (isConfirm) {
      const newTime =
        time.start === '' && time.end === ''
          ? 'off'
          : `${time.start}-${time.end}`;

      const isCheckedList = Object.keys(checkedList)
        .filter(_ => checkedList[_])
        .reduce(
          (accu, curr) => ({
            ...accu,
            [curr]: newTime,
          }),
          {}
        );
      // setState()
    }

    // cancel all checked
    setCheckedList(initState);
    setOpen(!open);
  };

  const handleTimeChange = e => {
    setTime({ ...time, [e.target.name]: e.target.value });
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
        {Object.entries(state).map(([key, value]) => {
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
        })}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogContent>
          <TextField
            id="time"
            label="起"
            type="time"
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
