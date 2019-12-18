import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    '& > p': {
      letterSpacing: theme.spacing(0.1),
    },
  },
}));

const RatingBar = ({ rating, readOnly, className = '' }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.rating} ${className}`}>
      <Rating
        name="read-only"
        value={rating}
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
};

export default RatingBar;
