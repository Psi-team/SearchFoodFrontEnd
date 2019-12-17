import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    padding: `${theme.spacing(2)}px 0px`,
  },
  mainImage: {
    '& > img': {
      width: '100%',
    },
  },
}));

const DetailView = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={3} className={classes.root}>
      <Grid item md={7} sm={12} className={classes.mainImage}>
        <img src={data.pictures[0]} alt="store" />
      </Grid>
      <Grid item md={5} sm={12}>
        <Typography>{data.storename}</Typography>
        <Typography>{data.type.join(',')}</Typography>
        <Typography>{data.storename}</Typography>
      </Grid>
    </Grid>
  );
};

DetailView.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DetailView;
