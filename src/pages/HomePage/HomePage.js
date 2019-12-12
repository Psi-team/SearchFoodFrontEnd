import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import useMountEffect from '../../helpers/useMountEffect';
const useStyles = makeStyles(theme => ({
  box: {
    background: `linear-gradient(115deg, #8887EB 50%, transparent 50%),
    url(${require(`../../assets/images/food.png`)}) right center / cover`,
    height: '650px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '15%',
  },
  content: {
    fontStyle: 'italic',
    fontWeight: '900',
  },
}));

const HomePage = ({ getUserLocation }) => {
  const classes = useStyles();
  useMountEffect(() => getUserLocation());

  return (
    <Box className={classes.box}>
      <Typography variant="h4" className={classes.content}>
        民以食為天
      </Typography>
    </Box>
  );
};

const actionCreators = {
  getUserLocation: userActions.getUserLocation,
};

export default connect(null, actionCreators)(HomePage);
