import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  box: {
    background: `linear-gradient(115deg, #8887EB 50%, transparent 50%),
    url(${require(`../../assets/images/food.png`)}) right center / cover`,
    height: '650px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '15%'
  },
  content: {
    fontStyle: 'italic',
    fontWeight: '900'
  }
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant='h4' className={classes.content}>民以食為天</Typography>
    </Box>
  );
}

export default HomePage;