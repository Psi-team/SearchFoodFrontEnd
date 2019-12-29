import React, { useState } from 'react';
import {
  makeStyles,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
  TextField,
} from '@material-ui/core';

import UploadImage from './UploadImage';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    '& > h6': {
      marginRight: theme.spacing(4),
    },
    '& > button': {
      width: 150,
    },
  },
  typesContainer: {
    '& > div': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const StoreAdvancedInfo = ({ match, types }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState(null);
  const [checkedList, setCheckedList] = useState(
    Object.entries(types).reduce((accu, [key, value]) => {
      const items = value.reduce(
        (accu, curr) => ({ ...accu, [curr]: false }),
        {}
      );
      return { ...accu, [key]: items };
    }, {})
  );
  console.log(checkedList);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleParentChange = (e, major) => {
    setParent(major);
    setCheckedList({
      ...checkedList,
      [major]: Object.keys(checkedList[major]).reduce(
        (accu, curr) => ({
          ...accu,
          [curr]: e.target.checked,
        }),
        {}
      ),
    });
  };

  const handleChildrenChange = (e, minor) => {
    setCheckedList({
      ...checkedList,
      [parent]: {
        ...checkedList[parent],
        [minor]: e.target.checked,
      },
    });
  };

  return (
    <>
      <div className={classes.item}>
        <Typography variant="h6">美食種類</Typography>
        <Button variant="contained" color="secondary" onClick={toggleDialog}>
          選擇
        </Button>
        <TextField varient="outlined" disabled fullWidth>
          {
            // Object.values(checkedList)
            // .filter(item => Object.values(item)[0])
          }
        </TextField>
      </div>
      <div className={classes.item}>
        <Typography variant="h6">店家封面</Typography>
        <UploadImage
          uniqueId="logoImage"
          btnName="選擇"
          appendCallback={() => {}}
          removeCallback={() => {}}
        />
      </div>
      <div className={classes.item}>
        <Typography variant="h6">其他照片</Typography>
        <UploadImage
          uniqueId="pictureImage"
          btnName="選擇"
          appendCallback={() => {}}
          removeCallback={() => {}}
        />
      </div>
      <Dialog
        fullWidth
        fullScreen={!match}
        maxWidth="md"
        open={open}
        aria-labelledby="dialog"
        aria-describedby="dialog-description"
      >
        <DialogContent className={classes.typesContainer} dividers={true}>
          <Typography paragraph variant="h5">
            大類
          </Typography>
          <FormGroup className={classes.major} row>
            {Object.keys(types).map(major => (
              <FormControlLabel
                key={major}
                control={
                  <Checkbox
                    checked={
                      !Object.values(checkedList[major]).some(_ => _ === false)
                    }
                    value="checkedA"
                    onChange={e => handleParentChange(e, major)}
                  />
                }
                label={major}
              />
            ))}
          </FormGroup>
          <Divider />
          <Typography paragraph variant="h5">
            細項
          </Typography>
          <FormGroup row>
            {parent &&
              types[parent].map(minor => (
                <FormControlLabel
                  key={minor}
                  control={
                    <Checkbox
                      checked={checkedList[parent][minor]}
                      onChange={e => handleChildrenChange(e, minor)}
                      value="checkedA"
                    />
                  }
                  label={minor}
                />
              ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleDialog}
            color="primary"
            variant="contained"
            autoFocus
          >
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StoreAdvancedInfo;
