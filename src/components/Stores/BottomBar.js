import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, Button, makeStyles } from '@material-ui/core';

import { calculatePageNumber } from '../../helpers/calcPageNumber';

const useStyles = makeStyles(theme => ({
  bottomBar: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > button': {
      margin: theme.spacing(0.5),
    },
  },
}));

const BottomBar = ({ pageIndex, length, path, changePageIndex }) => {
  const classes = useStyles();
  const handleNumberClick = num => {
    changePageIndex('order', num);
  };

  return (
    <Toolbar className={classes.bottomBar}>
      {calculatePageNumber(pageIndex, length).map((num, idx) => (
        <Button
          key={idx}
          onClick={() => handleNumberClick(num)}
          component={Link}
          to={`${path}&page=${num}`}
          variant="contained"
          color={pageIndex === num ? 'secondary' : 'inherit'}
          disabled={isNaN(num)}
        >
          {num}
        </Button>
      ))}
    </Toolbar>
  );
};

BottomBar.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  changePageIndex: PropTypes.func.isRequired,
};

export default BottomBar;
