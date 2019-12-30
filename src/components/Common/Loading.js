import React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Loading = ({ loading }) => {
  const classes = useStyles();

  return (
    <Backdrop open={loading} className={classes.backdrop}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
