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
} from '@material-ui/core';

import UploadImage from '../Common/UploadImage';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    '& > h6': {
      marginRight: theme.spacing(4),
    },
    '& > button': {
      width: 150,
    },
  },
  detail: {
    textIndent: 20,
    paddingRight: theme.spacing(1),
  },
  typesContainer: {
    '& > div': {
      marginBottom: theme.spacing(2),
    },
  },
  major: {
    display: 'flex',
    alignItems: 'center',
    '& > h6': {
      marginLeft: theme.spacing(1),
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
}));

const StoreAdvancedInfo = ({ match, types, setState, state }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState(null);
  const [checkedList, setCheckedList] = useState(
    Object.entries(types).reduce((accu, [key, value]) => {
      const items = value.reduce(
        (accu, curr) => ({
          ...accu,
          [curr]: Boolean(
            state['types'][key] && state['types'][key].includes(curr)
          ),
        }),
        {}
      );
      return { ...accu, [key]: items };
    }, {})
  );

  const getTrueTypes = () => {
    const values = Object.values(checkedList).reduce(
      (accu, curr) => ({ ...accu, ...curr }),
      {}
    );

    return Object.entries(values)
      .filter(([_, val]) => val)
      .map(([key, _]) => key)
      .join(',');
  };

  const toggleDialog = isConfirm => {
    if (isConfirm) {
      const checkedItems = getTrueTypes().split(',');
      const checkedTypes = Object.entries(checkedList).reduce(
        (accu, [key, value]) => {
          const items = Object.keys(value).filter(_ =>
            checkedItems.includes(_)
          );
          if (items.length > 0) {
            return {
              ...accu,
              [key]: items,
            };
          } else {
            return accu;
          }
        },
        {}
      );

      setState({
        target: {
          name: 'types',
          value: checkedTypes,
        },
      });
    }

    setOpen(!open);
  };

  const handleParentClick = major => {
    setParent(major);
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

  const appendImg = e => {
    setState({
      target: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const removeImg = (name, _) => {
    setState({
      target: {
        name: name,
        value: null,
      },
    });
  };

  return (
    <>
      <div className={classes.item}>
        <Typography variant="h6">美食種類</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleDialog(false)}
        >
          選擇
        </Button>
      </div>
      <Typography
        variant="subtitle2"
        display="block"
        className={classes.detail}
        noWrap={true}
      >
        {getTrueTypes()}
      </Typography>
      <div className={classes.item}>
        <Typography variant="h6">店家封面</Typography>
        <UploadImage
          uniqueId="logoImage"
          name="logo"
          btnName="選擇"
          appendCallback={appendImg}
          removeCallback={removeImg}
        />
      </div>
      <div className={classes.item}>
        <Typography variant="h6">其他照片</Typography>
        <UploadImage
          uniqueId="pictureImage"
          name="images"
          btnName="選擇"
          appendCallback={appendImg}
          removeCallback={removeImg}
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
          <FormGroup row>
            {Object.keys(types).map(major => (
              <div key={major} className={classes.major}>
                <Checkbox
                  checked={
                    !Object.values(checkedList[major]).some(_ => _ === false)
                  }
                  value="checkedA"
                  onChange={e => handleParentChange(e, major)}
                />
                <Typography
                  variant="subtitle1"
                  color={
                    Object.values(checkedList[major]).some(_ => _ === true)
                      ? 'primary'
                      : 'initial'
                  }
                  onClick={() => handleParentClick(major)}
                >
                  {major}
                </Typography>
              </div>
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
            onClick={() => toggleDialog(true)}
            color="primary"
            variant="contained"
            autoFocus
          >
            確定
          </Button>
          <Button
            onClick={() => toggleDialog(false)}
            color="primary"
            variant="contained"
            autoFocus
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StoreAdvancedInfo;
