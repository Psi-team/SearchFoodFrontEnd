import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
  rating: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& > p': {
      marginLeft: theme.spacing(0.5),
      letterSpacing: theme.spacing(0.1),
    },
  },
}));

const RatingBar = ({ rating, readOnly, className = '', handleChange=() => {} }) => {
  const classes = useStyles();
  
  return (
    <div className={`${classes.rating} ${className}`}>
      <Rating
        name="star"
        value={rating}
        onChange={handleChange}
        precision={0.1}
        readOnly={readOnly}
      />
      <Typography variant="body1" align="center">
        {rating.toFixed(1)}
      </Typography>
    </div>
  );
};

RatingBar.propTypes = {
  rating: PropTypes.number.isRequired,
  readOnly: PropTypes.bool.isRequired,
  classes: PropTypes.string,
  handleChange: PropTypes.func
};

export default RatingBar;
